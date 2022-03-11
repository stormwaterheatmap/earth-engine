/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-122.20747010339869, 48.15170220889509],
          [-122.20747010339869, 48.1379572829303],
          [-122.17176453699244, 48.1379572829303],
          [-122.17176453699244, 48.15170220889509]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/**
 * @ Author: Your name
 * @ Create Time: 2022-03-06 17:12:38
 * @ Modified by: Your name
 * @ Modified time: 2022-03-06 17:14:21
 * @ Description:
 */




/**
 * 
 * @param {numeric} val 
 * @returns simple bar chart showing value from 0 to 10 
 */
 function simpleBar(val) {
  var list =  ee.List([val])
  var chart = ui.Chart.array.values({array: list,axis: 0})
    
  
    var options = {
  
      isStacked: true,
      legend: {
        position: 'none'
      },
      axisTitlesPosition: 'in',
      vAxis: {  gridlines: {
          color: 'transparent'
        },  baselineColor:
          'transparent',
        textPosition: 'none'
      }, 
      hAxis: {
        
         ticks: [2, 4, 6, 8, 10]
      }
    };
  return chart.setOptions(options).setChartType('BarChart')
}

exports.simpleBar = simpleBar



var style = require('users/stormwaterheatmap/apps:Modules/Style')

function sigFigs(n, sig) {
  if(n <= 0){
    return 0
  }else{
  var mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1);
  return Math.round(n * mult) / mult;
}}


function histByClass(layerObj, scale, geom) {
  //get values that are in the roi 
  var area = ee.Image.pixelArea()
    .divide(4046.86); //area in acres 
  var image = ee.Image.cat(area, layerObj.layer.eeObject);
  // Define chart customization options.
  var options = {
    titleTextStyle: style.fonts.LegendTitle,
    // chartArea: {width: '100%', height: '80%'},
    legend: {
      position: 'in'
    },
    //titlePosition: 'in', 
    axisTitlesPosition: 'in',
    //hAxis: {textPosition: 'in'}, 
    vAxis: {
      textPosition: 'in'
    }
  };
  var histChart = (ui.Chart.image.byClass({
    image: image,
    reducer: ee.Reducer.sum(),
    classBand: 1,
    region: geom,
    scale: scale,
    classLabels: layerObj.labels,
    xLabels: layerObj.units,
    //titleTextStyle: style.fonts.LegendTitle
    //     xLabels: layerObj.labels
  })
    .setOptions(options)
  );
  // var stacked = histChart.setOptions({isStacked:true})
  return histChart;
}

function stackedBar(layerObj, scale, geom) {
  var area = ee.Image.pixelArea()
    .divide(4046.856) //area in acres 
  var image = ee.Image.cat(area, layerObj.layer.eeObject)
  // Define chart customization options.
  var options = {
    isStacked: true,
    legend: {
      position: 'in'
    },
    //titlePosition: 'in', 
    axisTitlesPosition: 'in',
    //hAxis: {textPosition: 'in'}, 
    vAxis: {
      textPosition: 'in'
    }
  };
  var histChart = (ui.Chart.image.byClass({
      image: image, //
      reducer: ee.Reducer.sum(),
      classBand: 1,
      region: geom,
      scale: scale,
      classLabels: layerObj.labels,
      //titleTextStyle: style.fonts.LegendTitle
      //     xLabels: layerObj.labels
    })
    .setOptions(options)
  )
  // var stacked = histChart.setOptions({isStacked:true})
  return histChart.setChartType('BarChart')
}
exports.stackedBar = stackedBar
exports.histByClass = histByClass
exports.histogramFeature = function (region, propName, buckwidth, title) {
  var chart = ui.Chart.feature
    .histogram({
      features: region,
      property: propName,
      // maxBuckets: 16,
      //minBucketWidth: buckwidth
    })
    .setOptions({
      title: title,
      // titleTextStyle: style.fonts.LegendTitle
    });
  return chart;
};

