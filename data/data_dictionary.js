/*
 * @fileoverview bring in data from data_raw and oither sources.
 * Creates a dictionary of images and metadata for display and analysis.
 */

var rasters = {
    "Age of Imperviousness": {
        "discrete": "TRUE",
        "labels": ["2000–2014", "1990–2000", "Before 1990"],
        "sourceName": "The Nature Conservancy; Columbia University,  Center for International Earth Science Information Network",
        "sourceUrl": "http://doi.org/10.2905/jrc-ghsl-10007",
        "units": "epoch",
        "scale": 30,
        "values": ["3", "4", "5"],
        "vizType": "barChart",
        "default_reduction": "Category",
        "description": "Impervious surface by estimated date of conversion",
        "docs_link": "docs/API/image_layers/Age%20of%20Development",
        "safe_name": "age_of_imperviousness",
        "layer": {
            "eeObject": "eeObject",
            "name": "Age of Imperviousness",
            "visParams": {
                "min": 3,
                "max": 5,
                "palette": ["009E73", "F0E442", "CC6677"],
                "opacity": 0.8,
                "_row": "Age of Imperviousness"
            }
        }
    },
    "Flow Duration Index": {
        "discrete": "FALSE",
        "sourceName": "The Nature Conservancy",
        "units": "index",
        "scale": 10,
        "vizType": "bigNumberMean",
        "default_reduction": "mean",
        "description": "Dimensionless index indicating level of flow control needed to match forest hydrology.",
        "docs_link": "docs/API/image_layers/Flow%20Duration%20Index",
        "safe_name": "flow_duration_index",
        "layer": {
            "eeObject": "eeObject",
            "name": "Flow Duration Index",
            "visParams": {
                "min": 1,
                "max": 10,
                "palette": ["f0f9e8", "a8ddb5", "7bccc4", "43a2ca", "0868ac"],
                "opacity": 0.8,
                "_row": "Flow Duration Index"
            }
        }
    },
    "HSPF Land Cover Type": {
        "discrete": "TRUE",
        "labels": ["Forest/Trees", "Pasture", "Grass", "Water", "Impervious-roof", "Impervious-nonRoof"],
        "sourceName": "The Nature Conservancy",
        "units": "Land Cover Type",
        "scale": 10,
        "values": ["0", "1", "2", "3", "4", "5"],
        "vizType": "barChart",
        "default_reduction": "Category",
        "description": "Land cover classified by categories used in HSPF/WWHM",
        "safe_name": "hspf_land_cover_type",
        "layer": {
            "eeObject": "eeObject",
            "name": "HSPF Land Cover Type",
            "visParams": {
                "min": 0,
                "max": 5,
                "palette": ["#55775e", "#dacd7f", "#7e9e87", "#b3caff", "#844c8b", "#ead1ff"],
                "opacity": 0.8,
                "_row": "HSPF Land Cover Type"
            }
        }
    },
    "Hydrologic Response Units": {
        "discrete": "TRUE",
        "labels": ["Outwash, Forest, Flat", "Outwash,  Forest,  Moderate", "Outwash, Forest,  Steep", "Outwash,  Pasture,  Flat", "Outwash,  Pasture,  Moderate", "Outwash,  Pasture,  Steep", "Outwash,  Lawn ,  Flat", "Outwash,  Lawn ,  Moderate", "Outwash,  Lawn ,  Steep", "Till,  Forest,  Flat", "Till,  Forest,  Moderate", "Till,  Forest,  Steep", "Till,  Pasture,  Flat", "Till,  Pasture,  Moderate", "Till,  Pasture,  Steep", "Till,  Lawn ,  Flat", "Till,  Lawn ,  Moderate", "Till,  Lawn ,  Steep", "Saturated,  Forest,  Flat", "Saturated,  Forest,  Moderate", "Saturated,  Forest,  Steep", "Saturated,  Pasture,  Flat", "Saturated,  Pasture,  Moderate", "Saturated,  Pasture,  Steep", "Saturated,  Lawn ,  Flat", "Saturated,  Lawn ,  Moderate", "Saturated,  Lawn ,  Steep", "Impervious,   Flat", "Impervious,  Moderate", "Impervious,  Steep"],
        "sourceName": "The Nature Conservancy",
        "units": "HRU",
        "scale": 10,
        "values": ["0", "1", "2", "10", "11", "12", "20", "21", "22", "100", "101", "102", "110", "111", "112", "120", "121", "122", "200", "201", "202", "210", "211", "212", "220", "221", "222", "250", "251", "252"],
        "vizType": "bigNumberMean",
        "default_reduction": "Category",
        "description": "Units of common soils, land cover, and slope used in continuous simulation modeling.",
        "docs_link": "docs/API/image_layers/Flow%20Duration%20Index",
        "safe_name": "hydrologic_response_units",
        "layer": {
            "eeObject": "eeObject",
            "name": "Hydrologic Response Units",
            "visParams": {
                "min": 0,
                "max": 252,
                "palette": ["#e5f5f9", "#99d8c9", "#2ca25f", "#e0ecf4", "#9ebcda", "#8856a7", "#e0f3db", "#a8ddb5", "#43a2ca", "#ece7f2", "#a6bddb", "#2b8cbe", "#ece2f0", "#a6bddb", "#1c9099", "#e7e1ef", "#c994c7", "#dd1c77", "#fde0dd", "#fa9fb5", "#c51b8a", "#edf8b1", "#7fcdbb", "#2c7fb8", "#f7fcb9", "#addd8e", "#31a354", "#fee6ce", "#fdae6b", "#e6550d"],
                "opacity": 0.8,
                "_row": "Hydrologic Response Units"
            }
        }
    },
    "Imperviousness": {
        "discrete": "FALSE",
        "sourceName": "The Nature Conservancy",
        "units": "Percent",
        "scale": 1,
        "values": ["0", "1"],
        "vizType": "bigNumberPercent",
        "default_reduction": "mean",
        "description": "Percent impervious land cover",
        "safe_name": "imperviousness",
        "layer": {
            "eeObject": "eeObject",
            "name": "Imperviousness",
            "visParams": {
                "min": 0,
                "max": 100,
                "palette": [
  "#0C0405",
  "#2E1D3D",
  "#423D7B",
  "#38659E",
  "#358FA7",
  "#41B7AD",
  "#8AD9B1",
  "#DEF5E5",
  ],
                "opacity": 0.8,
                "_row": "Imperviousness"
            }
        }
    },
    "Land Cover": {
        "discrete": "TRUE",
        "labels": ["No data", "Grass/Low Vegetation", "Shrub/Medium Vegetation", "Trees/Forest", "Bare soil", "Water", "Impervious", "Impervious - Roofs "],
        "sourceName": "The Nature Conservancy",
        "units": "Land Cover Type",
        "scale": 1,
        "values": ["0", "1", "2", "3", "4", "5", "6", "7"],
        "default_reduction": "Category",
        "description": "1-meter resolution land cover classification",
        "safe_name": "land_cover",
        "layer": {
            "eeObject": "eeObject",
            "name": "Land Cover",
            "visParams": {
                "min": 0,
                "max": 7,
                "palette": ["#ffffff", "#3ead63", "#96ca6e", "#26532b", "#a39171", "#476b9d", "#adacb5", "#d8d5db"],
                "opacity": 0.8,
                "_row": "Land Cover"
            }
        }
    },
    "Land Use": {
        "discrete": "TRUE",
        "labels": ["Undesignated", "Agricultural", "Tribal", "Forest Lands", "Intensive Urban", "Rural Character Residential", "Water", "Right of Way", "Active Open Space and Recreation", "Urban Character Residential", "Industrial", "Public", "Natural Preservation", "Military", "Mineral Resource Area"],
        "sourceName": "Puget Sound Mapping Project",
        "sourceUrl": "https://www.commerce.wa.gov/serving-communities/growth-management/puget-sound-mapping-project/",
        "units": "Land Use type",
        "scale": 5,
        "values": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"],
        "default_reduction": "Category",
        "description": "Department of Commerce Master Land Use Category",
        "safe_name": "land_use",
        "layer": {
            "eeObject": "eeObject",
            "name": "Land Use",
            "visParams": {
                "min": 0,
                "max": 14,
                "palette": ["#394B59", "#669C42", "#EFD09E", "#14774C", "#9E2B0E", "#F4A691",
                "#2778AC", "#6E8387", "#8EB8B3", "#D17257", "#7C497B", "#554180", "#66CDAB",
                "#9FABA2", "#BF93BE"],
                "opacity": 0.8,
                "_row": "Land Use"
            }
        }
    },
    "Population Density": {
        "discrete": "FALSE",
        "sourceName": "2010 US Census Blocks",
        "sourceUrl": "https://www2.census.gov/geo/pdfs/maps-data/data/tiger/tgrshp2010/TGRSHP10SF1.pdf",
        "units": "Population per ha",
        "scale": 100,
        "default_reduction": "mean",
        "description": "2010 Census, population density",
        "safe_name": "population_density",
        "layer": {
            "eeObject": "eeObject",
            "name": "Population Density",
            "visParams": 
                {min:5,max:45,palette:
  ["#03051A",
  "#36193E",
  "#701F57",
  "#AE1B59",
  "#E03342",
  "#F27651",
  "#F6B48E",
  "#FAEBDD"
                ],
                "opacity": 0.8,
                "_row": "Population Density"
            }
        }
    },
    "Precipitation (mm)": {
        "discrete": "FALSE",
        "sourceName": "Salathé et al 2019",
        "sourceUrl": "https://cig.uw.edu/our-work/applied-research/heavy-precip-and-stormwater/",
        "units": "mm/year",
        "scale": 2500,
        "default_reduction": "mean",
        "description": "Mean annual precipitation (1970-1999)",
        "safe_name": "precipitation_mm",
        "layer": {
            "eeObject": "eeObject",
            "name": "Precipitation (mm)",
            "visParams": {
                "min": 500,
                "max": 3800,
                "palette":
                    //["#781c81", "#3f60ae", "#539eb6", "#6db388", "#cab843", "#e78532", "#d92120"],
                    [
  "#FFFFFF",
  "#F7FCF0",
  "#E0F3DB",
  "#CCEBC5",
  "#A8DDB5",
  "#7BCCC4",
  "#4EB3D3",
  "#2B8CBE",
  "#0868AC",
  "#084081",
  "#00203E"
]
                 
                 ,
                "opacity": 0.8,
                "_row": "Precipitation (mm)"
            }
        }
    },
    "Runoff (mm)": {
        "discrete": "FALSE",
        "sourceName": "The Nature Conservancy",
        "units": "mm/year",
        "scale": 10,
        "default_reduction": "mean",
        "description": "Mean annual runoff calculated through continuous simulation for the period 1970-1999.",
        "safe_name": "runoff_mm",
        "layer": {
            "eeObject": "data.mean_annual_runoff.rename('mean_annual_runoff_mm')",
            "name": "Runoff (mm)",
            "visParams": {
                "min": 25,
                "max": 1016,
                "palette": ["eafdfd", "9cd4da", "61a8c7", "427bb7", "3f4b96", "292851", "040613"],
                "opacity": 0.8,
                "_row": "Runoff (mm)"
            }
        }
    },
    "Slope": {
        "discrete": "FALSE",
        "sourceName": "USGS National Elevation Dataset 1/3 Arc-Second",
        "sourceUrl": "https://nationalmap.gov/elevation.html",
        "units": "Percent",
        "scale": 10,
        "default_reduction": "mean",
        "description": "Continuous ground surface slope in degrees",
        "safe_name": "slope",
        "layer": {
            "eeObject": "eeObject",
            "name": "Slope",
            "visParams": {
                "min": 2,
                "max": 20,
                "palette": ["#3f60ae", "#539eb6", "#6db388", "#cab843", "#e78532", "#d92120"],
                "opacity": 0.8,
                "_row": "Slope"
            }
        }
    },
    "Slope Categories": {
        "discrete": "TRUE",
        "labels": ["Flat", "Moderate", "Steep"],
        "sourceName": "The Nature Conservancy",
        "units": "Category",
        "scale": 10,
        "values": ["0", "1", "2"],
        "vizType": "barChart",
        "default_reduction": "Category",
        "description": "Categorized ground surface slope",
        "safe_name": "slope_categories",
        "layer": {
            "eeObject": "eeObject",
            "name": "Slope Categories",
            "visParams": {
                "min": 0,
                "max": 2,
                "palette": ["#009B9E", "#F1F1F1", "#C75DAB"],
                "opacity": 0.8,
                "_row": "Slope Categories"
            }
        }
    },
    "Soils": {
        "discrete": "TRUE",
        "labels": ["Outwash", "Till", "Saturated", "Water"],
        "sourceName": "The Nature Conservancy",
        "units": "Hydrologic Soil Group",
        "scale": 5,
        "values": ["1", "2", "3", "4"],
        "vizType": "barChart",
        "default_reduction": "Category",
        "description": "Hydrologic Soil Group",
        "safe_name": "soils",
        "layer": {
            "eeObject": "eeObject",
            "name": "Soils",
            "visParams": {
                "min": 1,
                "max": 4,
                "palette": ["#69995D", "#564138", "#F06543", "#b3caff"],
                "opacity": 0.8,
                "_row": "Soils"
            }
        }
    },
    "Traffic": {
        "discrete": "FALSE",
        "sourceName": "The Nature Conservancy",
        "units": "Average Annual Daily Trips",
        "scale": 10,
        "vizType": "bigNumberMean",
        "default_reduction": "mean",
        "description": "Mean Annual Average Daily Trips",
        "safe_name": "traffic",
        "layer": {
            "eeObject": "eeObject",
            "name": "Traffic",
            "visParams": {
                "min": 0,
                "max": 100000,
                "palette":
                    [
                        "1A3399",
                        "3B7CB8",
                        "5EBAD1",
                        "ABE5D4",
                        "DEEAB4",
                        "E0DD86",
                        "CBB64D",
                        "BF9D39",
                        "B99333",
                        "AF7E28",
                        "AB7424",
                        "A5691F",
                        "9B5516",
                        "964B12",
                        "91400E",
                        "8A3308",
                        "842705",
                        "7F1900"
                    ],
                "opacity": 0.8,
                "_row": "Traffic"
            }
        }
    }
}
/**
 * Bring in data, renam and add sources to dictionary
 */
