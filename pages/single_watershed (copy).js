/**** Start of imports. If edited, may not auto-convert in the playground. ****/
//var image = ee.Image("projects/ee-stormwaterheatmap/assets/pasu_painted");
/***** End of imports. If edited, may not auto-convert in the playground. *****/

/**
 * @ Author: Your name
 * @ Create Time: 2022-03-04 22:01:53
 * @ Modified by: Your name
 * @ Modified time: 2022-03-05 21:21:08
 * @ Description:
 */


/*Load modules 
---------------------------------------------------------------------------------------------------- 
*/
var data = require('users/stormwaterheatmap/apps:data/data_dictionary.js')
var Style = require('users/stormwaterheatmap/apps:Modules/Style')
var charts = require('users/stormwaterheatmap/apps:Modules/chart.js')
var helpers = require('users/stormwaterheatmap/apps:Modules/helpers')
var fonts = Style.fonts



var layerProperties = data.rasters


//var vectors = data.vectors_dict


/*Style defaults  
---------------------------------------------------------------------------------------------------- 
*/

var colors = Style.colors

var fonts = Style.fonts
var featureStyle = {
    color: 'white',
    fillColor: '00000000',
    width: 1
}
// var imageVisParam = {
//     "opacity": 0.81,
//     "bands": ["first"],
//     "min": 5845.408857739145,
//     "max": 8458888.910842622,
//     "palette": ["1a9641", "a6d96a", "ffffbf", "fdae61", "d7191c"]
// };

/*Global Variables------------------------------------------------------------------------------------- 
 */
var clicked_basin
var clicked_basin_geom
var clicked_basin_fc
var WS


function handle_map_click(location) {

    var clicked_point = ee.Geometry.Point(location.lon, location.lat);
    clicked_basin_fc = WS.filterBounds(clicked_point); //use for display
    clicked_basin = ee.Feature(clicked_basin_fc.first());
    clicked_basin_geom = (clicked_basin_fc.first()).geometry();



    accept.style().set({
        shown: true
    })
    mapPanel.layers().reset()
    mapPanel.style().set({
        cursor: 'hand'
    });
    //make an opacity mask to display watershed 
    var con = ee.Image(1).byte().clip(clicked_basin_geom) //check
    var shade = ee.Image(1).byte()
    var opacityMask = shade.where(shade.eq(con), 0).selfMask()
    var empty = ee.Image().byte()
    var outline = empty.paint(clicked_basin_fc, 1, 2);
    mapPanel.addLayer(opacityMask, {
        palette: '000000',
        opacity: 0.6
    });
    mapPanel.addLayer(outline, {
        palette: 'whitesmoke'
    }, 'edges')

    mapPanel.centerObject(clicked_basin)
    // var featureinfo = ui.Chart.feature.byFeature(clicked_basin).setChartType('Table')
    // var infoTab = ui.Panel({
    //     style: {
    //         position: 'bottom-center',
    //         stretch: 'both',
    //         width: '80%',
    //         shown: false
    //     }
    // })
    // var closeTab = ui.Button({
    //     label: 'Close Table',
    //     onClick: function () {
    //         infoTab.style().set({
    //             shown: false
    //         })
    //     }
    // })
    // // infoTab.add(ui.Panel(ui.Label('⌧')))
    // infoTab.add(ui.Label({
    //     value: 'Watershed Info Table',
    //     style: fonts.H3
    // }))
    // infoTab.add(featureinfo)
    // infoTab.add(closeTab)

    return clicked_basin
}


function handle_inspect_click() {

    mapPanel.style().set({
        cursor: 'crosshair'
    })
    var WSname = watershedSelect.getValue();
    WS = vectors_dict[WSname];
    mapPanel.onClick(function(location) {
        (handle_map_click(location))
    })

}

function hline() {
    var line = (ui.Label({
        value: 'null',
        style: {
            height: '0px',
            border: '1px solid whitesmoke',
            stretch: 'horizontal',
        }
    }));
    return line
}




var makeLegend = function(layerObject) {
    var legend = helpers.makeLegend(layerObject)
    legendPanel.clear()
    legendPanel.add(legend)

}

// function ColorBar(palette) {
//     return ui.Thumbnail({
//         image: ee.Image.pixelLonLat().select(0),
//         params: {
//             bbox: [0, 0, 1, 0.1],
//             dimensions: '200x20',
//             format: 'png',
//             min: 0,
//             max: 1,
//             palette: palette,
//         },
//         style: {
//             stretch: 'horizontal',
//             margin: '0px 12px'
//         },
//     });
// }
// var barLegend = function (obj) {

