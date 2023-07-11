/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var msk = ee.Image("projects/ee-swhm/assets/staging/detailed_mask_image"),
    image = ee.Image("projects/ee-swhm/assets/staging/predictors");
/***** End of imports. If edited, may not auto-convert in the playground. *****/

//var predictors_import = require('users/stormwaterheatmap/apps:data/scaled_predictors.js')
//var predictors = predictors_import.scaled_predictors.mask(msk)
var predictors = image

// // Add intercept band to predictors 

// predictors = ee.Image.constant(1).rename('intercept').addBands(predictors)

 
/** 
    * Updated regression pararadisumeters 
    * March 2023
    * 
      COPPER:
      ln(Copper) = 2.332 - 0.179*rain + 0.375*summer + 0.427*sqrt_traffic + 0.457*devAge2 + epsilon
      (rain = 21-day cumulative rainfall, standardized)
      
      TSS:
      ln(TSS) = 10.294 + 0.159*rain + 0.381*sqrt_traffic + 0.320*devAge2 + epsilon
      (rain = 1-day cumulative rainfall, standardized)
      
      TKN:
      ln(TKN) = 6.618 - 0.180*rain + 0.554*summer + 0.232*sqrt_traffic + 0.220*devAge2 + epsilon
      (rain = 14-day cumulative rainfall, standardized)
      
      Total Zinc:
      ln(total Zinc) = 4.10 + 0.36 * sqrt_traffic + 0.69 * paved
      (rain = 14-day cumulative rainfall, standardized)
      
      Phosphorus:
      ln(P) = 4.554 - 0.147*rain + 0.507*summer + 0.299*sqrt_CO2_road + epsilon
      (rain = 21-day cumulative rainfall, standardized)

*/ 

var regression_coefficients = {
  
    //      intercept,devage2,grass,paved,pm25_na,sqrt_CO2_road,sqrttraffic
  'copper': [2.332,   0.457,  0,    0,     0,       0,            0.427],
  'tss':    [10.294,  0.320,  0,    0.28,  0,       0,            0.381],
  'p':      [4.554,   0,      0,    0,     0,       0.299,            0], 
  'tkn':    [6.618,   0.220,  0,    0,     0,       0,            0.232], 
  'zinc':   [4.10,    0,      0,    0.69,  0,       0,             0.36]
}

var bandNames = [
    "intercept",
    "devage2",
    "grass",
    "paved",
    "pm25_na",
    "sqrt_CO2_road",
    "traffic"
]

/**
 * Applies a convolution to a scaled and centered image. Clamps values to 
 * +/- 3 standard deviations (assuming dataset is scaled by sd)
 * Takes a coc name and generates a single band image. 
 */
function convolve_clamp_predictors(image) {
    var convolved_predictors = image.
    reduceNeighborhood({
        skipMasked: true,
        reducer: ee.Reducer.mean(),
        kernel: ee.Kernel.gaussian({
            radius: 45,
            sigma: 15,
            units: 'meters'
        })
    })

    var convolved_clamped = convolved_predictors.clamp(-4, 4) //clamp to 3 standard deviations 
    return convolved_clamped
}
 
/**
 * Main function. Generates heatmap layer for a specific coc. 
 * Takes a coc name and generates a single band image. 
 */
function generate_coc_layer(coc_name, predictor_image) {


    //Get the regression parameters 
    var coc_parameters =  ee.Image.constant(regression_coefficients[coc_name]).rename(bandNames)

    // calculate the concentration 
    var coc_ug_L_scaled = coc_parameters.multiply(predictor_image)
            .reduce('sum')
        .rename(coc_name+"_concentration_ug_per_L")

    //Make a two band image: first band is concentration, second band is log concentration 
    var coc_ug_L = ee.Image.cat(
        coc_ug_L_scaled.exp(), 
        coc_ug_L_scaled.rename(coc_name+'_log_concentration_ug_per_L'))
    

    return (coc_ug_L)
}

var convolved_clamped = //predictors.clamp(-3, 3)//
convolve_clamp_predictors(predictors)
var copper = generate_coc_layer("copper",convolved_clamped)
var p = generate_coc_layer("p",convolved_clamped)
var tss = generate_coc_layer("tss",convolved_clamped)
var tkn = generate_coc_layer("tkn",convolved_clamped)
var zinc = generate_coc_layer("zinc",convolved_clamped)

var all_cocs = copper.addBands(p).addBands(tss).addBands(zinc).addBands(tkn)

print(all_cocs)
var zinc_tkn = zinc.addBands(tkn)
Map.addLayer(all_cocs.select(1),{min:0,max:5})
var coc_concentrations = all_cocs.select(
  ["copper_concentration_ug_per_L",
  "p_concentration_ug_per_L",
  "tkn_concentration_ug_per_L",
  "tss_concentration_ug_per_L",
  "zinc_concentration_ug_per_L"])
Map.addLayer(coc_concentrations)
exports.coc_concentrations = coc_concentrations