var data = require('users/stormwaterheatmap/apps:data/data_raw')

// data.Flow_Duration_Index
// data.HSPF_Land_Cover_Type
// data.Hydrologic_Response_Units
// data.Imperviousness
// data.Land_Cover
// data.Land_Use
// data.Population_Density
// data.Precipitation_mm
// data.Runoff_mm
// data.Slope
// data.Slope_Categories
// data.Soils

// data.Traffic
var layerSources = {
    "Age of Imperviousness": data.Age_of_Imperviousness.rename('age_of_impervious_surface'),
    "HSPF Land Cover Type": data.HSPF_Land_Cover_Type.rename('hspf_landcover_categories'),
    "Imperviousness": data.Imperviousness.rename('imperviousness'),
    "Land Cover": data.Land_Cover.rename('landcover'),
    "Land Use": data.Land_Use.rename('Land Use'),

    "Population Density": data.Population_Density.rename('population_density'), //.mask(data.population),

    "Precipitation (mm)": data.Precipitation_mm,

    "Runoff (mm)": data.Runoff_mm.rename(
        'mean_annual_runoff_mm'),
    "Slope": data.Slope.rename('slope'),
    "Slope Categories": data.Slope_Categories.rename('slope_categories'),
    "Soils": data.Soils.rename('soils'),
    "Traffic": data.Traffic.rename('traffic_AADT'), //.focal_max(2).focal_min(1),//.focal_mean(1).mask(data.traffic.exp().gt(1)),
    "Flow Duration Index": data.Flow_Duration_Index.rename('flow_duration_index'),
    "Hydrologic Response Units": data.Hydrologic_Response_Units

}
var layNames = Object.keys(layerSources)
/**
 * add data to layer dictionary
 */
