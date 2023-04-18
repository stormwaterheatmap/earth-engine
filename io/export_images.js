/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var roi = ee.FeatureCollection("users/cnilsen/PugetSound_boundary");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var data  = require('users/stormwaterheatmap/apps:data/data_dictionary.js')
var rasters = data.rasters

var PugetSound = data.vectors.PugetSound

var layers = Object.keys(rasters)



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
  print(layer_description)

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