//     var palette = obj.layer.visParams.palette
//     var low = obj.layer.visParams.min
//     var high = obj.layer.visParams.max
//     var mid = (low + high) / 2
//     var labelPanel = ui.Panel(
//         [
//             ui.Label(low, {
//                 margin: '4px 8px',
//                 textAlign: 'left',
//                 stretch: 'horizontal'
//             }),
//             ui.Label(mid, {
//                 margin: '4px 8px',
//                 textAlign: 'center',
//                 stretch: 'horizontal'
//             }),
//             ui.Label(high, {
//                 margin: '4px 8px',
//                 textAlign: 'right',
//                 stretch: 'horizontal'
//             })
//         ],
//         ui.Panel.Layout.flow('horizontal'),

//         {
//             width: '230px',
//             position: 'top-center'
//         }
//     );

//     var unitlabel = (ui.Label(obj.units))
//     var barTitle = (ui.Label({
//         value: obj.layer.name,
//         style: fonts.LegendTitle
//     }))

//     var barPanel = ui.Panel({
//         widgets: [barTitle, ColorBar(palette), labelPanel, unitlabel],
//         style: {
//             position: 'top-left',
//             padding: '12px'
//         }
//     })

//     return barPanel
// }
/* 
UI Functions 
---------------------------------------------------------------------------------------------------- 
*/


//** results Cards 


//**function for buttons to display layers on map
// var layerButton = function (layerObject) {

//     return ui.Panel([
//         ui.Button({
//             label: 'Show Layer',
//             onClick: function () {

//                 mapPanel.layers().insert(0, layerObject.layer)

//                 legendPanel.style().set({
//                     shown: true
//                 })
//                 makeLegend(layerObject)
//             }

//         }),
//         ui.Button({
//             label: 'Remove Layer',
//             onClick: function () {
//                 legendPanel.style().set({
//                     shown: false
//                 })
//                 var eeobject = layerObject.layer.eeObject
//                 var layers = mapPanel.layers()
//                 var layersJS = layers.getJsArray()
//                 var removedIndexes = []
//                 for (var i in layersJS) {
//                     var layer = layersJS[i]
//                     var object = layer.getEeObject()
//                     if (object === eeobject) {
//                         mapPanel.remove(layer)
//                         removedIndexes.push(Number(i))
//                     }
//                 }
//                 return removedIndexes
//             }
//         })


//     ]).setLayout(ui.Panel.Layout.flow('horizontal'))

// }


var reset_button = ui.Button({
    label: 'Reset',
    onClick: function() {
        print('Reset')
        mapInit()

    }
})

print(reset_button)


/** Returns a ui.Map with some UI configuration in place */
function makeMapPanel() {
    var map = ui.Map();
    map.setOptions('Dark', Style.mapStyles)
    map.setControlVisibility({
        all: false,
        zoomControl: true,
        mapTypeControl: true,
        layerList: true,
        fullscreenControl: true
    });
    return map;
}
var makeMainSubPanel = function() {
    var mainSubPanel = ui.Panel({
        style: {
            width: '100%',
            border: '9px solid purple',
            backgroundColor: 'white'
        }
    })

    return mainSubPanel
};
var makeFooter = function() {
    var footer = ui.Panel({
        style: {
            width: '100%',
            border: '1px solid darkgray',
            backgroundColor: 'white'
        }
    })
    return footer
}



var watershedSelectLabel = ui.Label({
    value: 'Select a watershed dataset to aggregate data:',
    style: Style.fonts.Caption2
});


var legendPanel = ui.Panel({
    style: {
        position: 'bottom-right',
        padding: '12 px',
        backgroundColor: colors.transparent,
        stretch: 'both',
        shown: false,
        // position: 'top-right'
    },

}).setLayout(ui.Panel.Layout.flow('vertical'));


function make_concentration_panel(region, scale) {

    var pan = ui.Panel({
        layout: ui.Panel.Layout.flow('horizontal', true),
        //style: {stretch:'horizontal'}
    })

    var concentration_objects = [
        'Total Copper Concentration',
        'Total Kjeldahl Nitrogen Concentration',
        'Total Phosphorus Concentration',
        'Total Suspended Solids Concentration',
        'Total Zinc Concentration'
    ]


    pan.add(
        //charts.coc_mean_conc(data.cocs["Total Copper Concentration"]),region,scale).add(
        charts.coc_mean_conc(data.cocs[concentration_objects[1]], region, scale)).add(
        charts.coc_mean_conc(data.cocs[concentration_objects[2]], region, scale)).add(
        charts.coc_mean_conc(data.cocs[concentration_objects[3]], region, scale)).add(
        charts.coc_mean_conc(data.cocs["Total Copper Concentration"]), region, scale).add(
        charts.coc_mean_conc(data.cocs[concentration_objects[4]], region, scale))

    return (pan)




}

