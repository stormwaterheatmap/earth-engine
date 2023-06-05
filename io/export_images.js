/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var roi = ee.FeatureCollection("users/cnilsen/PugetSound_boundary");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var data  = require('users/stormwaterheatmap/apps:data/data_dictionary.js')
var rasters = data.rasters
var PugetSound = data.vectors.PugetSound

var layers = Object.keys(rasters)
var traffic = ee.Image('users/jrobertson2000/psRds_aadt_fin2m1')

/** Import data from layer_generation folder */
var soilLanduseSlope  = require('users/stormwaterheatmap/apps:data/layer_generation/hrus')
var hrus = soilLanduseSlope.hrus 
var soils = soilLanduseSlope.soils 
var hspf_land_cover = soilLanduseSlope.hspf_land_cover 
var slope = soilLanduseSlope.slope 
var slope_zone = soilLanduseSlope.zones 
var imperviousness = require('users/stormwaterheatmap/apps:data/layer_generation/imperviousness.js')




//var viz = {min:10, max:50000, palette: ['magenta','black']}
//Map.addLayer(traffic.unmask().resample().focal_max(), viz, "original traffic raster")

rasters.Traffic.layer.eeObject = traffic
print(Object.keys(rasters))
rasters['HSPF Land Cover Type'].layer.eeObject = hspf_land_cover
rasters['Hydrologic Response Units'].layer.eeObject = hrus
rasters['Imperviousness'].layer.eeObject = imperviousness.imperviousness
//rasters['Land Cover'].layer.eeObject = 
rasters['Slope'].layer.eeObject = slope
rasters['Slope Categories'].layer.eeObject = slope_zone
rasters['Soils'].layer.eeObject = soils


print(slope_zone)
for (var i = 0; i < layers.length; i++) {
  var lay = rasters[layers[i]]

  //determine if layer should be exported as byte (categorized) or double (continuous )
  switch (lay.discrete) {
    case 'TRUE':
      var img = lay.layer.eeObject.byte()
      break;
    case 'FALSE':
      var img = lay.layer.eeObject.double()
      break; 
    default: 
      var img = lay.layer.eeObject
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

