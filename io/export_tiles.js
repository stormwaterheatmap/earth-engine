/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var roi = ee.FeatureCollection("users/cnilsen/PugetSound_boundary");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var data  = require('users/stormwaterheatmap/apps:data/data_dictionary.js')
var rasters = data.rasters

var PugetSound = data.vectors.PugetSound

var layers = Object.keys(rasters)

for (var i = 0; i < layers.length; i++) {
  var lay = rasters[layers[i]]
  var img = lay.layer.eeObject.clip(roi)
  var scale = lay.scale

  Map.addLayer(img,lay.layer.visParams,lay.layer.name)
  var layer_description = lay.layer.name
    .replace(/\s/g, '_')
    .replace(/\)/g, '')
    .replace(/\(/g, '')


    Export.map.toCloudStorage(image, description, bucket, fileFormat, path, writePublicTiles, maxZoom, scale,
       minZoom, region, skipEmptyTiles, mapsApiKey, bucketCorsUris)

  Export.map.toCloudStorage({
        image: img,
        description: layer_description, 
        bucket:'live_data_layers',
        writePublicTiles: true, 
        region: PugetSound,
        mapsApiKey: "AIzaSyALEa2NDTMuUyg_SLClGOnlHCxaVKVWMBw"
    })
}

