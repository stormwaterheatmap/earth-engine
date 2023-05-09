var data  = require('users/stormwaterheatmap/apps:data/data_dictionary.js')
var rasters = data.rasters
print(data)
var PugetSound = data.vectors.PugetSound
var roi = data.vectors.PugetSoundWA

var layers = Object.keys(rasters)

for (var i = 0; i < layers.length; i++) {
  var lay = rasters[layers[i]]
  var img = lay.layer.eeObject
  var scale = lay.scale
  var visMin = lay.layer.visParams.min 
  var visMax = lay.layer.visParams.max
  var visPalette = lay.layer.visParams.palette 
  var img_rbg = img.unmask().visualize({
    min:visMin, 
    max:visMax,
    palette: visPalette, 
    forceRgbOutput: true
    }).clip(roi)
    
  Map.addLayer(img_rbg,{},lay.layer.name,false)
  
  var layer_description = lay.layer.name
    .replace(/\s/g, '_')
    .replace(/\)/g, '')
    .replace(/\(/g, '')


  Export.map.toCloudStorage({
        image: img_rbg,
        description: layer_description, 
        path: 'tiles/'+layer_description,
        maxZoom: 18,
        minZoom:0, 
        bucket:'live_data_layers',
        writePublicTiles: true, 
        region: PugetSound,
        mapsApiKey: "AIzaSyALEa2NDTMuUyg_SLClGOnlHCxaVKVWMBw", 
        
        bucketCorsUris: [
          'https://code.earthengine.google.com',
          'https://*.earthengine.app',
          'https://earth.google.com', 
          'https://*.stormwaterheatmap.org', 
          'https://*.stormwaterheatmap.com', 
          'https://*.tacomawatersheds.com' 
        ]
    })
}

