/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var pm25_na = ee.Image("users/stormwaterheatmap/V4NA03_PM25_NA_201001_201012-RH35-NoNegs"),
    s8 = ee.FeatureCollection("users/stormwaterheatmap/revised_s8_watersheds_v4"),
    vulcan_onroad = ee.Image("users/stormwaterheatmap/Vulcan_onroad"),
    tncLC = ee.Image("users/jrobertson2000/psLandCover_1m_finPS_roofs"),
    vulcan_total = ee.Image("users/stormwaterheatmap/Vulcan_total"),
    traffic = ee.Image("projects/ee-swhm/assets/production_layers/Traffic"),
    ghsl = ee.Image("projects/ee-swhm/assets/staging/builtup"),
    geometry = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.MultiPolygon(
        [[[[-122.23290423234053, 47.39521267899464],
           [-122.23290423234053, 47.31799671554192],
           [-122.22741106827803, 47.31799671554192],
           [-122.22741106827803, 47.39521267899464]]],
         [[[-122.31118182023116, 47.410084694147],
           [-122.31118182023116, 47.26210757514687],
           [-122.1875856288249, 47.26210757514687],
           [-122.1875856288249, 47.410084694147]]]], null, false),
    geometry2 = 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.MultiPolygon(
        [[[[-122.3029420741374, 47.44817507045482],
           [-122.3029420741374, 47.33754396261769],
           [-122.21367815812178, 47.33754396261769],
           [-122.21367815812178, 47.44817507045482]]],
         [[[-122.3029420741374, 47.44353137847432],
           [-122.3029420741374, 47.307754794283746],
           [-122.2095582850749, 47.307754794283746],
           [-122.2095582850749, 47.44353137847432]]]], null, false),
    PugetSound = ee.FeatureCollection("projects/ee-swhm/assets/production_feature_collections/PugetSoundWA"),
    image = ee.Image("projects/ee-swhm/assets/staging/builtup");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/** 
 * @fileoverview  Generates scaled and centered predictors for use in 
 * heatmap layers
 */
 //\]

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

 
//Age of Development
//print(ghsl.select(0).projection())
var devAge2 = ghsl.remap(
 [1,2, 3, 4, 5, 6], 
 [99,0, 1, 2, 3, 4])
    .pow(2)
    .rename('devAge2')

//Grass
var grass = tncLC.eq(1)

//Paved
var paved = tncLC.eq(6).resample().reproject({crs:"EPSG:4326",scale:500}).sqrt()//.blend(wsdot_roads)

//PM 2.5 (pm25_na)
//resample to twice nominal resolution
var pm25_na = pm25_na.resample().reproject({crs:"EPSG:4326",scale:500})


//resample to twice nominal resolution
var CO2_road = vulcan_onroad
    .reduce('mean').resample().reproject({crs:"EPSG:4326",scale:500})
    
var sqrt_CO2_road =  CO2_road.sqrt().rename('sqrt_CO2_road')

var sqrt_CO2_total = vulcan_total
.reduce('mean').resample().reproject({crs:"EPSG:4326",scale:500}).sqrt()

// Traffic 
// ** updated - Traffic is sqrt transformed
var sqrt_traffic = traffic.sqrt()

// var predictor_names = ['devAge2',
//     'grass', 'paved', 'pm25_na',
//     'sqrt_CO2_road',  
//     'sqrt_traffic'
// ]

//Generate an image stack of predictors
var predictor_stack_raw = ee.Image(0).blend(
    ee.Image.cat(
        devAge2.rename('devAge2'),
        grass.rename('grass'),
        paved.rename('paved'),
        pm25_na.rename('pm25_na'),
        CO2_road.rename('CO2_road'),
        sqrt_CO2_road.rename('sqrt_CO2_road'),
       // sqrt_CO2_total.rename('sqrt_CO2_total'),
       sqrt_traffic.rename('sqrt_traffic'),
        traffic.rename('traffic')
    )).float()

//Map.addLayer(predictor_stack_raw)
var chart = ui.Chart.image.histogram({image:image.focal_mean(),region:geometry,scale:200,maxRaw:1e6})
//print(chart)

exports.predictor_stack_raw = predictor_stack_raw