function histogramImage(layerObj, WS, scale) {
  
  
  var chart = ui.Chart.image.histogram({
    image: layerObj.layer.eeObject,
    region: WS,
    scale: scale,
    minBucketWidth: 0.5,
    //  maxBuckets: 16,
  });
  // chart.style()
  //   .set({
  //     width: '90%',
  //     height: '185px'
  //   })
  var units = layerObj.units
  chart.setSeriesNames(
    (layerObj.layer.name + ' (' + units + ')'), 0)
  chart.setOptions({
    legend: {
      position: 'none'
    },
    vAxis: {
      title: "Pixel count at "+ee.Number(scale).round().getInfo()+ "m²/pixel", 
      
      gridlines: {
        color: 'whitesmoke',
        // count: 4,
        // title: 'title'
      },
      minorGridlines: {
        color: 'white'
      },
      format: 'short',
      // textPosition: 'in',
      // baselineColor: 'black',
      //  viewWindowMode: 'maximized'
    },
    // chartArea: { //height:'80%', 
    //   //width:'100%',
    //   top: 36,
    //   bottom: 36,
    //   left: 8,
    //   right: 8
    // },
    hAxis: {
      gridlines: {
        color: 'white',
        //  count: 4,
      },
      title: (layerObj.layer.name + ' (' + units + ' )')
      //textPosition:'in',
      // format:'short',
      // viewWindowMode: 'maximized',
      //  baselineColor:'black'
    },
    //  titlePosition: 'in',
    //theme:'maximized',
    // title: ('Watershed histogram') // Elevation in Colorado (meters)'
  });
  return chart;
}
exports.histogramImage = histogramImage;

function makePieChart(landcover_dict,geometry,scale){
// Create a feature for a landcover class that includes the area covered.
function createFeature(landcover_class_stats) {
  landcover_class_stats = ee.Dictionary(landcover_class_stats);
  var class_number = landcover_class_stats.get('landcover_class_value');
  var result = {
    landcover_class_number: class_number,
    landcover_class_name: lookup_names.get(class_number),
    landcover_class_palette: lookup_palette.get(class_number),
    area_km2: ee.Number(landcover_class_stats.get('sum')).divide(1000*1000)
  };
  return ee.Feature(null, result); // Creates a feature without a geometry.
}

// Create a JSON dictionary that defines piechart colors based on the
// landcover class palette.
// https://developers.google.com/chart/interactive/docs/gallery/piechart
function createPieChartSliceDictionary(fc) {
  return ee.List(fc.aggregate_array("landcover_class_palette"))
    .map(function(p) {
      return {
        'color': p
      };
    }).getInfo();
}

//////////////////////////////////////////////////////////////
// Calculations
//////////////////////////////////////////////////////////////

// Create a dictionary for looking up names of landcover classes.
var lookup_names = ee.Dictionary.fromLists(
  ee.List(landcover_dict['values']),//.map(toString),
  landcover_dict['labels']
);
// Create a dictionary for looking up colors of landcover classes.
var lookup_palette = ee.Dictionary.fromLists(
  ee.List(landcover_dict['values']),//.map(toString),
  ee.List(landcover_dict.layer.visParams.palette)
);
print('lookup_palette', lookup_palette)
// Summarize landcover classes in a region of interest.
var area_image_with_landcover_class = ee.Image.pixelArea().addBands(landcover_dict.layer.eeObject);
var reduction_results = area_image_with_landcover_class.reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1,
    groupName: 'landcover_class_value',
  }),
  geometry: geometry,
  scale: scale,
  bestEffort: true,
});
//print('reduction_results', reduction_results);

var roi_stats = ee.List(reduction_results.get('groups'));
//print('roi_stats', roi_stats)
var landcover_fc = ee.FeatureCollection(roi_stats.map(createFeature));
//print('landcover_fc', landcover_fc);

// Add a summary chart.
var landcover_summary_chart = ui.Chart.feature.byFeature({
    features: landcover_fc,
    xProperty: 'landcover_class_name',
    yProperties: ['area_km2', 'landcover_class_number']
  })
  .setChartType('PieChart')
  .setOptions({
    //pieHole: 0.3,
    title: 'Summary of landcover class areas (sq.km)',
    slices: createPieChartSliceDictionary(landcover_fc),
    sliceVisibilityThreshold: 0 // Don't group small slices.
  });
//print(landcover_summary_chart);

function toString(number) {
  return ee.Number(number).format('%d')
}
}

//
exports.pieChart = makePieChart