for (var i = 0; i < layNames.length; i++) {
    var thisLayer = (layNames[i]);
    rasters[thisLayer].layer.eeObject = layerSources[thisLayer]
}
/**
 * Bring in coc data and create a separate data dictionary
 */
//var coc_layers = require("users/stormwaterheatmap/apps:data/serve_coc_data")

var coc_pal = ["042333", "2c3395", "744992", "b15f82", "eb7958", "fbb43d", "e8fa5b", "ffffff"]

var load_pal = ["000000", "440154", "433982", "30678d", "218f8b", "36b677", "8ed542", "fde725"]

data.Total_Kjeldahl_Nitrogen_Concentration



//Coc data dictionary
var cocs = {
    "Total Suspended Solids Concentration": {
        "discrete": "FALSE",
        "log_transformed_viz": "TRUE",
        "sourceName": "The Nature Conservancy",
        "sourceUrl": "https://www.stormwaterheatmap.dev/docs/Data%20Layers/total_suspended_solids_concentration",
        "units": "mg/L",
        "scale": 30,
        "default_reduction": "mean",
        "description": "Predicted Total Suspended Solids Concentration",
        "safe_name": "pollutant_concentration",
        "layer": {
            "eeObject": data.Total_Suspended_Solids_Concentration,
            "name": "Total Suspended Solids",
            "visParams": {
                "bands": "log_tss_concentration_mg_per_L",
                "min": 1.9,
                "max": 3.6,
                "palette": coc_pal,
                "opacity": 0.8
            }
        }
    },
    // "Total Suspended Solids Load": {
    //     "discrete": "FALSE",
    //     "log_transformed_viz": "FALSE",
    //     "sourceName": "The Nature Conservancy",
    //     "sourceUrl": "https://www.stormwaterheatmap.dev/docs/Data%20Layers/total_suspended_solids_load",
    //     "units": "g/m² per year",
    //     "scale": 30,
    //     "default_reduction": "mean",
    //     "description": "Predicted Total Suspended Solids Load",
    //     "safe_name": "pollutant_load",
    //     "layer": {
    //         "eeObject": coc_layers.tss_load,
    //         "name": "Total Suspended Solids Load",
    //         "visParams": {
    //             "min": 0,
    //             "max": 30,
    //             "palette": load_pal,
    //             "opacity": 0.8
    //         }
    //     }
    // },
    "Total Copper Concentration": {
        "discrete": "FALSE",
        "log_transformed_viz": "TRUE",
        "sourceName": "The Nature Conservancy",
        "sourceUrl": "https://www.stormwaterheatmap.dev/docs/Data%20Layers/total_copper_concentration",
        "units": "mcg/L",
        "scale": 30,
        "default_reduction": "mean",
        "description": "Predicted Total Copper Concentration",
        "safe_name": "pollutant_concentration",
        "layer": {
            "eeObject": data.Total_Copper_Concentration,
            "name": "Total Copper",
            "visParams": {
                "bands": "log_copper_concentration_ug_per_L",
                "min": 0,
                "max": 3.43,
                "palette": coc_pal,
                "opacity": 0.8
            }
        }
    },
    // "Total Copper Load": {
    //     "discrete": "FALSE",
    //     "log_transformed_viz": "FALSE",
    //     "sourceName": "The Nature Conservancy",
    //     "sourceUrl": "https://www.stormwaterheatmap.dev/docs/Data%20Layers/total_copper_load",
    //     "units": "mg/m² per year",
    //     "scale": 30,
    //     "default_reduction": "mean",
    //     "description": "Predicted Total Copper Load",
    //     "safe_name": "pollutant_load",
    //     "layer": {
    //         "eeObject": coc_layers.copper_load,
    //         "name": "Total Copper Load",
    //         "visParams": {
    //             "min": 0,
    //             "max": 16,
    //             "palette": load_pal,
    //             "opacity": 0.8
    //         }
    //     }
    // },
    "Total Phosphorus Concentration": {
        "discrete": "FALSE",
        "log_transformed_viz": "TRUE",
        "sourceName": "The Nature Conservancy",
        "sourceUrl": "https://www.stormwaterheatmap.dev/docs/Data%20Layers/total_phosphorus_concentration",
        "units": "mcg/L",
        "scale": 30,
        "default_reduction": "mean",
        "description": "Predicted Total Phosphorus Concentration",
        "safe_name": "pollutant_concentration",
        "layer": {
            "eeObject": data.Total_Phosphorus_Concentration,
            "name": "Total Phosphorus",
            "visParams": {
                "bands": "log_p_concentration_ug_per_L",
                "min": 2.5,
                "max": 5.298,
                "palette": coc_pal,
                "opacity": 0.8
            }
        }
    },
    // "Total Phosphorus Load": {
    //     "discrete": "FALSE",
    //     "log_transformed_viz": "FALSE",
    //     "sourceName": "The Nature Conservancy",
    //     "sourceUrl": "https://www.stormwaterheatmap.dev/docs/Data%20Layers/total_phosphorus_load",
    //     "units": "mg/m² per year",
    //     "scale": 30,
    //     "default_reduction": "mean",
    //     "description": "Predicted Total Phosphorus Load",
    //     "safe_name": "pollutant_load",
    //     "layer": {
    //         "eeObject": coc_layers.p_load,
    //         "name": "Total Phosphorus Load",
    //         "visParams": {
    //             "min": 0,
    //             "max": 100,
    //             "palette": load_pal,
    //             "opacity": 0.8
    //         }
    //     }
    // },
    "Total Zinc Concentration": {
        "discrete": "FALSE",
        "log_transformed_viz": "TRUE",
        "sourceName": "The Nature Conservancy",
        "sourceUrl": "https://www.stormwaterheatmap.dev/docs/Data%20Layers/total_zinc_concentration",
        "units": "mcg/L",
        "scale": 30,
        "default_reduction": "mean",
        "description": "Predicted Total Zinc Concentration",
        "safe_name": "pollutant_concentration",
        "layer": {
            "eeObject": data.Total_Zinc_Concentration,
            "name": "Total Zinc",
            "visParams": {
                "bands": "log_zinc_concentration_ug_per_L",
                "min": 2.357235987186432,
                "max": 4.9,
                "palette": coc_pal,
                "opacity": 0.8
            }
        }
    },
    // "Total Zinc Load": {
    //     "discrete": "FALSE",
    //     "log_transformed_viz": "FALSE",
    //     "sourceName": "The Nature Conservancy",
    //     "sourceUrl": "https://www.stormwaterheatmap.dev/docs/Data%20Layers/total_zinc_load",
    //     "units": "mg/m² per year",
    //     "scale": 30,
    //     "default_reduction": "mean",
    //     "description": "Predicted Total Zinc Load",
    //     "safe_name": "pollutant_load",
    //     "layer": {
    //         "eeObject": coc_layers.zinc_load,
    //         "name": "Total Zinc Load",
    //         "visParams": {
    //             "min": 0,
    //             "max": 100,
    //             "palette": load_pal,
    //             "opacity": 0.8
    //         }
    //     }
    // },
    "Total Kjeldahl Nitrogen Concentration": {
        "discrete": "FALSE",
        "log_transformed_viz": "TRUE",
        "sourceName": "The Nature Conservancy",
        "sourceUrl": "https://www.stormwaterheatmap.dev/docs/Data%20Layers/tkn_concentration",
        "units": "mcg/L",
        "scale": 30,
        "default_reduction": "mean",
        "description": "Predicted Total Kjeldahl Nitrogen Concentration",
        "safe_name": "pollutant_concentration",
        "layer": {
            "eeObject": data.Total_Kjeldahl_Nitrogen_Concentration,
            "name": "Total Kjeldahl Nitrogen",
            "visParams": {
                "bands": "log_tkn_concentration_ug_per_L",
                "min": 5.6,
                "max": 6.72,
                "palette": coc_pal,
                "opacity": 0.8
            }
        }
    // },
    // "Total Kjeldahl Nitrogen Load": {
    //     "discrete": "FALSE",
    //     "log_transformed_viz": "FALSE",
    //     "sourceName": "The Nature Conservancy",
    //     "sourceUrl": "https://www.stormwaterheatmap.dev/docs/Data%20Layers/tkn_load",
    //     "units": "mg/m² per year",
    //     "scale": 30,
    //     "default_reduction": "mean",
    //     "description": "Predicted Kjeldahl Nitrogen Load",
    //     "safe_name": "pollutant_load",
    //     "layer": {
    //         "eeObject": data.,
    //         "name": "Total Kjeldahl Nitrogen Load",
    //         "visParams": {
    //             "min": 0,
    //             "max": 800,
    //             "palette": load_pal,
    //             "opacity": 0.8
    //         }
    //     }
    }
}