function make_load_panel(region, scale) {

    var pan = ui.Panel({
        layout: ui.Panel.Layout.flow('horizontal', true),
        style: {
            stretch: 'horizontal'
        }
    })

    var Load_objects = [
        'Total Copper Load',
        'Total Kjeldahl Nitrogen Load',
        'Total Phosphorus Load',
        'Total Suspended Solids Load',
        'Total Zinc Load'
    ]


    pan.add(
        charts.coc_load(data.cocs[Load_objects[0]], region, 100)).add(
        charts.coc_load(data.cocs[Load_objects[1]], region, 100)).add(
        charts.coc_load(data.cocs[Load_objects[2]], region, 100)).add(
        charts.coc_load(data.cocs[Load_objects[3]], region, 100)).add(
        charts.coc_load(data.cocs[Load_objects[4]], region, 100))

    return (pan)




}


function makeReports() {

    var report_scale = mapPanel.getScale()

    // var pchart = charts.littleNum(layerProperties["Precipitation (mm)"],
    //     clicked_basin_geom, report_scale, 'mean')
    // var pchart2 = charts.histogramImage(
    //     layerProperties["Precipitation (mm)"], clicked_basin_geom,
    //     report_scale
    // )


    // var laybut = layerButton(layerProperties["Precipitation (mm)"])
    // var precipCard = cards('Precipitation',

    //     [hline(), subtitle('Watershed Mean'),
    //         pchart,
    //     hline(),
    //     subtitle('Histogram of Values'),
    //         pchart2,
    //         laybut
    //     ]
    // )
    // analyzePanel.add(precipCard)

    // print('done with precip_card')
    //var impChart = charts.stackedBar(layerProperties.Imperviousness, report_scale, clicked_basin_geom)
    //impChart.setOptions(Style.charts.singleBar)
    var impNum = charts.littleNum(layerProperties.Imperviousness, clicked_basin_geom, report_scale, 'percent')

    var impcard = cards('Imperviousness', [
        //   impChart, 
        impNum //layerButton(layerProperties["Imperviousness"])
    ])
    analyzePanel.add(impcard)

    print('done with impcard')



    var concentration_card = cards('Predicted Stormwater Concentrations', [hline(),
        make_concentration_panel(clicked_basin_geom, report_scale)
    ])

    analyzePanel.add(concentration_card)


    //make the load panel 

    var load_card = cards('Predicted Stormwater Loads', [hline(),
        make_load_panel(clicked_basin_geom, report_scale)
    ])
    analyzePanel.add(load_card)


}



var subtitle = function(label) {
    return ui.Label({
        value: label,
        style: fonts.H3
    })
}

var cards = function(title, widgetItems) {
    var cardTitle = ui.Label({
        value: title,
        style: fonts.H2
    })
    var wholeCard = ui.Panel({
        widgets: widgetItems,
        style: {
            border: '24px solid whitesmoke',
            padding: '24px'
        }
    })
    wholeCard.insert(0, cardTitle)

    return wholeCard
}

var accept = ui.Button({

    label: 'Analyze Selected Watershed ',
    style: {
        shown: false
    },
    onClick: function() {
        mapPanel.unlisten()
        // mainPanel.style().set({
        //     shown: true,
        //     height: '85%',
        //     width: '32.8%',
        // }); //show the side panel
        //mapPanel.add(legendPanel) //add legend panel to the map
        makeReports() //also clear side panel todo
        // buttonPanel.style().set({
        //     shown: false
        // })
    }
});




var inspect_button = ui.Button({
    label: 'Activate inspector',
    onClick: handle_inspect_click
});

var inspect_helper_text = ui.Label({
    value: 'Click "Activate Inspector" to enable watershed selection:',
    style: Style.fonts.Caption2
})
//function to add user layer to the map
var buttonPanel = ui.Panel({
    widgets: [ui.Label('buttonPanel'), inspect_helper_text, inspect_button, accept],
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
        position: 'top-left',
        stretch: 'both',
        border: '1px solid green'
    }
});