function coc_mean_conc(layerObj, region, scale) {
  //text for loading whil calucations happen 
  var units = layerObj.units;
  print('conversion_factor',conversion_factor)
  var loading = 'loading...';
  var bigNum = ui.Label({
    value: loading,
    //style: style.fonts.Body3
  });
  bigNum.style()
    .set({
      margin: 2,
      padding: 2,
      width: '80%',
      fontSize: '24px',
      fontFamily: ['Roboto', 'Helvetica Neue',
        'Arial', 'sans-serif'
      ],
      //fontWeight: 500,
      //  border: '1px solid blue', 
      backgroundColor: style.colors.transparent,
      textAlign: 'right',
    });

  var title_value = layerObj.layer.name;


  var titleLabel = ui.Label({
    value: title_value,
    style: style.fonts.H4
  });
  titleLabel.style()
    .set({
      margin: 0,
      padding: 0,
      width: '80%',
      textAlign: 'right',
      //   border: '1px solid red'
    });
  units = ui.Label({
    value: units,
    style: style.fonts.Caption3
  });
  units.style()
    .set({
      textAlign: 'right',
      width: '80%',
    });

  var numPan = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      textAlign: 'right',
      padding: 2,
      margin: 2,
    }
  }); //height: '200px'}}); 
  numPan.add(titleLabel); //.add(infoLabel)
  numPan.add(bigNum);

  numPan.add(units);
  // var infoLabel = ui.Label({
  //   style: style.fonts.Caption3
  // });
  // infoLabel.style()
  //   .set({
  //     margin: 0,
  //     padding: 2,
  //     fontSize: '10px',
  //     textAlign: 'right',
  //     //   border: '1px solid green',
  //     //width: '80%',
  //     color: style.colors.sDark,
  //   });
  // var labelText = (
  //   'Scale of Analysis: ' + scale + ' sq.m/pixel' + /n/ + scale);
  // var labelText2 = ui.Label({
  //   style: style.fonts.Caption3
  // });
  // labelText2.style()
  //   .set({
  //     //   margin: 0, //fontSize: '10px',
  //     //color:style.colors.sDark,
  //     margin: 2,
  //     padding: 2,
  //     textAlign: 'right',
  //     width: '80%',
  //     //      border: '1px solid pink', 
  //     fontSize: '10px',
  //   });
  // labelText2.setValue('Source: ' + layerObj.sourceName);
  // labelText2.setUrl(layerObj.sourceUrl);
  // infoLabel.setValue(labelText);
  // numPan //.add(infoLabel)
  //   .add(labelText2); //.add(labelText2)

    /**
     * Calculations 
     */

    var reduced = ee.Number((layerObj.layer.eeObject.select(0))
    .reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: region,
      scale: scale,
      maxPixels: 100000,
      bestEffort: true
    })
    .get(layerObj.layer.eeObject.bandNames()
    .get(0)));
    
    var conversion_factor = (layerObj.units == "mg/L") ? 1e-3 : 1;
  
    var concentration = reduced.multiply(conversion_factor) // do this for sigfigs
    
    concentration.evaluate(function (result) {

    // When the server returns the value, show it.
    bigNum.setValue(sigFigs(result,3))//.toLocaleString("en-US"));
  });

  //  
  return numPan;
}

exports.coc_mean_conc = coc_mean_conc

