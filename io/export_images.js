/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var roi = ee.FeatureCollection("projects/ee-swhm/assets/production_feature_collections/PugetSoundWA"),
    image = ee.Image("MODIS/MOD44W/MOD44W_005_2000_02_24");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var data  = require('users/stormwaterheatmap/apps:data/data_dictionary.js')
var rasters = data.rasters
Map.addLayer(roi)
var PugetSound = data.vectors.PugetSound
Map.addLayer(image.select('water_mask'))
var layers = Object.keys(rasters)
var traffic = ee.Image('users/jrobertson2000/psRds_aadt_fin2m1')
var watermask = image.select('water_mask')

var Land_Cover = ee.Image("projects/ee-swhm/assets/production_layers/Land_Cover")
var lc_na = Land_Cover.eq(0)

var to_update = Land_Cover.eq(0).and(watermask)
var lc_updated = Land_Cover.where(to_update,5)

//update certain layers
rasters.Traffic.layer.eeObject = traffic
rasters["Land Cover"].layer.eeObject = lc_updated

for (var i = 0; i < layers.length; i++) {
  var lay = rasters[layers[i]]

  //determine if layer should be exported as byte (categorized) or double (continuous )
  switch (lay.discrete) {
    case 'TRUE':
      var img = lay.layer.eeObject.clip(roi).byte()
      break;
    case 'FALSE':
      var img = lay.layer.eeObject.clip(roi).double()
      break; 
    default: 
      print('error')
  }
  
  var scale = lay.scale

  Map.addLayer(img,lay.layer.visParams,lay.layer.name,0)
  var layer_description = lay.layer.name
    .replace(/\s/g, '_')
    .replace(/\)/g, '')
    .replace(/\(/g, '')
  print(layer_description,img)
  print(lay)
  Export.image.toCloudStorage({
        image: img,
        description: layer_description, 
        bucket:'swhm-image-exports',
        maxPixels: 1e13,
        //shardSize: 128, 
        scale: scale/2,
        region: PugetSound,
        fileNamePrefix: layer_description+"/" +
            layer_description, 
        fileFormat: 'GeoTIFF',
        formatOptions: {
            cloudOptimized: true
        }
    })
}

