/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-122.18688550907996, 47.588485685274044],
          [-122.13882032353308, 47.53659182056817],
          [-122.05814919641182, 47.57734993250728],
          [-122.11684766728308, 47.629223376175645],
          [-122.16903272587683, 47.67547769385542]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var style = require('users/stormwaterheatmap/apps:Modules/Style')
var colors = style.colors
var histByClass = function (layerObject, scale, geom) {
  //get values that are in the roi 
  
  
  var area = ee.Image.pixelArea()
    .divide(4046.86) //area in acres 
  var image = ee.Image.cat(area, layerObject.layer.eeObject)
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
      image: image, //
      reducer: ee.Reducer.sum(),
      classBand: 1,
      region: geom,
      scale: scale,
      classLabels: layerObject.labels,
      xLabels: layerObject.units, 
      //titleTextStyle: style.fonts.LegendTitle
      //     xLabels: layerObject.labels
    })
    .setOptions(options)
  )
  // var stacked = histChart.setOptions({isStacked:true})
  return histChart
}

function stackedBar(layerObject, scale, geom) {
  var area = ee.Image.pixelArea()
    .divide(4046.856) //area in acres 
  var image = ee.Image.cat(area, layerObject.layer.eeObject)
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
      classLabels: layerObject.labels,
      //titleTextStyle: style.fonts.LegendTitle
      //     xLabels: layerObject.labels
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

function histogramImage(layerObject, WS, scale) {
  
  
  var chart = ui.Chart.image.histogram({
    image: layerObject.layer.eeObject,
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
  var units = layerObject.units
  chart.setSeriesNames(
    (layerObject.layer.name + ' (' + units + ')'), 0)
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
      title: (layerObject.layer.name + ' (' + units + ' )')
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
};
exports.histogramImage = histogramImage;
var makePieChart = function (
  geometry, properties, scale, holeSize) {
  var AOI = geometry;
  var image = properties.layer.eeObject
  var withArea = (ee.Image.pixelArea()
      .divide(4046.86))
    .addBands(image); //acres
  //var clipImage = withArea.clip(AOI)
  //////////////////////////////////////////////////////////////
  // Calculations
  //////////////////////////////////////////////////////////////
  var lookup_names = ee.Dictionary.fromLists(
    ee.List(properties.values)
    .map(ee.String),
    properties.labels
  );
  // print('lookup names', lookup_names)
  var lookup_palette = ee.Dictionary.fromLists(
    ee.List(properties.values)
    .map(ee.String),
    properties.layer.visParams.palette
  );
  // print(ee.List(lookup_palette))
  //////////////////////////////////////////////////////////////   // Helper functions    //////////////////////////////////////////////////////////////
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
  //var classValue = image.get('system:title')
  //print(classValue)
  var reduction_results = withArea.reduceRegion({
    reducer: ee.Reducer.sum()
      .group({
        groupField: 1,
        groupName: 'class value',
      }),
    geometry: AOI,
    scale: scale,
    bestEffort: true,
  });
  //   print('reduction_results', reduction_results);
  var roi_stats = ee.List(reduction_results.get('groups'));
  //    print('roi stats', roi_stats)
  var transition_fc = ee.FeatureCollection(roi_stats.map(createFeature))
    .
  sort('Area', false);
  //  print('transition_fc', transition_fc);
  // Add a summary chart.
  var transition_summary_chart =
    ui.Chart.feature.byFeature({
      features: transition_fc,
      xProperty: 'Class',
      yProperties: ['Area'] // 'transition_class_number']
    })
    .setChartType('PieChart') //le')
  //.evaluate(function(result) {
  // When the server returns the value, show it.
  return transition_summary_chart.setOptions({
    pieHole: holeSize,
    is3D: true,
    //   legend: {
    //       position: 'none'
    //    },
    //     chartArea: {
    //      height: '100%',
    //     width: '100%'
    //   },
    pieSliceText: 'label',
    title: properties.layer.name,
    //  pieStartAngle: 100,
    slices: createPieChartSliceDictionary(transition_fc)
      .evaluate,
    sliceVisibilityThreshold: 0.05
  });
};
//
exports.pieChart = makePieChart
var littleNum = function (layerObj, region, scale, reducerType) {
  //var units = layerObj.units
  var units = 'units'
  var loading = 'loading...'
  var bigNum = ui.Label({
    value: loading,
    style: style.fonts.Body3
  });
  bigNum.style()
    .set({
      margin: 2,
      padding: 2,
      width: '80%',
      fontSize: '30px',
      fontFamily: ['Roboto', 'Helvetica Neue',
        'Arial', 'sans-serif'
      ],
      fontWeight: 500,
      //  border: '1px solid blue', 
      backgroundColor: style.colors.transparent,
      textAlign: 'right',
    })
  var titleLabel = ui.Label({
    value: layerObj.layer.name,
    style: style.fonts.H4
  });
  titleLabel.style()
    .set({
      margin: 0,
      padding: 0, //0px 2px 0px 4px',
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
      // margin: 0,
      // padding: 0, //padding: '0px 4px 8px 5px',
      //stretch: 'horizontal'
    });
  var numPan = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      //  width: '200px', 
      // stretch: 'vertical',
      textAlign: 'right',
      padding: 2,
      margin: 2,
      //padding: '0px 0px 0px 0px',
      //position: 'middle-right', 
      //    border: '1px solid black',
      //     height: '100%',
    }
  }) //height: '200px'}}); 
  numPan.add(titleLabel) //.add(infoLabel)
  numPan.add(bigNum)
  //if 
  numPan.add(units)
  var infoLabel = ui.Label({
    style: style.fonts.Caption3
  })
  infoLabel.style()
    .set({
      margin: 0,
      padding: 2, //  margin: 0, //
      fontSize: '10px',
      textAlign: 'right',
      //   border: '1px solid green',
      //width: '80%',
      color: style.colors.sDark,
    })
  var labelText = (
    'Scale of Analysis: ' + scale + ' sq.m/pixel' + /n/ + scale)
  var labelText2 = ui.Label({
    style: style.fonts.Caption3
  });
  labelText2.style()
    .set({
      //   margin: 0, //fontSize: '10px',
      //color:style.colors.sDark,
      margin: 2,
      padding: 2,
      textAlign: 'right',
      width: '80%',
      //      border: '1px solid pink', 
      fontSize: '10px',
    });
  labelText2.setValue('Source: ' + layerObj.sourceName)
  labelText2.setUrl(layerObj.sourceUrl);
  infoLabel.setValue(labelText)
  numPan //.add(infoLabel)
    .add(labelText2) //.add(labelText2)
  if(reducerType === 'mean') {
    var reduced = ee.Number((layerObj.layer.eeObject)
      .reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: region,
        scale: scale,
        bestEffort: true
      })
      .get(layerObj.layer.eeObject.bandNames()
        .get(0)))
    reduced.evaluate(function (result) {
      // When the server returns the value, show it.
      bigNum.setValue(result.toFixed(0))
    })
    //  
  } else if(reducerType === 'sum') {
    //reduced = reduced.toFixed()
    reduced = ee.Number((layerObj.layer.eeObject)
      .reduceRegion({
        reducer: ee.Reducer.sum(),
        geometry: region,
        scale: scale,
        bestEffort: true
      })
      .get(layerObj.layer.eeObject.bandNames()
        .get(0)))
    reduced.evaluate(function (result) {
      // When the server returns the value, show it.
      bigNum.setValue(result.toFixed(0))
    })
  } else if(reducerType === 'percent') {
    //reduced = reduced.toFixed()
    print('percent')
    reduced = ee.Number((layerObj.layer.eeObject)
      .multiply(ee.Image(100))
      .reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: region,
        scale: scale,
        bestEffort: true
      })
      .get(layerObj.layer.eeObject.bandNames()
        .get(0)))
    numPan.remove(units) //don't display units for percent 
    reduced.evaluate(function (result) {
      // When the server returns the value, show it.
      print(574)
      bigNum.setValue(
        result.toFixed(0)
        .toString()
        .concat(
          "%"))
    }) //.add(units)
  }
  return numPan
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
    ee.List(properties.values)
    .map(ee.String),
    properties.labels
  );
  // print('lookup names', lookup_names)
  var lookup_palette = ee.Dictionary.fromLists(
    ee.List(properties.values)
    .map(ee.String),
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
  var fc = imgToFc(geometry, lay, 100)

var chart = ui.Chart.feature.byFeature(fc2,'Class',['Area'])
print(chart2.setChartType('ColumnChart'))
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
// //testing 
// var data = require('users/stormwaterheatmap/apps:data/data_dict_v3')
// var layerProperties = data.rasters

// print(Object.keys(layerProperties))
// print(layerProperties)

// //
// var layerObject = layerProperties["Age of Imperviousness"] 
// var chart2 = makePieChart(geometry, layerObject, 100).setChartType('BarChart') 
// var imageBar = (  {chartArea: {left: '50%'},
//   hAxis: {
//           title: 'Area (acres)',
//           minValue: 0,
//         }, 
//         legend: {position: 'none'}, 
//         }) 
// var chart = histByClass(layerObject, 100, geometry); 
// chart.setChartType('BarChart')
// chart2.setOptions(imageBar)
// //var options = 
// var testPan = ui.Panel()
// testPan.add(chart2)
// Map.add(testPan)