function coc_load(layerObj, region, scale) {
  //text for loading whil calucations happen 
  var units = 'kg/yr'
  var loading = 'loading...';
  var bigNum = ui.Label({
    value: loading,
    style: style.fonts.Body3
  });
  bigNum.style()
    .set({
      margin: 2,
      padding: 2,
      width: '95%',
      fontSize: '24px',
      fontFamily: ['Roboto', 'Helvetica Neue',
        'Arial', 'sans-serif'
      ],
      //fontWeight: 500,
    //   border: '1px solid blue', 
      backgroundColor: style.colors.transparent,
      textAlign: 'right',
    });

  var title_value = layerObj.layer.name;


  var titleLabel = ui.Label({
    value: title_value,
    style: style.fonts.H4
  });
  titleLabel.style()
    .set({
      margin: '2px',
      padding: '2px',
      stretch: 'both',
      width: '98%',
      //height: "50px",
      textAlign: 'right',
      //   border: '1px solid red'
    });
  var units_label = ui.Label({
    value: units,
    style: style.fonts.Caption2
  });
  units_label.style()
    .set({
      textAlign: 'right',
      width: '100%',
      margin:2
    });

  var numPan = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical',true),
    style: {
      textAlign: 'right',
     // stretch: 'horizontal',
      //padding: 2,
      //margin: 14,
      width: '180px',
      //border: '1px solid orange'
    }
  }); //height: '200px'}}); 
  numPan.add(titleLabel); //.add(infoLabel)
  
    
    var num_unit_panel = ui.Panel({widgets:[bigNum],
    layout:ui.Panel.Layout.flow('horizontal'),
      style:{width: '100%',stretch:'both'}
    })
  numPan.add(num_unit_panel);

  numPan.add(units_label);
  
  /**
   * calculations 
   */
  

  var total_load_per_m2 = ee.Number((layerObj.layer.eeObject.select(0))
    .reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: region,
      scale: scale,
      maxPixels: 100000,
      bestEffort: true
    })
    .get(layerObj.layer.eeObject.bandNames()
      .get(0)));
    var ws_area = ee.Geometry(region).area(2) 
  var conversion_factor = (layerObj.units == 'g/m² per year') ? 1e-3 : 1e-6;
 
    var total_load = total_load_per_m2.multiply(ws_area).multiply(conversion_factor) // do this for sigfigs
    
    
  total_load.evaluate(function (result) {
    // When the server returns the value, show it.
    bigNum.setValue(sigFigs(result,3).toLocaleString("en-US"));
  });
  //  
  return numPan;
}

exports.coc_load = coc_load

