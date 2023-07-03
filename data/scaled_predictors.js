/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var pm25_na = ee.Image("users/stormwaterheatmap/V4NA03_PM25_NA_201001_201012-RH35-NoNegs"),
    ghsl = ee.Image("JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1"),
    s8 = ee.FeatureCollection("users/stormwaterheatmap/revised_s8_watersheds_v4"),
    vulcan_onroad = ee.Image("users/stormwaterheatmap/Vulcan_onroad"),
    tncLC = ee.Image("users/jrobertson2000/psLandCover_1m_finPS_roofs"),
    vulcan_total = ee.Image("users/stormwaterheatmap/Vulcan_total"),
    traffic = ee.Image("projects/ee-swhm/assets/production_layers/Traffic");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/** 
 * @fileoverview  Generates scaled and centered predictors for use in 
 * heatmap layers
 */

//Helpers, etc. 
var palettes = require(
    'users/gena/packages:palettes');
var scale = 30
var radius = 1000
var PugetSound = ee.FeatureCollection(
    "users/stormwaterheatmap/tables/PugetSound"
)
var pal = palettes.virdis

//Functions -----------------------------------------------------------

/**
 * Takes an predictor image, returns a feature collection of the 
 * mean predictor value per watershed 
*/
var reducePredictors = function(image) {
    return (image.reduceRegions({
        reducer: ee
            .Reducer
            .mean(),
        collection: watersheds,
        scale: scale
    }))
}
/**
 * Takes a feature collection and property, 
 * returns mean and sd of a single property 
*/
// 
var get_stats = function(fc, property) {
    var stats = fc.aggregate_stats(
        property)
    return (stats.select(['mean',
        'sample_sd'
    ]))
}

/**
 * Maps over an image, for each band, scales and centers data. 
 * Returns an image with one band per predictor. 
*/
// 



var scale_and_center_image = function(image) {
    var bandNames = image
        .bandNames();
    var toCollection = ee.ImageCollection.fromImages(
            bandNames.map(function(name) {
                name = ee.String(name);
                var stats =
                    get_stats(reduced_predictors,name) 
                var scaled =
                    image.subtract(
                      ee.Image.constant({
                            value: ee.Number(stats.get('mean'))
                        }))
                    .divide(
                        ee.Image.constant({
                            value: ee.Number(stats.get('sample_sd'))
                        }))
                return scaled
                    .select(name)
                    .toFloat();
            }));
    return (toCollection.toBands()
        .rename(predictor_names)
    ) //
}

//Get and stack predictor images -----------------------------------------------------------
/** 
 * Note that two of the predictors were transformed prior to 
 * standardization: devAge2 is devAge^2, and sqrt_CO2_road is 
 * sqrt(CO2_road).  
 */ 
 
//Age of Development
//print(ghsl.select(0).projection())
var devAge2 = ghsl.remap(
  [2, 3, 4, 5, 6], 
  [0, 1, 2, 3, 4])
    .pow(2)
    .rename('devAge2')

//Grass
var grass = tncLC.eq(1)

//Paved
var paved = tncLC.eq(6)//.blend(wsdot_roads)

//PM 2.5 (pm25_na)
//resample to twice nominal resolution
var pm25_na = pm25_na.resample().reproject({crs:"EPSG:4326",scale:500})


//resample to twice nominal resolution
var sqrt_CO2_road = vulcan_onroad
    .reduce('mean').resample().reproject({crs:"EPSG:4326",scale:500}).sqrt()

var sqrt_CO2_total = vulcan_total
.reduce('mean').resample().reproject({crs:"EPSG:4326",scale:500}).sqrt()

// Traffic 
// ** updated - Traffic is sqrt transformed
var traffic = traffic.sqrt()

var predictor_names = ['devAge2',
    'grass', 'paved', 'pm25_na',
    'sqrt_CO2_road', //'sqrt_CO2_total', 
    'sqrt_traffic'
]

// var clamp_values = ee.Dictionary
//     .fromLists(predictor_names, [99999,
//         1, 1, 99999, 99999, 31397
//     ]) //unscaled clamp values 

// //

//unscaled image stack of clamped values 
// var clamped_image = clamp_values
//     .toImage(predictor_names)
    
//Generate an image stack of predictors
var predictor_stack_raw = ee.Image(0).blend(
    ee.Image.cat(
        devAge2.rename('devAge2'),
        grass.rename('grass'),
        paved.rename('paved'),
        pm25_na.rename('pm25_na'),
        sqrt_CO2_road.rename('sqrt_CO2_road'),
       // sqrt_CO2_total.rename('sqrt_CO2_total'),
        traffic.rename('traffic')
    ))

//print(predictor_stack_raw)
// Compare to monitoring data   
var watersheds = s8.filter(ee.Filter
    .inList('Location_N', [
        'PIEHIRES_OUT',
        'POSOUTFALL_60',
        'PIELORES_OUT'
    ])
    .not())

// generate a summary per watershed for QC
var reduced_predictors =
    reducePredictors(
        predictor_stack_raw
    ) 
    
//print('reduced predictors', reduced_predictors)

// Center and scale raw predictors 
var centered_scaled_predictors = (
    scale_and_center_image(predictor_stack_raw));

//Add intercept as the first band
centered_scaled_predictors = ee.Image.cat(
  ee.Image(1).rename('0_intercept'), 
  centered_scaled_predictors)

Map.addLayer(centered_scaled_predictors)

exports.scaled_predictors =
    centered_scaled_predictors



