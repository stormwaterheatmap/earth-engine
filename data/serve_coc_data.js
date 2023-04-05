/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var PugetSound = ee.FeatureCollection("users/stormwaterheatmap/tables/PugetSound"),
    water_mask = ee.Image("projects/ee-stormwaterheatmap/assets/water_mask"),
    PugetSound_mask = ee.Image("projects/ee-stormwaterheatmap/assets/PugetSoundMask");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/**
 * Script to convolve and log transform coc data for data_dict
 * @package
 */
 


var copper = copper.select(0)
var p = p.select(0)
var tss =tss // image.select(2)
var tkn = tkn//zinc_tkn.select('tkn_concentration_ug_per_L')
var zinc = zinc// zinc_tkn.select('zinc_concentration_ug_per_L')

    
   

 


p = p.rename(['p_concentration_ug_per_L', 'log_p_concentration_ug_per_L']);
tss = tss.rename(['tss_concentration_ug_per_L', 'log_tss_concentration_mg_per_L']);
copper = copper.rename(['copper_concentration_ug_per_L', 'log_copper_concentration_ug_per_L']);
tkn = tkn.rename(['tkn_concentration_ug_per_L', 'log_tkn_concentration_ug_per_L']);
zinc = zinc.rename(['zinc_concentration_ug_per_L', 'log_zinc_concentration_ug_per_L']);

exports.p = p
exports.tss = tss
exports.copper = copper
exports.tkn = tkn
exports.zinc =zinc 
//Map.addLayer(p.multiply(100).round().divide(100))

//print(ui.Chart.image.histogram({image:tkn.select(1),scale:100,region:geometry}))
//print(zinc.reduce('max'))
//get runoff data from raw_data

var data_raw = require("users/stormwaterheatmap/apps:data/data_raw")

var q_mm = data_raw.mean_annual_runoff.rename(
    'mean_annual_runoff_mm').unmask()//.resample()

//print(tss)
var tss_load = tss.select(0)//.unmask()
    .multiply(q_mm).multiply(1e-6)
    .rename(
        'tss_load_g_m2_yr').focal_mean(
        1).clip(PugetSound).clip(WA).mask(PugetSound_mask)
        
var copper_load = copper.select(0)
    .unmask().multiply(q_mm).multiply(
        1e-3)
    .rename('copper_load_mg_m2_yr')
    .focal_mean(1).mask(PugetSound_mask)////.water_mask)
    
var p_load = p.select(0).unmask()
    .multiply(q_mm).multiply(1e-3)
    .rename(
        'p_load_mg_m2_yr').focal_mean(1).mask(PugetSound_mask)
    ////.water_mask)
    
var tkn_load = tkn.select(0).unmask()
    .multiply(q_mm).multiply(1e-3)
    .rename(
        'tkn_load_mg_m2_yr').focal_mean(1).mask(PugetSound_mask)
    ////.water_mask)

var zinc_load = zinc.select(0).unmask()
    .multiply(q_mm).multiply(1e-3)
    .rename(
        'zinc_load_mg_m2_yr').focal_mean(1).mask(PugetSound_mask)
   // //.water_mask)

//Map.addLayer(tkn_load)

exports.p_load = p_load
exports.tss_load = tss_load
exports.copper_load = copper_load
exports.tkn_load = tkn_load
exports.zinc_load = zinc_load
//Map.addLayer(tss_load).r

print(tss)

