/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-122.81716181349968, 47.52055514553819],
          [-122.81716181349968, 46.99113540957696],
          [-121.69930292678093, 46.99113540957696],
          [-121.69930292678093, 47.52055514553819]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var data  = require('users/stormwaterheatmap/apps:data/data_dictionary.js')
var cocimg = data.cocs


var tacoma_bbox = ee.Geometry.BBox(-122.7, 47.05, -121.8,  47.45);


//var PugetSound = tbbx2//data.vectors.PugetSound

var roi = tacoma_bbox.buffer(10000)//data.vectors.PugetSoundWA

var cocNames = Object.keys(cocimg)
//var data  = require('users/stormwaterheatmap/apps:data/data_dictionary.js')
var lay1 = (cocNames[1])
var img = cocimg[lay1].layer.eeObject
Map.addLayer(img)

make_tiles()

function make_tiles(){
for (var i = 0; i < cocNames.length; i++) {
 var layname = cocNames[i]
 var lay = cocimg[layname]
  var img = lay.layer.eeObject.select(1).resample()
  var scale = lay.scale
  var visMin = lay.layer.visParams.min
  var visMax = lay.layer.visParams.max
  var visPalette = lay.layer.visParams.palette 
  var img_rbg = img.unmask().visualize({
    min:visMin, 
    max:visMax,
    palette: visPalette, 
    forceRgbOutput: true
    })//.clip(roi)
    
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
        region: roi,
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
}}