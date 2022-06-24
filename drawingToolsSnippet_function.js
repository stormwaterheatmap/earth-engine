/**
 * adds drawing tools to a map to download a given image .
 *
 * @param {layer_object} dictionary a stormwaterheatmap layer dictionary 
 * @param {map} a ee ui.Map() object 
 */
function drawing_tools_function(layer_object, map) {
  //import datasets 
  var Style = require(
    'users/stormwaterheatmap/apps:Modules/Style'
  )
  //map.drawingTools({shape:'polygon'})//, selected, shown, linked))
  var drawingTools = map.drawingTools({
    shape: 'rectangle'
  });
  var helpers = require(
    'users/stormwaterheatmap/apps:Modules/helpers'
  )

  // ui.Button({label:'OK', 
  //   onClick:function(){
  //     scale_drop_down.insert(1, ui.Label("OK"))
  //   }})
  // var img = layer_object.layer.eeObject
  // print(img)
  drawingTools.setDrawModes(['polygon', 'rectangle'])
  map.setControlVisibility({
    drawingToolsControl: false
  })
  //--------------------------
  // UI Elements 
  //-----------------------

  //make drawing button
  // button resets drawingtools layeers
  // sets draw modes 
  // initiates user drawing 
  var drawButton = ui.Button({
    label: 'Draw a geometry',
    onClick: function() {
      //activate drawing tools
      drawingTools.layers().reset()
      drawingTools.setShown(true)
      drawingTools.setShape('rectangle')
      //drawingTools.setDrawModes(['polygon', 'rectangle'])
      drawingTools.draw()
    }
  })

  var clearButton = (ui.Button({
    label: 'Clear Geometry',
    onClick: clearDrawings
  }))
  //slider to control download sacel 
  var scaleSelect = ui.Slider(10, 100, 30, 10)

  //accept user drawing 
  var accept_button = ui.Button({
    label: 'Accept Geometry',
    style: {
      shown: false
    }
  })

  var title = ui.Label("Draw Area of Interest", {
    fontWeight: "bold"
  })
  print(Style.fonts.Caption1)
  var subtitle = ui.Label("Select 'draw a geometry' to begin drawing")

  subtitle.style().set(Style.fonts.Caption2)
  var accept_title = ui.Label({
    value: "Accept Geometry",
    style: {
      fontWeight: 'bold',
      shown: false
    }
  })
  var accept_subtitle = ui.Label("Click 'Accept Geometry' to clip image for downloading")

  accept_subtitle.style().set(Style.fonts.Caption2).set({
    shown: false
  })

  var downloadLabel = ui.Label('Download', {
    shown: true
  })



  var panel = ui.Panel({
    widgets: [title, subtitle,
      ui.Panel({
        widgets: [drawButton, clearButton],
        layout: ui.Panel.Layout.flow('horizontal'),
        style: ({
          stretch: 'vertical'
        })
      }),

      accept_title, accept_subtitle, accept_button
    ],
    style: {
      position: 'bottom-left',
      width: "300px"
    }
  })

  var check_image_size = function(image, scale_val) {
    var label_value
    var url_value
    try { //try to get the download url 
      url_value = image.getDownloadURL({
        params: {
          scale: scale_val
        }
      })
      //if no error, render this into the label: 
      label_value = {
        value: '✔ Download Layer' + ' @ ' +
          scale_val + ' m/pixel ',
        targetUrl: url_value
      }
    } catch (
      err) {
      //if error, return a label
      label_value = ({
        value: '✖ Download image is too large. Please select a coarser scale.',
        style: {
          color: 'red'
        }
      })

    }
    var label_unit = ui.Label(label_value) //targetUrl: url_value

    return (
      label_unit) //returns ui element
  }

  var line = ui.Panel({
    style: {
      border: '1px solid whitesmoke'
    }
  })
  var download_title = ui.Label({
    value: "Download Imagery",
    style: {
      fontWeight: "bold"
    }
  }) ///, targetUrl)

  var scale_drop_down = ui.Slider({
    min: 2,
    max: 200,
    value: 30,
    step: 2,
    style: {
      //width: "90%"
    },

    onChange: function(value) {
      print(value)

    }


  })





  //functions 

  function map_init() {
    // mapaddLayer(img)
    helpers.make_tnc_map(map)
    map.layers().reset()
    map.widgets().reset([panel])
    downloadLabel.style().set({
      shown: false
    })
    //  map.addLayer(img, layer_object.layer.visParams)
    //print(map.layers())

  }

  var getDrawingTools = function() {
    //activate drawing tools
    drawingTools.layers().reset()
    drawingTools.setShown(true).setDrawModes(['polygon', 'rectangle'])
    drawingTools.draw()
  }
  var download_panel = ui.Panel({
    widgets: [line,
      ui.Label({
        value: "Download Image",
        style: {
          fontWeight: "bold"
        }
      })
    ],
    layout: ui.Panel.Layout.flow({
      wrap: true
    }),
    style: {
      width: "100%"
    }
  })

  function downloadImg() {
    (map.layers().reset())
    //get the current geometry 
    var boundary = drawingTools.layers().get(0).getEeObject()
    map.setControlVisibility({
      drawingToolsControl: false
    })
    //map.drawingTools().clear()
    //ui.map.DrawingTools().clear()
    drawingTools.layers().get(0).setShown(false)

    // (ui.map.GeometryLayer().geometries().reset())//setShown(false))//.setShown(false)
    var clipedImg = img.clip(boundary)
    map.addLayer(clipedImg, layer_object.layer.visParams)
    map.centerObject(clipedImg)

    /*var update_button = ui.Button('Check for download', function() {
        //var image_on_map = ee.Image(image).clip(geometry) //((mapPanel.layers().get(0).getEeObject())).clip(geometry)
        //downloadPanel.clear().add(downloadPanel_widgets)
        //print('clear')
        var download_link = make_download_link(clipedImg, scale_drop_down.getValue())
        print(scale_drop_down.getValue())
        //mapPanel.addLayer(image_on_map)
        //downloadPanel_widgets.clear(download_link)
        download_panel.add(download_link)
    })
*/

    var slider = ui.Slider(1, 100)
    var download_panel2 = ui.Panel([
      ui.Label({
        value: ["Images are limited to 1000x1000 pixels.",
          " Adjust the scale below and 'check image download to generate a download link."
        ],
        style: Style.fonts.Caption2
      })
    ])

    //Map.add(download_panel2)
    download_panel2.add(slider)
    var scale_val = (slider.getValue())

    var temp_panel = ui.Panel()
    download_panel2.add(temp_panel)
    var ok_button = ui.Button({
      label: "Check image download",
      onClick: function() {
        temp_panel.clear()
        var label = check_image_size(clipedImg, Math.round(slider.getValue()))
        temp_panel.add(label)

      }
    })

    download_panel2.add(ok_button)
    download_panel.add(download_panel2)
    panel.add(download_panel)
    download_panel.style().set({
      shown: true
    })
  }
  accept_button.onClick(downloadImg)




  // Get the layers list.
  var layers = drawingTools.layers();


  // Use debounce to call the function at most every 100 milliseconds.
  drawingTools.onEdit(ui.util.debounce(acceptDrawing, 500));
  drawingTools.onDraw(ui.util.debounce(acceptDrawing, 500));
  drawingTools.onSelect(ui.util.debounce(acceptDrawing, 500));





  function acceptDrawing() {
    //show accept instructions 
    accept_title.style().set({
      shown: true
    })
    accept_subtitle.style().set({
      shown: true
    })
    //Show accept button 
    accept_button.style().set({
      shown: true
    })
    //On accept button, download img 
  }





  function clearDrawings() {
    // panel.clear()
    map_init()
    download_panel.widgets().reset()
    panel.remove(download_panel)
    drawingTools.layers().reset()
    accept_button.style().set({
      shown: false
    })
    accept_title.style().set({
      shown: false
    })
    accept_subtitle.style().set({
      shown: false
    })
    download_panel.style().set({
      shown: false
    })

  }

  map_init()

  return (map)
}

exports.display_drawing_tools = drawing_tools_function

var data = require(
  'users/stormwaterheatmap/apps:Modules/datasets'
).rasters

var exmap = drawing_tools_function(data["Age of Imperviousness"], ui.Map())

ui.root.clear()
ui.root.add(exmap)