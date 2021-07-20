/* ---------------------------
// Author: Christian Nilsen, Geosyntec Consultants 
// Email: cnilsen@geosyntec.com
// Date Created: 2019-07-19
// ---------------------------
/* 

Load Data 
*/
var data = require('users/stormwaterheatmap/apps:data/data_raw')


//Begin Data Dictionary 
//---------------------------
//updated 6/22/2021

var rasters = {

    'Hydrology Data Layers':{
        'Runoff':
        {
            layer:
            {
                eeObject: data.mean_annual_runoff.rename('mean_annual_runoff_mm'),
                name: 'Mean Annual Runoff',
                visParams:
                {
                    palette: [
  "#291b32",
  "#622271",
  "#8f3b9c",
  "#9275b4",
  "#8ca9cc",
  "#98d6de",
  "#f1f3ee"

                    ],
                    min: 100,
                    max: 1000,
                    opacity: 0.8
                }
            },
            discrete: false,
            values: null,
            units: 'mm/year',
            labels: null, //['Pervious', 'Impervious'],
            vizType: 'histogram'
            //var imageVisParam = {"opacity":1,"bands":["sum"],"min":100,"max":1000,"palette":["000000","182e49","2b6f39","a07949","d490c6","c2d8f3","ffffff"]};
        },
        'Runoff (inches)':
        {
            layer:
            {
                eeObject: data.mean_annual_runoff.divide(ee.Image(25.4)).rename('mean_annual_runoff_inches'),
                name: 'Mean Annual Runoff',
                visParams:
                {
                    palette:  [
  "#291b32",
  "#622271",
  "#8f3b9c",
  "#9275b4",
  "#8ca9cc",
  "#98d6de",
  "#f1f3ee"

                    ], // ["#000000", "#182e49", "#2b6f39", "#a07949", "#d490c6", "#c2d8f3", "#ffffff"],
                    min: 5,
                    max: 30,
                    opacity: 0.7
                }
            },
            discrete: false,
            values: null,
            units: 'in/year',
            labels: null, //['Pervious', 'Impervious'],
            vizType: 'histogram'
            //var imageVisParam = {"opacity":1,"bands":["sum"],"min":100,"max":1000,"palette":["000000","182e49","2b6f39","a07949","d490c6","c2d8f3","ffffff"]};
        }, 
        'HSPF Land Cover Type':
        {
            layer:
            {
                eeObject: data.hspf_landcover.rename('hspf_landcover_categories')
                    ,
                name: 'Land Cover',
                visParams:
                {
                    palette: ['55775e',
                        'dacd7f',
                        '7e9e87',
                        'b3caff',
                        '844c8b',
                        'ead1ff'
                    ],
                    min: 0,
                    max: 5,
                    opacity: 0.8
                }
            },
            discrete: true,
            values: [0, 1, 2, 3, 4,
                5
            ],
            units: null,
            labels: ['Forest/Trees',
                'Pasture', 'Grass',
                'Water',
                'Impervious - Roofs',
                'Impervious'
            ],
            vizType: 'pieChart',
            sourceName: 'Robertson et al, 20XX',
            sourceUrl: []
        },
        'Flow Duration Index':
        {
            layer:
            {
                eeObject: data.fdr.rename('flow_duration_index'),
                name: 'Flow Duration Index',
                visParams:
                {
                    palette: ['#00007f',
                        '#002aff',
                        '#00d4ff',
                        '#7fff7f',
                        '#ffd400',
                        '#ff2a00',
                        '#7f0000'
                    ],
                    min: 1,
                    max: 10,
                    opacity: 0.8
                }
            },
            discrete: false,
            values: null,
            units: null,
            labels: null,
            vizType: 'bigNumberMean',
            sourceName: null,//'Salathé, EP, AF Hamlet, CF Mass M Stumbaugh, S-Y Lee, R Steed: Estimates of 21st Century Flood Risk in the Pacific Northwest Based on Regional Scale Climate Model Simulations.',
            sourceUrl: null//'https://cig.uw.edu/our-work/applied-research/heavy-precip-and-stormwater/'
        },

    }, 
    'Input Data Layers':{

    'Traffic':
    {
        layer:
        {
            eeObject: data.traffic.rename('traffic_AADT'),
            name: 'Traffic',
            visParams:
            {
                palette: [
                    
  "#000004",
  "#320A5A",
  "#781B6C",
  "#BB3654",
  "#EC6824",
  "#FBB41A",
  "#FCFFA4"

                ],
                min: 0,
                max: 8,
                opacity: 0.8,
            }
        },
        discrete: false,
        values: null,
        units: 'Average Annual Daily Trips (log)',
        labels: null,
        vizType: 'bigNumberPercent',
        sourceName: null
    },
 
  'Age of Imperviousness':
    {
        layer:
        {
            eeObject: data.age_of_development.rename('age_of_impervious_surface'),
            name: 'Age of Imperviousness',
            visParams:
            {
                palette: [
  '#ffffd4','#fed98e','#fe9929','#cc4c02'

                ],
                min: 3,
                max: 6,
                opacity: 0.8,
            }
        },
        discrete: true,
        values: [3, 4, 5, 6],
        units: ['epoch'],
        labels: ['2000–2014','1990–2000','1975–1990', 'Before 1975'
            
        ],
        vizType: 'discrete',
        sourceName: null,
        sourceUrl: null 
    },
    "imperviousness": {
        layer:
        {
            eeObject: data.imperviousness.rename('imperviousness'),
            name: 'imperviousness',
            visParams:
            {
                palette: ['10371c','f2298f'
                ],
                min: 0,
                max: 1,
                opacity: 0.8,
            }
        },
        discrete: true,
        values: [0, 1],
        units: [],
        labels: ['Pervious',
            'Impervious'
        ],
        vizType: 'bigNumberPercent',
        sourceName: 'Robertson et al, 20XX',
        sourceUrl: []
    },
    'Precipitation':
    {
        layer:
        {
            eeObject: data.precip.divide(
                ee.Image(25.4)),
            name: 'Mean Annual Preciptation',
            visParams:
            {
                palette: [
    "781c81",
    "3f60ae",
    "539eb6",
    "6db388",
    "cab843",
    "e78532",
    "d92120"
  ],
                min: 20,
                max: 120,
                opacity: 0.8
            }
        },
        discrete: false,
        values: null,
        units: 'in/year',
        labels: null,
        vizType: 'bigNumberMean',
        sourceName: 'Salathé et al 2019',
        sourceUrl: 'https://cig.uw.edu/our-work/applied-research/heavy-precip-and-stormwater/'
    },
    'Soils':
    {
        layer:
        {
            eeObject: data.soils.rename('soils'),
            name: 'Hydrologic Soils Groups',
            visParams:
            {
                palette: ['#69995D',
                    '#564138',
                    '#F06543',
                    '#b3caff'
                ],
                min: 1,
                max: 4,
                opacity: 0.8
            }
        },
        discrete: true,
        values: [1, 2, 3, 4],
        units: null,
        labels: ['Outwash', 'Till',
            'Saturated','Water'
        ],
        vizType: 'pieChart'
    },
    'Slope Categories':
    {
        layer:
        {
            eeObject: data.slope.rename('slope_categories'),
            name: 'Slope Categories',
            visParams:
            {
                palette: ['#009B9E',
                    '#F1F1F1',
                    '#C75DAB'
                ],
                min: 0,
                max: 2,
                opacity: 0.8
            }
        },
        discrete: true,
        values: [0, 1, 2],
        units: null,
        labels: ['Flat', 'Moderate',
            'Steep'
        ],
        vizType: 'pieChart'
    },
    'Slope':
    {
        layer:
        {
            eeObject: data.slope_cont.rename('slope'),
            name: 'Slope',
            visParams:
            {
                palette: ['3f60ae',
                    '539eb6',
                    '6db388',
                    'cab843',
                    'e78532',
                    'd92120'
                ],
                min: 0,
                max: 25,
                opacity: 0.8
            }
        },
        discrete: false,
        //values: [0, 1],
        units: '%',
        labels: null,
        vizType: 'hist'
    },
    'Land Cover':
    {
        layer:
        {
            eeObject: data.tncLC.rename('landcover'),
            name: 'Land Cover',
            visParams:
            {
                palette: ["ffffff",
                    "3ead63",
                    "96ca6e",
                    "26532b",
                    "a39171",
                    "476b9d",
                    "adacb5",
                    "d8d5db"
                ],
                min: 0,
                max: 7,
                opacity: 0.8
            }
        },
        discrete: true,
        values: [0, 1, 2, 3, 4,
            5, 6, 7
        ],
        units: null,
        labels: ['No data', 'Grass/Low Vegetation',
            'Shrub/Medium Vegetation',
            'Trees/Forest',
            'Bare soil',
            'Water',
            'Impervious',
            'Impervious - Roofs'
        ],
        vizType: 'pieChart',
        sourceName: 'Robertson et al, 20XX',
        sourceUrl: []
    },

    'Age of Development':
    {
        layer:
        {
            eeObject: data.age_of_development.rename('age_of_development'), //var visParams = {
            name: 'Age of Development',
            visParams:
            {
                palette: ['000000',
                    '448564',
                    '70daa4',
                    '83ffbf',
                    'ffffff'
                ],
                min: 2,
                max: 6,
                opacity: 0.8
            }
        },
        discrete: true,
        values: [2, 3, 4, 5, 6],
        units: null,
        labels: ['Not developed',
            '2000 to 2014',
            '1990 to 2000',
            '1975 to 1990',
            'Prior to 1975 '
        ],
        vizType: 'histogram'
    },
    //
   
    'Population':
    {
        layer:
        {
            eeObject: data.population_per_ha.rename('population_count'),
            name: 'Population Count',
            visParams:
            {
                palette: ['#2f0f3e',
                    '#66185c',
                    '#9f2462',
                    '#ce4356',
                    '#eb7858',
                    '#f7b37c',
                    '#feedb0'
                ],
                min: 0,
                max: 300,
                opacity: 0.8
            }
        },
        discrete: false,
        values: null,
        units: 'Total Population',
        labels: null, //['Pervious', 'Impervious'],
        vizType: 'bigNumberSum'
    },
    'Land Use':
    {
        layer:
        {
            eeObject: data.landuse_img.rename('Land Use'),
            name: 'Land Use',
            visParams:
            {
                palette: [
                    '#eb3121', //res
                    '#6203ae', //ind
                    '#845609', //trans
                    '#ae39f3', //com
                    '#efcb09', //ag
                    '#a0c29b', //timber
                    '#476b9d', // water
                    '#4c6c0a', //open space 
                    //'#256C61' //
                ],
                min: 1,
                max: 8,
                opacity: 0.8
            }
        },
        discrete: true,
        values: [1, 2, 3, 4, 5, 6,
            7, 8
        ],
        units: null,
        labels: ['Residential',
            'Industrial',
            'Transportation ',
            'Commercial',
            'Agricultural',
            'Timber and Resource Extraction',
            'Water',
            'open space'
        ],
        vizType: 'pieChart'
    },

    
}
}
exports.vectors = {
    counties: data.counties, 
    HUC12:data.HUC12, 
    HUC10:data.HUC10, 
    HUC08:data.HUC08, 
    NHDPlus: data.NHDPlus, 
    PS_AU: data.PS_AU, 
    PugetSound: data.PugetSound,
    WRIA: data.WRIA, 
    MS4: data.MS4
}
exports.rasters = rasters