exports.vectors = { //for legacy functions
    counties: data.counties,
    HUC12: data.HUC12,
    HUC10: data.HUC10,
    HUC08: data.HUC08,
    NHDPlus: data.NHDPlus,
    PS_AU: data.PS_AU,
    PugetSound: data.PugetSound,
    WRIA: data.WRIA,
    MS4: data.MS4,
    Cities: data.cityLimits
}

var rename_vector = function (fc, col_name) {
    var DataRenamed = fc.map(function (feat) {
        return ee.Feature(feat.geometry(), {
                "Watershed Name": feat.get(col_name),
            })
            .copyProperties(feat)
    })
    return (DataRenamed)
}


var vector_dict = {
    "County Boundaries": rename_vector(data.counties, "NAMELSAD"),
    "HUC12: USGS Watershed Boundary Dataset": rename_vector(data.HUC12, "name"),
    "HUC10: USGS Watershed Boundary Dataset": rename_vector(data.HUC10, "name"),
    "HUC08: USGS Watershed Boundary Dataset": rename_vector(data.HUC08, "name"),
    "NHDPlus High Resolution Watershed Dataset": rename_vector(data.NHDPlus, "FEATUREID"),
    "Puget Sound Assessment Units": rename_vector(data.PS_AU, "OBJECTID"),
    "Ecology Water Resource Inventory Area (WRIA)": rename_vector(data.WRIA, "WRIA_NM"),
    "City Boundaries": data.cityLimits
}


var display_imgs = {"psau": data.psau_shed_img

}
exports.display_imgs = display_imgs

exports.vector_dict = vector_dict
exports.rasters = rasters
exports.cocs = cocs

//print(cocs)
