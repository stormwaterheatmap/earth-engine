/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var roi = ee.FeatureCollection("projects/ee-swhm/assets/production_feature_collections/PugetSoundWA"),
    image = ee.Image("MODIS/MOD44W/MOD44W_005_2000_02_24"),
    image2 = ee.Image("projects/ee-swhm/assets/production_layers/Imperviousness");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var landcover = require('users/stormwaterheatmap/apps:data/layer_generation/landcover.js').landcover 

var imperv = landcover.gte(6).multiply(100).float()
Map.addLayer(imperv)