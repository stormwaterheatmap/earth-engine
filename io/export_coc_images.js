/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var PugetSound = ee.FeatureCollection("projects/ee-stormwaterheatmap/assets/PugetSound_WA"),
    water_mask = ee.Image("projects/ee-stormwaterheatmap/assets/water_mask"),
    image = ee.Image("projects/ee-swhm/assets/staging/detailed_mask_image");
/***** End of imports. If edited, may not auto-convert in the playground. *****/

// var water_areas = water_mask.neq(1)
// // Import the pre-processed predictors from the "coc_layers" asset
// var predictors = require("users/stormwaterheatmap/coc_layers:scaled_predictors").scaled_predictors;
// var traffic_band = predictors.select("sqrt_traffic");


// // Get the names of all the predictors
// var pred_bands = predictors.bandNames();


// // Clamp the predictors to a maximum value of 3
// var clamped_img_max = ee.Image.constant([99, 3, 3, 3, 3, 3, 3]);
// predictors = predictors.where(predictors.gt(clamped_img_max), clamped_img_max);

// // Load the soils image and create a water mask
// var soils = ee.Image("users/stormwaterheatmap/soilsunmask5m");
// var water_mask = ee.Image(0).blend(soils.neq(4).byte());

// // Define the regression coefficients for each pollutant
// var regression_coefficients = {
//   copper: [2.332, 0.457, 0, 0, 0, 0.427, 0],
//   tss: [10.294, 0.320, 0, 0, 0, 0, 0.381],
//   tkn: [6.618, 0.220, 0, 0, 0, 0, 0.232],
//   zinc: [4.10, 0, 0, 0.69, 0, 0, 0.36],
//   p: [4.554, 0.299, 0, 0, 0, 0.507, 0]
// };

// // List of names for each predictor band
// var bandNames = [  "intercept",  "devage2",  "grass",  "paved",  "pm25_na",  "sqrt_CO2_road",  "traffic"];


// function tss_concentration_ug_per_L_circle(image) {
//     var kernel = ee.Kernel.gaussian({
//         radius: 50, sigma: 10
//             ,
//         units: 'meters',
//         normalize: true
//     })
//     image = image.reduceNeighborhood({
//         reducer: ee.Reducer.mean(),
//         kernel: kernel,
//         skipMasked: true, 
//     })
    
//     return (image)
// }

// /**
// * Applies a convolution to a scaled and centered image and clamps values to +/- 3 standard deviations.
// * 
// * @param {ee.Image} image - The input image.
// * @returns {ee.Image} - The image after convolution and clamping.
// */
// function tss_concentration_ug_per_LAndClamp(image) {
//   // Calculate the tss_concentration_ug_per_Ld image
//   var tss_concentration_ug_per_LdImage = image.focal_mean();

//   // Clamp the values to +/- 3 standard deviations
//   var clampedImage = tss_concentration_ug_per_LdImage.where(
//     tss_concentration_ug_per_LdImage.gt(clamped_img_max),
//     clamped_img_max
//   );

//   return clampedImage;
// }

// /**
// * Generates a heatmap layer for a specific chemical of concern (coc).
// * 
// * @param {string} cocName - The name of the coc.
// * @param {ee.Image} predictorImage - The predictor image.
// * @returns {ee.Image} - The image of the coc concentration in ug/L.
// */
// function generateCocLayer(cocName) {
//   // Get the regression parameters for the given coc
//   var wrap = function(predictorImage){
//   var cocParameters = ee.Image.constant(regression_coefficients[cocName]).rename(bandNames);

//   // Calculate the concentration of the coc
//   var cocConcentration = cocParameters
//     .multiply(predictorImage)
//     .reduce("sum")
//     .rename(cocName + "_concentration_ug_per_L")
//     .exp();
//   return cocConcentration
//   }
//   return wrap;
// }

// // Apply the convolution and clamping to the predictors
// var clampedtss_concentration_ug_per_LdPredictors = tss_concentration_ug_per_LAndClamp(predictors);
var cocimg = require("users/stormwaterheatmap/apps:data/generate_coc_layers.js").coc_concentrations;

var dict = ee.Dictionary({
  "copper": "cu_concentration_ug_per_L",
  "p": "p_concentration_ug_per_L",
  "tss": "tss_concentration_ug_per_L",
  "tkn": "tkn_concentration_ug_per_L",
  "zinc": "zinc_concentration_ug_per_L"
})
var cocNames = cocimg.bandNames().getInfo()
print(cocNames,'cocNames')
// var cocimg = ee.Image()
// for (var i = 0; i < cocNames.length; i++) {
//   var cocName = cocNames[i];
//   var cocLayer = generateCocLayer(cocName);
//   var cocConcentration = cocLayer(clampedtss_concentration_ug_per_LdPredictors)
//   var cocConctss_concentration_ug_per_Ld = tss_concentration_ug_per_L_circle(cocConcentration);
//   cocimg = cocimg.addBands(cocConctss_concentration_ug_per_Ld.rename(cocName)) 
// }

cocimg = cocimg.select(cocNames).where(image.eq(0),0).clip(PugetSound)
Map.addLayer(cocimg)

for (var i = 0; i < cocNames.length; i++) {
var img = cocimg.select(i)
export_to_cloud(img,cocNames[i])
Map.addLayer(img,{},cocNames[i],0)
}

function export_to_cloud(img,description){
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