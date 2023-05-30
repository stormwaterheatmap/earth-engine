/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var roi = ee.FeatureCollection("projects/ee-swhm/assets/production_feature_collections/PugetSoundWA"),
    image = ee.Image("MODIS/MOD44W/MOD44W_005_2000_02_24");
/***** End of imports. If edited, may not auto-convert in the playground. *****/


Map.addLayer(image.select('water_mask'))

var watermask = image.select('water_mask')

var Land_Cover = ee.Image("projects/ee-swhm/assets/production_layers/Land_Cover")
var lc_na = Land_Cover.eq(0)

var to_update = Land_Cover.eq(0).and(watermask)
var lc_updated = Land_Cover.where(to_update,5)
 
Map.addLayer(lc_updated,{min:0,max:7})
exports.landcover = lc_updated