var vectors_dict = data.vector_dict


//Get watershed values from the data list 
var watershedSelect = ui.Select({
    items: [
        "Puget Sound Assessment Units",
        "NHDPlus High Resolution Watershed Dataset",
        "HUC12: USGS Watershed Boundary Dataset"
    ],
    //placeholder: 'Select a value',
    value: "Puget Sound Assessment Units",
    onChange: function(selected) {
        mapPanel.layers().reset()
        print(selected)
        var WS = vectors_dict[selected]
        mapPanel.layers().set(0, WS.style(featureStyle))
        //oct


    }
});




/* 
Set up User Interface
----------------------------------------------------------------------------------------------------
*/
//make the three subPanels  panels 

//redraw()

// Clear the default UI 

// Create the app's two panels and add them to the ui.root as a split panel
var mapPanel = makeMapPanel();
var mainSubPanel = makeMainSubPanel();
//
//var infoPanel = makeInfoPanel()

// function makeInfoPanel() {
//     var infoPanel = ui.Panel({
//         style: {
//             shown: true
//         }
//     }).add(ui.Label('infoPanel'))
//     infoPanel.add(ui.Label({
//         value: 'How the Stormwater Heatmap Works',
//         style: fonts.H2
//     }))
//     infoPanel.add(ui.Label({
//         value: '1. Analyze a Watershed',
//         style: fonts.Body2
//     }))
//     infoPanel.add(ui.Label({
//         value: 'Analyze instructions here',
//         style: fonts.Caption2
//     }))
//     infoPanel.add(ui.Label({
//         value: '2. Prioritize Locations',
//         style: fonts.Body2
//     }))
//     infoPanel.add(ui.Label({
//         value: 'Prioritize instructions here',
//         style: fonts.Caption2
//     }))

//     infoPanel.add(ui.Label({
//         value: '3. Download Data',
//         style: fonts.Body2
//     }))
//     infoPanel.add(ui.Label({
//         value: 'Download instructions here',
//         style: fonts.Caption2
//     }))
//     infoPanel.add(hline())
//     infoPanel.add(ui.Label({
//         value: 'This site is in Beta testing. Send bug reports and comments to:',
//         style: fonts.Caption3
//     }))

//     infoPanel.add(ui.Label({
//         value: 'stormwaterheatmap@gmail.com',
//         style: fonts.Caption3,
//         targetUrl: 'mailto:stormwaterheatmap@gmail.com'
//     }))

//     return infoPanel
// }







// ui.root.add(footer)
//---------------- set the initial view




function mapInit() {

var analyzePanel = ui.Panel({
    widgets: [ui.Label('analyzePanel_ui')],
    style: {
        border: '1px solid orange',
        shown: true
    }
})
    //mainPanel.clear()
    mainSubPanel.clear()
    //analyzePanel.clear()

    //mainSubPanel.add(analyzePanel)
    mapPanel.clear()
    //mapPanel = makeMapPanel()

    //header.add(ui.Label('header'))
    // var footer = makeFooter();

    ui.root.setLayout(ui.Panel.Layout.flow(
        'vertical'))
    // blankPanel.add(ui.Label('blankPanel'))
    var mainPanel = helpers.makeMainPanel("Analyze a Watershed");

    mainPanel.style().set({
        border: '1px solid red',
        height: "75%"
    })
    
    //mainPanel.clear([analyzePanel,buttonPanel])
    mainPanel.add(ui.Label('mainPanel'))
    //mainPanel.add(mainSubPanel)
    //mainSubPanel.add(ui.Label('mainSubPanel'))
    //ui.root.add(

    //  mapPanel);
    // mapPanel.add(mapInfoPanel);
    //analyzePanel.clear()
    //analyzePanel.add(watershedSelectLabel)
    //analyzePanel.add(watershedSelect)
    //analyzePanel.add((buttonPanel))
    mainPanel.add(analyzePanel)
    mapPanel.add(mainPanel);

    // reset view 

    var mapCenterLon = -122.423145;
    var mapCenterLat = 47.612410;
    mapPanel.setCenter(mapCenterLon, mapCenterLat, 7)

    WS = vectors_dict["Puget Sound Assessment Units"]
    watershedSelect.setValue("Puget Sound Assessment Units")
    mapPanel.layers().set(0, WS.style(featureStyle))
    // reset dialogs 


}
ui.root.clear()
ui.root.add(mapPanel)
mapInit()