function littleNum(layerObj, region, scale, reducerType) {
  //text for loading whil calucations happen 
  var units = layerObj.units;
  var loading = 'loading...';
  var bigNum = ui.Label({
    value: loading,
    style: style.fonts.Body3
  });
  bigNum.style()
    .set({
      margin: 2,
      padding: 2,
      width: '95%',
      minWidth: '150px',
      fontSize: '24px',
      fontFamily: ['Roboto', 'Helvetica Neue',
        'Arial', 'sans-serif'
      ],
      //fontWeight: 500,
      //  border: '1px solid blue', 
      backgroundColor: style.colors.transparent,
      textAlign: 'right',
    });

  var title_value = layerObj.layer.name;

  
  var titleLabel = ui.Label({
    value: title_value,
    style: style.fonts.H4
  });
  titleLabel.style()
    .set({
      margin: 0,
      padding: 0,
      width: '80%',
      textAlign: 'right',
      //   border: '1px solid red'
    });
  units = ui.Label({
    value: units,
    style: style.fonts.Caption3
  });
  units.style()
    .set({
      textAlign: 'right',
      width: '80%',
    });

  var numPan = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      textAlign: 'right',
      padding: 2,
      margin: 2,
    }
  }); //height: '200px'}}); 
  numPan.add(titleLabel); //.add(infoLabel)
  numPan.add(bigNum);

  numPan.add(units);
  // var infoLabel = ui.Label({
  //   style: style.fonts.Caption3
  // });
  // infoLabel.style()
  //   .set({
  //     margin: 0,
  //     padding: 2,
  //     fontSize: '10px',
  //     textAlign: 'right',
  //     //   border: '1px solid green',
  //     //width: '80%',
  //     color: style.colors.sDark,
  //   });
  // var labelText = (
  //   'Scale of Analysis: ' + scale + ' sq.m/pixel' + /n/ + scale);
  // var labelText2 = ui.Label({
  //   style: style.fonts.Caption3
  // });
  // labelText2.style()
  //   .set({
  //     //   margin: 0, //fontSize: '10px',
  //     //color:style.colors.sDark,
  //     margin: 2,
  //     padding: 2,
  //     textAlign: 'right',
  //     width: '80%',
  //     //      border: '1px solid pink', 
  //     fontSize: '10px',
  //   });
  // labelText2.setValue('Source: ' + layerObj.sourceName);
  // labelText2.setUrl(layerObj.sourceUrl);
  // infoLabel.setValue(labelText);
  // numPan //.add(infoLabel)
  //   .add(labelText2); //.add(labelText2)

  if (reducerType == 'mean') {
    var reduced = ee.Number((layerObj.layer.eeObject)
      .reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: region,
        scale: scale,
        bestEffort: true
      })
      .get(layerObj.layer.eeObject.bandNames()
        .get(0)));
        print('mean')
    reduced.evaluate(function (result) {
      // When the server returns the value, show it.
      bigNum.setValue(result.toFixed(0));
    });
    //  
  } else if (reducerType == 'sum') {
    //reduced = reduced.toFixed()
    reduced = ee.Number((layerObj.layer.eeObject)
      .reduceRegion({
        reducer: ee.Reducer.sum(),
        geometry: region,
        scale: scale,
        bestEffort: true
      })
      .get(layerObj.layer.eeObject.bandNames()
        .get(0)));
    reduced.evaluate(function (result) {
      // When the server returns the value, show it.
      bigNum.setValue(result.toFixed(0));
    });
  } else if (reducerType == 'percent') {
    //reduced = reduced.toFixed()
    print('percent');
    reduced = ee.Number((layerObj.layer.eeObject)
      .multiply(ee.Image(100))
      .reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: region,
        scale: scale,
        bestEffort: true
      })
      .get(layerObj.layer.eeObject.bandNames()
        .get(0)));
    numPan.remove(units); //don't display units for percent 
    reduced.evaluate(function (result) {
      // When the server returns the value, show it.
      bigNum.setValue(
        result.toFixed(0)
          .toString()
          .concat(
            "%"));
    }); //.add(units)
  }
  return numPan;
}
exports.littleNum = littleNum;
var imgToFc = function (
  geometry, properties, scale) {
  var AOI = geometry;
  var image = properties.layer.eeObject
  var withArea = (ee.Image.pixelArea()
      .divide(4046.86))
    .addBands(image); //acres
  var clipImage = withArea.clip(AOI)
  var lookup_names = ee.Dictionary.fromLists(
    //ee.List(
    properties.values //)
    //.map(ee.String),
    ,
    properties.labels
  );
  // print('lookup names', lookup_names)
  var lookup_palette = ee.Dictionary.fromLists(
    //ee.List(
    properties.values,//)
    //.map(ee.String),
    properties.layer.visParams.palette
  );
  // print(ee.List(lookup_palette))
  function createFeature(transition_class_stats) {
    transition_class_stats = ee.Dictionary(transition_class_stats);
    var class_number = transition_class_stats.get('class value');
    var result = {
      transition_class_number: class_number,
      Class: lookup_names.get(class_number),
      transition_class_palette: lookup_palette.get(class_number),
      Area: transition_class_stats.get('sum')
    };
    return ee.Feature(null,
      result); // Creates a feature without a geometry.
  }
  // Create a JSON dictionary that defines piechart colors based on thetransition class palette.
  // https://developers.google.com/chart/interactive/docs/gallery/piechart
  function createPieChartSliceDictionary(fc) {
    return ee.List(fc.aggregate_array("transition_class_palette"))
    // .map(function (p) {
    //return {
    //   'color': p
    //};
  }
  var reduction_results = clipImage.reduceRegion({
    reducer: ee.Reducer.sum()
      .group({
        groupField: 1,
        groupName: 'class value',
      }),
    geometry: AOI,
    scale: scale,
    bestEffort: true,
  });
  var roi_stats = ee.List(reduction_results.get('groups'));
  var transition_fc = ee.FeatureCollection(roi_stats.map(createFeature));
  return transition_fc.sort('Area', false)
};
exports.imgToFc = imgToFc

function img_class_chart(layer_object, region, scale){
  var fc = imgToFc(region, layer_object, scale)
  var chart = ui.Chart.feature.byFeature(fc,'Class',['Area'])
  return(chart.setChartType('ColumnChart'))
}


var stack_bands = function (layer_object) {
  var img = ee.Image(layer_object.layer.eeObject)
  for(var i = 0; i < layer_object.values.length; i++) {
    var bandName = layer_object.labels[i]
    img = img.addBands({
      srcImg: layer_object.layer.eeObject.eq(layer_object.values[i])
        .rename(bandName)
        .multiply(ee.Image.pixelArea()
          .divide(4046.86) //m2 in an acre), 
        ),
      names: [bandName]
    })
  }
  return (img.select(layer_object.labels))
}


