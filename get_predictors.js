// Header ---------------------------
// Script name: get_predictors.js
// Abstract: This script is used to get landscape predictors from Google Earth Engine
// for use in stormwaterheatmap regressions.
// Author: Christian Nilsen, Geosyntec Consultants
// Email: cnilsen@geosyntec.com
// Date Created: 2021-01-24, Christian Nilsen
// Date Modified: 2023-01-04, EDJ - added Vulcan_rail and Vulcan_cmv to saved csv file
// Copyright (c) Geosyntec Consultants, 2021

// Load required datasets from Google Earth Engine

// Watersheds
var watersheds = ee.FeatureCollection("projects/ee-swhm/assets/model_validation/validation_sheds_rev");

// Tree cover
var tree_cover = ee.Image("USGS/NLCD/NLCD2016").select("percent_tree_cover");

// Traffic
var traffic = ee.Image(0).blend(ee.Image("users/cnilsen/traffic_raw")).rename("traffic");

// Population density
var population = ee.Image("users/stormwaterheatmap/population_per_ha");

// PM 2.5
var pm25 = ee.Image("users/cnilsen/pm25clipped").rename("pm25");

// Imperviousness
var tnc_landcover = ee.Image("users/jrobertson2000/psLandCover_1m_finPS_roofs");
var impervious = tnc_landcover.eq(6).or(tnc_landcover.eq(7)).rename("impervious");
var imp_ground = tnc_landcover.eq(6).rename("imperv_ground");
var imp_roofs = tnc_landcover.eq(7).rename("imperv_roofs");
var grass_low_veg = tnc_landcover.eq(1).rename("grass_low_veg");
var shrub_med_veg = tnc_landcover.eq(2).rename("shrub_med_veg");

// NO2
var no2 = ee.Image("users/stormwaterheatmap/SURFACE_NO2_010x010_2010").rename("NO_2");

// Age of development
var no_dev = ee.Image("JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1").select("built").eq(2).rename("no_dev");
var age_2000_2014 = ee.Image("JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1").select("built").eq(3).rename("dev_2000_2014");
var age_1990_2000 = ee.Image("JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1").select("built").eq(4).rename("dev_1990_2000");
var age_1975_1990 = ee.Image("JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1").select("built").eq(5).rename("dev_1975_1990");
var age_pre_1975 = ee.Image("JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1").select("built").eq(6).rename("dev_pre_1975");

// Slope
var elevation = ee.Image("USGS/NED");
var slope = ee.Terrain.slope(elevation);

// Landuse data
var landuse_table = ee.FeatureCollection("users/stormwaterheatmap/psrc_landuse");
var landuse = landuse_table.reduceToImage(['Master_num'], ee.Reducer.first()).rename("landuseCode");
var percent_urban_res = landuse.eq(10).rename("urbRES");
var percent_industrial = landuse.eq(11).rename("IND");
var percent_int_urban = landuse.eq(4).rename("intURB");
var percent_ag = landuse.eq(1).rename("AG");
var percent_water = landuse.eq(6).rename("WATER");
var percent_open_space = landuse.eq(13).rename("OPEN");
var percent_rural_res = landuse.eq(5).rename("ruRES");
var percent_public = landuse.eq(12).rename("PUBLIC");

// Roofs by landuse
var roofs = tnc_landcover.eq(7);
var roofs_landuse = landuse.multiply(roofs).selfMask();
var percent_roofs_urbRES = roofs_landuse.eq(10).rename("roof_urbRES");
var percent_roofs_ruRES = roofs_landuse.eq(5).rename("roof_ruRES");
var percent_roofs_IND = roofs_landuse.eq(11).rename("roof_IND");
var percent_roofs_intURB = roofs_landuse.eq(4).rename("roof_intURB");
var percent_roofs_AG = roofs_landuse.eq(1).rename("roof_AG");

// CO Emissions
var Vulcan_total = ee.Image("users/stormwaterheatmap/Vulcan_total").reduce('mean').rename("CO_emissions_total");
var Vulcan_cmv = ee.Image("users/stormwaterheatmap/Vulcan_cmv").reduce('mean').rename("CO_emissions_cmv");
var Vulcan_onroad = ee.Image("users/stormwaterheatmap/Vulcan_onroad").reduce('mean').rename("CO_emissions_onroad")
// PM 2.5 for specific regions
var v4_pm25 = ee.Image("users/stormwaterheatmap/V4NA03_PM25_NA_201001_201012-RH35-NoNegs").rename("PM25_NA");
var sa = ee.Image("users/stormwaterheatmap/surface_area").rename("particulate_surface_area");

// Combine predictors into a single image
var predictors = ee.Image.cat([traffic,
  imp_ground, age_2000_2014, age_1990_2000, age_1975_1990, age_pre_1975,
  Vulcan_onroad
]);

// Reduce regions to get statistics for each watershed
var ee_stats = predictors.reduceRegions({
  collection: watersheds,
  reducer: ee.Reducer.mean(),
  scale: 30
});

// Evaluate and print the results
ee_stats.evaluate(function(result) {
  print(result);
});

// Map a specific predictor (example: Vulcan emissions)
var map_image = Vulcan_cmv; // Replace with the desired predictor
var map_viz = {min: 2, max: 7, palette: ['black', 'yellow', 'red'], opacity: 0.5};
Map.centerObject(watersheds, 7);
Map.addLayer(map_image, map_viz);
Map.addLayer(watersheds,{},'watersheds');

// Saving output as CSV (This would need server-side export in a real-world scenario)
Export.table.toDrive({
  collection: ee_stats,
  description: 'Predictors_Export',
  fileFormat: 'CSV'
});
