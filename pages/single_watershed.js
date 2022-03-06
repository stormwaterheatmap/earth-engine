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
    width: 0.5
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
    style: {shown: false},
    onClick: function() {
        print('Reset')
        reset_panels()
        analyzePanel.clear()
       reset_button.style().set({shown: false})
    }
})

//print(reset_button)


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
            //border: '9px solid purple',
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


function make_intro_text_panel(){
var psau = ui.Label({
  style: {//border: '1px solid red',
 margin: '0px 8px', 
    //padding: '0px, 0px, 0px, 0px'},
  },
  value: 
"Puget Sound Watershed Characterization Project ↗",
targetUrl:"https://apps.ecology.wa.gov/coastalatlas/wc/landingpage.html"})

var description = ui.Label({value: 
  "Explore watershed data by selecting a watershed from the map."+
  "\nBy default, watersheds shown are Assessment Units from the", 
style:{//border: '1px solid blue',
whiteSpace: 'pre',//margin: '0px',
margin: '8px 8px 0px 8px'}})

var description2 = ui.Label({value: "To select a different watershed data set, select one below:"})
var panel = ui.Panel({
  widgets:[description,psau,description2],
  style:{
  padding: '0px'}})
return panel
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

//function to return watershed area 

function get_ws_area(ws_geometry){}

//function to return mean annual precip 

// function to return mean annual runoff 

//function to return percent as surface runoff 


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

    var impcard = cards('Watershed Info', [hline(),
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
        reset_button.style().set({shown: true})
        mainPanel.style().set({
             shown: true,
        //     height: '85%',
             maxWidth: '32.8%',
         }); //show the side panel
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
    widgets: [//inspect_helper_text, 
    inspect_button, accept],
    layout: ui.Panel.Layout.flow('horizontal',true),
    style: {
        //position: 'top-left',
        stretch: 'horizontal',
       // border: '1px solid green', 
        margin: '0px',
        padding: '0px'
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






var mainPanel = helpers.makeMainPanel("Analyze a Watershed");

mainPanel.style().set({height:"75%"})



var analyzePanel = ui.Panel({
    style: {
        shown: true//, border: '3px solid green'
    }
})

// ui.root.add(footer)
//---------------- set the initial view

var intro_text_panel = make_intro_text_panel()



function make_layer_dropdown() {
    var layers_list = data.cocs

    var select_layer = ui.Select({
        items: Object.keys(layers_list),
        onChange: function(value) {
            update_img(value)
        }
    })

    var layer_panel = ui.Panel({widgets: [
        ui.Label('Select Layer to Display'),
        select_layer
    ], 
    //layout: ui.Panel.Layout.absolute(), 
    style: {position: 'middle-right'}
    })

    mapPanel.add(layer_panel)

    var legendPanel = ui.Panel({
        style: {
            shown: true
        }
    })
    mapPanel.add(legendPanel)

    
}

var layers_list = data.cocs

function update_img(value) {

        var layerObject = layers_list[value]
        var legend = helpers.makeLegend(layerObject)
        mapPanel.layers().set(0, layerObject.layer)
        legend.style().set({
            position: "bottom-right"
        });
        legendPanel.clear().add(legend)
    }
function mapInit() {
ui.root.clear();
//mainPanel.clear()
//mainSubPanel.add(infoPanel)
//mainSubPanel.clear()

mapPanel.clear()
mapPanel = makeMapPanel()

//header.add(ui.Label('header'))
// var footer = makeFooter();

ui.root.setLayout(ui.Panel.Layout.flow(
    'vertical'))
// blankPanel.add(ui.Label('blankPanel'))


//mainSubPanel.add(ui.Label('mainSubPanel'))
ui.root.add(

    mapPanel);
// mapPanel.add(mapInfoPanel);
mapPanel.add(mainPanel);
analyzePanel.clear()
mainPanel.add(intro_text_panel)
mainPanel.add(watershedSelectLabel)
mainPanel.add(watershedSelect)
mainPanel.add(inspect_helper_text)
mainPanel.add((buttonPanel))
// reset view 
mainSubPanel.add(reset_button)
mainSubPanel.add(analyzePanel)
mainPanel.add(mainSubPanel)
var mapCenterLon = -122.423145;
var mapCenterLat = 47.612410;
mapPanel.setCenter(mapCenterLon, mapCenterLat, 7)

mapPanel.layers().set(0,data.cocs["Total Suspended Solids Concentration"].layer)

WS = vectors_dict["Puget Sound Assessment Units"]
watershedSelect.setValue("Puget Sound Assessment Units")
// reset dialogs 
//update_raster_img(data.cocs["Total Suspended Solids Concentration"])
mapPanel.layers().set(1,WS.style(featureStyle))
  

helpers.make_tnc_map(mapPanel)

make_layer_dropdown()

}





function reset_panels() {
  //hide analyze button
  accept.style().set({
        shown: false
    })
  //hide reports and cards, etc 
  // reset view 
//clear layers 
mapPanel.layers().reset([ WS.style(featureStyle)])//[vectors_dict["Puget Sound Assessment Units"]])

var mapCenterLon = -122.423145;
var mapCenterLat = 47.612410;
mapPanel.setCenter(mapCenterLon, mapCenterLat, 7)

update_raster_img(data.cocs["Total Suspended Solids Concentration"])
}


mapInit() 