//Function for comparing multiple watersheds 
function cat_chart(layer_object, regions, scale) {
  print("Cat Chart", layer_object)
  var stacked = stack_bands(layer_object)
  var chart = ui.Chart.image.byRegion({
      image: stacked,
      regions: regions,
      reducer: ee.Reducer.sum(),
      scale: scale,
      xProperty: "Watershed Name"
    })
    .setChartType('ColumnChart')
    .setOptions({
      title: layer_object.layer.name,
      vAxis: {
        title: 'acres',
        format: 'short'
      }
    })
  return (chart)
}
exports.cat_chart = cat_chart
exports.img_class_chart = img_class_chart

// function coc_mean_conc(layerObj, region, scale) {
//   //text for loading whil calucations happen 
//   var units = ee.String(layerObj.units);
//   var loading = 'loading...';
//   var bigNum = ui.Label({
//     value: loading,
//     style: style.fonts.Body3
//   });
//   bigNum.style()
//     .set({
//       margin: 2,
//       padding: 2,
//       width: '100%',
//       fontSize: '24px',
//       fontFamily: ['Roboto', 'Helvetica Neue',
//         'Arial', 'sans-serif'
//       ],
//       fontWeight: 500,
//       //  border: '1px solid blue', 
//       backgroundColor: style.colors.transparent,
//       textAlign: 'right',
//     });

//   var title_value = layerObj.layer.name;


//   var titleLabel = ui.Label({
//     value: title_value,
//     style: style.fonts.H4
//   });
//   titleLabel.style()
//     .set({
//       margin: '2px',
//       padding: '2px',
//       stretch: 'both',
//       width: '100%',
//       textAlign: 'right',
//       //   border: '1px solid red'
//     });
//   units = ui.Label({
//     value: layerObj.units,
//     style: style.fonts.Caption2
//   });
//   units.style()
//     .set({
//       textAlign: 'right',
//       width: '100%',
//       margin:2
//     });

//   var numPan = ui.Panel({
//     layout: ui.Panel.Layout.flow('vertical',true),
//     style: {
//       textAlign: 'right',
//       padding: '2px',
//       margin: '2px',
//       //minWidth: '100px',
//           //  border: '1px solid red'

//     }
//   }); //height: '200px'}}); 
//   numPan.add(titleLabel); //.add(infoLabel)
  
    
//     var num_unit_panel = ui.Panel({widgets:[bigNum],
//     layout:ui.Panel.Layout.flow('horizontal'),
//       style:{width: '100%'}//,stretch:'both'}
//     })
//   numPan.add(num_unit_panel);

//   numPan.add(units);
//   var reduced = ee.Number((layerObj.layer.eeObject.select(0))
//     .reduceRegion({
//       reducer: ee.Reducer.mean(),
//       geometry: region,
//       scale: scale,
//       //maxPixels: 100000,
//       bestEffort: true
//     })
//     .get(layerObj.layer.eeObject.bandNames()
//       .get(0)));
//   reduced.evaluate(function (result) {
//     // When the server returns the value, show it.
//     bigNum.setValue(sigFigs(result,3).toLocaleString("en-US"));
//   });
//   //  
//   return numPan;
// }

// exports.coc_mean_conc = coc_mean_conc

 
// //testing 
var data = require('users/stormwaterheatmap/apps:data/data_dictionary.js')
//var layerProperties = data.rasters

// // print(Object.keys(layerProperties))
// // print(layerProperties)

// // //
var layerObj = data.rasters["Runoff (mm)"]


// print(layerObj)
// var chart = littleNum(layerObj,geometry,100,'mean')//,1e-3)

// print(chart)
//print(layerObj)
// var chart2 = makePieChart(geometry, layerObj, 100).setChartType('BarChart') 
// var imageBar = (  {chartArea: {left: '50%'},
//   hAxis: {
//           title: 'Area (acres)',
//           minValue: 0,
//         }, 
//         legend: {position: 'none'}, 
//         }) 
// var chart = histByClass(layerObj, 100, geometry); 
// chart.setChartType('BarChart')
// chart2.setOptions(imageBar)
// //var options = 
// var testPan = ui.Panel()
// testPan.add(chart2)
// Map.add(testPan)
 