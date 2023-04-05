/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var image = ee.Image("projects/ee-swhm/assets/production_layers/Total_Copper_Concentration"),
    image2 = ee.Image("projects/ee-swhm/assets/production_layers/Total_Kjeldahl_Nitrogen_Concentration"),
    image3 = ee.Image("projects/ee-swhm/assets/production_layers/Total_Phosphorus_Concentration"),
    image4 = ee.Image("projects/ee-swhm/assets/production_layers/Total_Suspended_Solids_Concentration");
/***** End of imports. If edited, may not auto-convert in the playground. *****/

//var water_mask = ee.Image(0).blend(soils.neq(4).byte());
var data  = require('users/stormwaterheatmap/apps:data/data_dictionary.js')
print(data)


function make_tiles(){
for (var i = 0; i < cocNames.length; i++) {
var img = cocimg.select(i)
  var lay = rasters[layers[i]]

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
export_to_cloud_tiles(img,cocNames[i])
Map.addLayer(img,{},cocNames[i],0)
}

function export_to_cloud_tiles(img,description){
  Export.image.toCloudStorage({
        image: img,
        description: description, 
        bucket:'swhm-image-exports',
        maxPixels: 1e13,
        shardSize: 128, 
        scale: 10,
        region: PugetSound,
        fileNamePrefix: description+"/" +
            description, 
        fileFormat: 'GeoTIFF',
        formatOptions: {
            cloudOptimized: true
        }
    })
}
}