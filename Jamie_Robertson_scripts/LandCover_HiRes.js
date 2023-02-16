/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var snohomish = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-122.40692138671875, 48.28684818710906],
          [-122.3602294921875, 48.23747967660676],
          [-122.3876953125, 48.177075627796114],
          [-122.24761962890625, 48.00830020485928],
          [-122.40966796875, 47.78917089079264],
          [-121.1297607421875, 47.787325537803106],
          [-121.1187744140625, 47.81499895328108],
          [-121.22589111328125, 47.89056441663248],
          [-121.168212890625, 48.00278733106709],
          [-121.19293212890625, 48.0542179068944],
          [-121.00067138671875, 48.109265147494874],
          [-120.9759521484375, 48.16058943132621],
          [-120.95123291015625, 48.175244089902144],
          [-121.05010986328125, 48.27770946754798]]]),
    region_WSno = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-122.11441040039062, 48.063641219100326],
          [-122.16796875, 47.98832849269789],
          [-122.0474624633789, 47.99476192414506],
          [-122.07595825195312, 48.05951105734748]]]),
    geometry = 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.MultiPoint(),
    imageCollection = ee.ImageCollection("USDA/NAIP/DOQQ"),
    ps_region = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-123.36108066429682, 49.06210614579993],
          [-123.00789483058918, 48.824294909320365],
          [-123.00183885013246, 48.76325130718188],
          [-123.26365975477353, 48.69222708887535],
          [-123.2218881882493, 48.54324391287195],
          [-123.12266932571998, 48.41987545601385],
          [-123.25857059619057, 48.28308224405784],
          [-123.54997820915162, 48.22153581147844],
          [-124.53909835438861, 48.44464147186219],
          [-124.98699325184748, 48.41002430577288],
          [-123.97629366849662, 46.523945059033245],
          [-121.32868650801424, 46.43316326809874],
          [-119.96643639953794, 47.527400866400164],
          [-120.73545467683391, 49.09089283794628]]]),
    ned = ee.Image("USGS/NED"),
    chili = ee.Image("CSP/ERGo/1_0/US/CHILI"),
    image = ee.Image("users/jrobertson2000/noaa_ccap/sno_ccap_6cl_draft20180731"),
    region_WSno2 = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-122.35666442250363, 48.185257081833235],
          [-122.36919537968055, 48.17667021844405],
          [-122.3767268425164, 48.1746389621372],
          [-122.38408639184945, 48.174896615610955],
          [-122.37367969985223, 48.1641645405382],
          [-122.35813363688061, 48.18157895140331],
          [-122.35988892256734, 48.1740865273669],
          [-122.36795422963502, 48.16467392505144],
          [-122.3649695718646, 48.15578846689628],
          [-122.36249047737266, 48.151259827046836],
          [-122.36485599697016, 48.14796470497796],
          [-122.36546185277655, 48.144640818725854],
          [-122.15445386348853, 48.1456430947872],
          [-122.13385517291437, 48.18331145345407]]]),
    rooftops_imp = ee.FeatureCollection("users/jrobertson2000/shapefiles/wa_rooftopsMSFT2018"),
    roads_imp = ee.FeatureCollection("TIGER/2016/Roads"),
    image3 = ee.Image("users/jrobertson2000/psLandCover_layeringMatched"),
    psRough = 
    /* color: #d63000 */
    /* shown: false */
    ee.Feature(
        ee.Geometry.Polygon(
            [[[-124.91853307459587, 48.420089402200894],
              [-124.87458776209587, 48.339822591980464],
              [-124.65486119959587, 48.2703993884789],
              [-124.55598424647087, 48.19355860159701],
              [-124.40766881678337, 48.035857819081116],
              [-124.24287389490837, 48.10193099938958],
              [-124.01765416834587, 48.043203472746136],
              [-123.80342076990837, 47.98808553879958],
              [-123.79243444178337, 47.89609136269387],
              [-123.61116002772087, 47.84450310676804],
              [-123.65510534022087, 47.70791546846915],
              [-123.57270787928337, 47.641337674317604],
              [-123.54524205897087, 47.5820860931948],
              [-123.58918737147087, 47.47080841197513],
              [-123.51228307459587, 47.27736773074415],
              [-123.47383092615837, 47.165444495958816],
              [-123.47383092615837, 47.038312480042656],
              [-123.39143346522087, 46.88835666066629],
              [-123.14973424647087, 46.68148093838622],
              [-122.90254186365837, 46.481375637505906],
              [-122.35322545740837, 46.39051894581702],
              [-121.96321080897087, 46.526747179603674],
              [-121.80390905115837, 46.62492229385261],
              [-121.67207311365837, 46.77561391351766],
              [-121.69953893397087, 46.81698038234543],
              [-121.51277135584587, 46.84328794255523],
              [-121.27656530115837, 47.11313278480089],
              [-121.28755162928337, 47.269913532383654],
              [-121.39741491053337, 47.366736219332935],
              [-121.06782506678337, 47.5820860931948],
              [-121.01838659022087, 47.704218930571905],
              [-121.04035924647087, 47.837129163685034],
              [-121.12275670740837, 47.89977427315026],
              [-121.06233190272087, 48.02116336954571],
              [-120.98542760584587, 48.05789163801377],
              [-120.85908483240837, 48.164255566644485],
              [-120.99092076990837, 48.310603278654746],
              [-121.01838659022087, 48.4419583867844],
              [-120.88105748865837, 48.50386940369462],
              [-120.80964635584587, 48.467460307267196],
              [-120.67231725428337, 48.49294941921199],
              [-120.60090612147087, 48.718151215824314],
              [-120.71076940272087, 48.93152410613985],
              [-120.79316686365837, 49.01085441283409],
              [-123.30903600428337, 48.99644010909585],
              [-123.00691198084587, 48.81590918236201],
              [-123.00691198084587, 48.76886428746393],
              [-123.27607701990837, 48.678269328868154],
              [-123.23213170740837, 48.55479823144985],
              [-123.16072057459587, 48.467460307267196],
              [-123.09480260584587, 48.42373488656893],
              [-123.22663854334587, 48.28136722491978],
              [-123.50678991053337, 48.21552488669441],
              [-123.99018834803337, 48.28502264719541],
              [-124.98445104334587, 48.54752582049878]]]),
        {
          "id": 1,
          "system:index": "0"
        }),
    testAsset = ee.Image("users/jrobertson2000/psLandCover_layeringFill_sno2"),
    geometry2 = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.MultiPolygon(
        [[[[-123.33206353472008, 49.00433253328285],
           [-123.00796685503258, 48.83287078197033],
           [-123.01346001909508, 48.764121239368755],
           [-123.26889214800133, 48.69709034192275],
           [-123.21945367143883, 48.5300314691722],
           [-123.15353570268883, 48.437184538548664],
           [-123.14254937456383, 48.40072757700933],
           [-123.26065240190758, 48.287544813212726],
           [-123.54080376909508, 48.230859166888784],
           [-124.01870904253258, 48.30216316439262],
           [-124.74380669878258, 48.497281371386855],
           [-124.81247124956383, 48.499101376638045],
           [-124.77676568315758, 47.86547632006861],
           [-124.50210748003258, 47.69937614733099],
           [-124.45266900347008, 47.521617489526044],
           [-122.63443169878258, 47.51048751051461],
           [-122.37075982378258, 49.020545761907165]]],
         [[[-122.43118462847008, 49.027749946485145],
           [-122.70584283159508, 47.536453789273715],
           [-121.17874322222008, 47.451087748649165],
           [-120.96450982378258, 47.65869314981833],
           [-121.00845513628258, 47.95752491657912],
           [-120.77774224565758, 48.18876145371026],
           [-120.92605767534508, 48.4116674107471],
           [-120.62393365190758, 48.495461300794275],
           [-120.60196099565758, 48.814787932329516],
           [-120.77224908159508, 49.00613426387933]]],
         [[[-123.00247369097008, 46.45371832640611],
           [-122.16201958940758, 46.43857837443865],
           [-121.59622369097008, 46.574686471719275],
           [-121.25015435503258, 47.059609628254364],
           [-121.17874322222008, 47.49564386607829],
           [-123.63418755815758, 47.566113798860066]]],
         [[[-124.42520318315758, 47.5587003701416],
           [-124.13406548784508, 46.24517510161088],
           [-123.87588677690758, 46.19576679662147],
           [-123.13430962847008, 46.10824317952596],
           [-122.85415826128258, 46.472637349187124],
           [-123.56277642534508, 47.54387036537269]]]]),
    chunk1 = 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-123.32657037065758, 49.00613426387933],
          [-123.00796685503258, 48.829254734003776],
          [-123.00796685503258, 48.76774198558453],
          [-123.27713189409508, 48.695277455774935],
          [-123.13980279253258, 48.38978539002268],
          [-123.29361138628258, 48.276578303111954],
          [-123.56277642534508, 48.2473227652852],
          [-124.09561333940758, 48.31677733032702],
          [-124.82071099565758, 48.52457458959586],
          [-124.80423150347008, 47.85441948515521],
          [-124.47464165972008, 47.52903616399953],
          [-122.70584283159508, 47.55128589232058],
          [-122.39273248003258, 49.016943278516145]]]),
    chunk2 = 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-122.45865044878258, 49.020545761907165],
          [-122.64541802690758, 47.847046951789125],
          [-120.97549615190758, 47.76587990403292],
          [-121.01944146440758, 47.968559746318476],
          [-120.78872857378258, 48.199746802232596],
          [-120.91507134722008, 48.4116674107471],
          [-120.64590630815758, 48.50638074423926],
          [-120.60196099565758, 48.82202185513711],
          [-120.78872857378258, 49.013340534384234]]]),
    chunk3 = 
    /* color: #ffc82d */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-122.94754205034508, 46.46128672446502],
          [-122.18399224565758, 46.43100682050204],
          [-121.56326470659508, 46.582238040628326],
          [-121.25564751909508, 47.052124808625244],
          [-121.18972955034508, 47.417645867645604],
          [-120.94803033159508, 47.66239291503475],
          [-120.98098931597008, 47.784338098285126],
          [-122.68936333940758, 47.88389913812093]]]),
    chunk4 = 
    /* color: #00ffff */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-124.13406548784508, 46.24897389887825],
          [-123.90884576128258, 46.22997728176072],
          [-123.76053033159508, 46.24137604126698],
          [-122.85965142534508, 46.51801618059421],
          [-122.60147271440758, 47.5735261785003],
          [-124.51309380815758, 47.584642780992404]]]),
    table = ee.FeatureCollection("users/jrobertson2000/shapefiles/wa_shorelineEsri"),
    maskTacomaNarrows = 
    /* color: #ffc82d */
    /* shown: false */
    ee.Feature(
        ee.Geometry.Polygon(
            [[[-122.556744434385, 47.27392068859163],
              [-122.5578065891549, 47.272901555487294],
              [-122.54544979715001, 47.263369032796405],
              [-122.54425353192937, 47.26499628969949],
              [-122.55628592157018, 47.274001724251725]]]),
        {
          "type": 5,
          "system:index": "0"
        });
/***** End of imports. If edited, may not auto-convert in the playground. *****/
///from jaime LandCover_HiRes_Cleanest


var region = region_WSno2
var aoi = ps_region
var psHUC04 = ee.FeatureCollection('USGS/WBD/2017/HUC04')
                .filter(ee.Filter.eq('name','Puget Sound'))
Map.addLayer(psHUC04, {}, 'Puget Sound HUC04', 0);
var nedE = ee.Image('USGS/NED')
var e0 = nedE.updateMask(nedE.gt(0))
Map.addLayer(e0, {}, 'elev gt 0', 0)

var huc12 = ee.FeatureCollection('USGS/WBD/2017/HUC12')
Map.addLayer(huc12, {}, 'huc12', 0)
var ecoregions = ee.FeatureCollection('EPA/Ecoregions/2013/L4')
Map.addLayer(ecoregions, {}, 'ecoregions', 0)

//----dilate function
var dilate = function(img, distance) {
  var d = img.fastDistanceTransform(distance).sqrt().multiply(ee.Image.pixelArea().sqrt())
  return d.lt(distance).selfMask()
}

//----------- start Waterbodies and Shorelines ------------//
// Import waterbodies (WDNR) and reduce to image using the FID
var waterbods_fc = ee.FeatureCollection('users/jrobertson2000/shapefiles/wa_waterbodiesWDNR');
Map.addLayer(waterbods_fc, {palette:'blue'}, 'waterbodies_fc', 0);

var waterbods_fc = waterbods_fc.filter(ee.Filter.and(
  ee.Filter.eq('WB_HYDR_FT', 'LA'), ee.Filter.eq('DNR_OUTPUT', 750000)));

var intWaterbods = waterbods_fc.map(function(feature) {
  return feature.set({type: 5})
});
var waterbods = intWaterbods
  .filter(ee.Filter.neq('type', null))
  .reduceToImage({properties: ['type'],reducer: ee.Reducer.first()
});
var erode = function(img, distance) {
  var d = img.not().unmask(1).fastDistanceTransform(distance).sqrt().multiply(ee.Image.pixelArea().sqrt())
  return img.updateMask(d.gt(distance))
}
Map.addLayer(erode(waterbods, 10), {palette:'blue'}, 'waterbodies', 0);

var bridge = ee.FeatureCollection(maskTacomaNarrows)
               .reduceToImage({properties: ['type'],reducer: ee.Reducer.first()
});
Map.addLayer(bridge, {palette:'blue'}, 'Tacoma Narrows bridge mask', 0);

var waterLayer = waterbods.blend(bridge);
Map.addLayer(waterLayer, {palette:'blue'}, 'water layer', 0);

Map.addLayer(erode(e0, 5), {palette:'black'}, 'elevation shoreline?', 0);

// Import shorelines (Esri) and reduce to image using the FID
var shorelines_fc = ee.FeatureCollection('users/jrobertson2000/shapefiles/wa_shorelineEsri');
Map.addLayer(shorelines_fc, {}, 'shorelines_fc', 0);
var shorelines_fc = shorelines_fc.filter(ee.Filter.eq('CODE', 0));
var intShorelines = shorelines_fc.map(function(feature) {
  return feature.set({type: 5})
});
var shorelines = intShorelines
  .filter(ee.Filter.neq('type', null))
  .reduceToImage({properties: ['type'],reducer: ee.Reducer.first()
}).int().select(['first'],['label']);
Map.addLayer(shorelines, {palette:'blue'}, 'shorelines', 0);

var ps_au_ecy = ee.FeatureCollection('users/jrobertson2000/shapefiles/WatChar_PS_AU_ECY')
Map.addLayer(ps_au_ecy, {}, 'PS AU ECY', 0)

//----------- end Waterbodies and Shorelines ------------//

//----------- start Roads, OWSs, and Rooftops ------------//
// Import TIGER roads
var roads_fc = ee.FeatureCollection('TIGER/2016/Roads');
//Map.addLayer(roads_fc, {}, 'roads_fc', 0)
var intRoads = roads_fc.map(function(feature) {return feature.set({type: 6})}); // Map function over collection to make road areas equal 6 -- requires numeric type to reduce to image
var roads_fc1 = intRoads.filter(ee.Filter.inList('mtfcc', ['S1100'])); //primary roads
var roads_fc2 = intRoads.filter(ee.Filter.inList('mtfcc', ['S1200'])); //secondary roads
var roads_fc3 = intRoads.filter(
  ee.Filter.and(
    ee.Filter.inList('mtfcc', ['S1100','S1200','S1500','S2000']).not(),
    ee.Filter.and(
      ee.Filter.eq('rttyp','M'),
      ee.Filter.eq('mtfcc','S1400')))); //other roads (not dirt or bridle paths)
var roads_fcDirt = intRoads.filter(
  ee.Filter.and(
    ee.Filter.inList('mtfcc', ['S1100','S1200']).not(),
    ee.Filter.inList('mtfcc', ['S1100','S1200','S1500','S2000','S1400']),
    ee.Filter.and(
      ee.Filter.inList('rttyp',['M','',null]),
      ee.Filter.eq('mtfcc','S1400')).not())); //dirt roads (not complete)
//Map.addLayer(roads_fcDirt, {}, 'roads_fcDirt', 0)
    
// Reduce features to images and widen to approximate relative road widths by type
var roads1 = roads_fc1
  .filter(ee.Filter.neq('type', null))
  .reduceToImage({properties: ['type'],reducer: ee.Reducer.first()
}).focal_max(6, 'square', 'meters'); //width is approximately 12 meters or 39 feet
var roads2 = roads_fc2
  .filter(ee.Filter.neq('type', null))
  .reduceToImage({properties: ['type'],reducer: ee.Reducer.first()
}).focal_max(4, 'square', 'meters'); //width is approximately 8 meters or 26 feet
var roads3 = roads_fc3
  .filter(ee.Filter.neq('type', null))
  .reduceToImage({properties: ['type'],reducer: ee.Reducer.first()
}).focal_max(2, 'square', 'meters'); //width is approximately 4 meters or 13 feet
var roads = ee.ImageCollection([roads1, roads2, roads3]).mosaic(); //combine roads back into an image collection
Map.addLayer(roads, {palette:'black'}, 'roads', 0);

var roadsDirt = roads_fcDirt
  .filter(ee.Filter.neq('type', null))
  .reduceToImage({properties: ['type'],reducer: ee.Reducer.first()
}).focal_max(2, 'square', 'meters').remap([6],[4]).select(['remapped'],['label']); //width is approximately 4 meters or 13 feet
Map.addLayer(roadsDirt, {palette:'yellow'}, 'dirt roads', 0);

// Import Over Water Structures (OWS) (WDNR, 2006) and reduce to image using the FID
var ows_fc = ee.FeatureCollection('users/jrobertson2000/shapefiles/ps_overwaterstructuresWDNR')
                  .filter(ee.Filter.neq('struc_code', 5));
var intOWS = ows_fc.map(function(feature) {
  return feature.set({type: 6})
});
var ows = intOWS
  .filter(ee.Filter.neq('type', null))
  .reduceToImage({properties: ['type'],reducer: ee.Reducer.first()
});
Map.addLayer(ows, {palette:'black'}, 'over water structures', 0);

// Import rooftops (Microsoft, 2018) and reduce to image using the FID
var roofs_fc = ee.FeatureCollection('users/jrobertson2000/shapefiles/wa_rooftopsMSFT2018');
var intRoofs = roofs_fc.map(function(feature) {
  return feature.set({type: 6})
});
var roofs = intRoofs
  .filter(ee.Filter.neq('type', null))
  .reduceToImage({properties: ['type'],reducer: ee.Reducer.first()
});
Map.addLayer(roofs, {palette:'black'}, 'rooftops', 0);
//----------- end Roads, OWSs, and Rooftops ------------//


//----------- start imported NOAA CCAP prep ------------//
// Load and remap CCAP data
var ccap = ee.Image('users/jrobertson2000/noaa_ccap/sno_ccap_6cl_draft20180731');
Map.addLayer(ccap, {}, 'ccap', 0);
var ccap10_img = ee.Image('users/jrobertson2000/noaa_ccap/ps_ccap2_10m_6cl_naip2016_draft201809')
//var ccap10_img = ee.Image('users/jrobertson2000/betaCCAP10m_NOAA_wgs84')


var prev = ee.List.sequence(0, 255, 1);
var curr = ee.List([0,0,6,0,0,0,0,0,1,0,3,0,2,0,0,0,0,0,0,0,4,5,0,0,0,0]).cat(ee.List.repeat(0, 230));
// List all types: [0,0,6,0,0,0,0,0,1,0,3,0,2,0,0,0,0,0,0,0,4,5,0,0,0,7] where:
//     0=NoData, 1=grass, 2=shrub, 3=tree, 4=bare, 5=water, 6=impervious, 7=ice
var remap = ccap.remap(prev,curr);
var remap = remap.remap([1,2,3,4,5,6],[1,2,3,4,5,6]); //treats shrub like grass

//var paletteInput = ['white','lightgreen','green','darkgreen','yellow','blue','black']//,'cyan'];
var paletteInput = ['white','#b6bc5f','darkgreen','#004e00','beige','darkblue','gray']//,'cyan']; //more true color
Map.addLayer(remap, {min:0, max:6, palette: paletteInput}, 'ccap 1m remap', 0);
var ccap10 = ccap10_img.remap([0,1,2,3,4,5,6],[0,1,4,6,5,3,2]).select(['remapped'],['ccap10']);
Map.addLayer(ccap10, {min:0, max:6, palette: paletteInput}, 'ccap 10m remap', 0);
//----------- end imported NOAA CCAP prep ------------//

// This function uses a conditional statement to return the image if
// the solar elevation > 40 degrees.  Otherwise it returns a zero image.
var conimage = function(image) {
  return ee.Algorithms.If(ee.Number(image.get('N')).gt(181),
                          image,
                          ee.Image(0));
};
// Load and filter NAIP images
var collection = ee.ImageCollection("USDA/NAIP/DOQQ");
var naip = collection
//  .filterDate(new Date("2015-01-01"), new Date("2017-01-01"))
  .filterDate(new Date("2009-01-01"), new Date("2019-01-01"))
  .filterBounds(aoi)
  .mean()

Map.addLayer(naip,{}, 'NAIP input', 0);

// Make a smoothed NAIP if necessary
var smooth = naip.focal_max({
  radius: 1,
  units: 'meters',
  kernel: ee.Kernel.sobel(1, false),
  iterations: 1
});

// Make a band of boxcar corners to exclude shadows
var weights = ee.List([
  [1,0,0,0,1],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,1]]);  
var corners = ee.Kernel.fixed(5,5,weights,3,3,false);
var naipy = naip.focal_median({kernel: corners})
Map.addLayer(naipy, {}, 'NAIP box corners', 0)

var msavi =   naip.expression('1/2 * ((2*(NIR+1)) - (((2*NIR)+1)**2 - 8*(NIR-RED))**(1/2))', {
      'NIR': naip.select('N'),
      'RED': naip.select('R'),
      })//.select(['constant'],['msavi']);
var msaviBin = msavi.gte(0.5).and(msavi.lt(0.9)).select(['constant'],['msaviBin']);
var gndvi = naip.normalizedDifference(['N', 'G']).select(['nd'],['gndvi']);
var savi = naip.expression('((NIR-RED)*(1+conL))/(NIR+RED+conL)', {
      'NIR': naip.select('N'),
      'RED': naip.select('R'),
      'conL': 1 //constant L value
      });
var ndvi = naip.normalizedDifference(['N','R']); 
var ndwi = naip.normalizedDifference(['G', 'N']);
var green = naip.select('G');
var blue = naip.select('B');
var red = naip.select('R');
var nir = naip.select('N');
var ndviBin = ndvi.gt(0.4);
var ndwiBin = ndwi.gt(0.1)
var entropy = naip.select('N').unitScale(0, 1024).multiply(255).byte()
              .entropy(ee.Kernel.square({radius: 12}));// Compute entropy and display.
var heat = ee.Image('CSP/ERGo/1_0/US/CHILI').unmask(170).select(['constant'],['heat']).resample('bicubic')//.convolve(ee.Kernel.circle(8, 'meters'));
var elev = ee.Image('USGS/NED').resample('bicubic')//.convolve(ee.Kernel.circle(8, 'meters'))//.round();
var hillshade = ee.Terrain.hillshade(elev, 175).resample('bicubic'); //.convolve(ee.Kernel.circle(8,'meters'));//input, azimuth
var luImg = ee.Image('users/cnilsen/lu_5m_pyramid') //('users/cnilsen/luBlend_out')
var lu = luImg.updateMask(luImg.neq(0));
//Major Category	Hex Code		Raster Num
//Commercial	   #80b1d3		1
//Industrial	   #ffffb3		2
//Open Space	   #8dd3c7		3
//Residential	   #fb8072		4
//Right of Way	 #bebada		5
//Road	         #bebada		6
//Water         # 0000ff    0
var luRemap = lu.remap(
[1, 11, 12, 13, 14, 15, 16, 17, 18, 21, 28, 29, 32, 34, 35, 39, 41, 42, 43, 44, 45, 46, 47, 48, 51, 52, 53, 54, 55, 56, 57, 58, 59, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 72, 73, 74, 75, 76, 79, 81, 82, 83, 85, 87, 88, 91, 93, 94, 99, 
],
[3, 1, 	1, 	1, 	1, 	1, 	1, 	2, 	1, 	2, 	2, 	2, 	2, 	2, 	2, 	2, 	2, 	2, 	2, 	2, 	6, 	2, 	2, 	2, 	1, 	1, 	1, 	1, 	1, 	1, 	1, 	1, 	1, 	1, 	1, 	1, 	1, 	1, 	1, 	1, 	1, 	1, 	3, 	3, 	3, 	3, 	3, 	3, 	3, 	3, 	3, 	3, 	2, 	3, 	3, 	3, 	3/*water 0*/, 	3, 	3, 					
],6/*,6*/).select(['remapped'],['lu']);

// Combine bands for classification
var combined = ee.Image.cat([entropy, luRemap, elev, hillshade, gndvi, msavi, msaviBin, /*ndvi, ndwi,*/ green, blue, red, nir]);
Map.addLayer(combined, {}, 'NAIP Bands & Indices', 0);

Map.addLayer(luRemap, {}, 'Land Use', 0);
Map.addLayer(heat, {min:0, max:255}, 'NED HEAT', 0);
var elevPalette = ['black','black','darkblue','lightblue','lightgreen','green','darkgreen','tan','darkgray','gray','white']
Map.addLayer(elev, {min:-350, max: 1000, palette: elevPalette}, 'NED Elevation', 0);
Map.addLayer(hillshade, {min:0, max:255, opacity:0.99}, 'NED Hillshade', 0);


// start land cover supervised classification =================================
var bands = combined.bandNames();
var lc = remap.updateMask(remap.neq(0));
var lcClass = 'remapped';
var paletteOutput = ['lightgreen','green','darkgreen','yellow','blue','black'];
Map.addLayer(lc, {min: 1, max: 6, palette: paletteOutput}, 'CCAP LC for Training', 0);

// Make a training dataset by sampling the stacked images.
var traininglc = lc.addBands(combined).sample({
  region: region,
  scale: 2,
  numPixels: 500
  });

// Create classifier
var classifierlc = ee.Classifier.continuousNaiveBayes().train({  
  features: traininglc,
  classProperty: lcClass,
});
//print(classifierlc)

// Apply the classifier to the original composite.
var result = combined.classify(classifierlc)//.updateMask(elev.gt(0));
var resultSmooth = result.focal_mode({
  radius: 2,
  units: 'meters',
  kernel: ee.Kernel.sobel(2, false),
  iterations: 1
});
//print(result)
Map.addLayer(resultSmooth, {min:1, max:6, palette: paletteOutput}, 'Classification Result', 0);
var resultDil1 = result.remap([1,2,3,4,5,6],[2,3,4,1,0,5]).focal_max(2, 'circle', 'meters');
var resultDil2 = resultDil1.focal_min(2, 'circle', 'meters').remap([2,3,4,1,0,5],[1,2,3,4,5,6]).select(['remapped'],['classification']);
var resultDil = resultDil2
Map.addLayer(resultDil, {min:1, max:6, palette: paletteOutput}, 'Classification Result (Dilated)', 0);

//=========== end land cover supervised classification ================

//-------LAYERING
var l1 = roofs.int().select(['first'],['label'])
var l2 = roads.int().select(['first'],['label'])
var l2a = ows.int().select(['first'],['label'])
var l2b = waterLayer.int().select(['first'],['label'])
var m1 = resultSmooth.eq(1).and(ccap10.eq(1)).remap([1],[1]).int().select(['remapped'],['label'])
var m2 = resultSmooth.eq(2).and(ccap10.eq(2)).remap([1],[2]).int().select(['remapped'],['label'])
var m3 = resultSmooth.eq(3).and(ccap10.eq(3)).remap([1],[3]).int().select(['remapped'],['label'])
var m4 = resultSmooth.eq(4).and(ccap10.eq(4)).remap([1],[4]).int().select(['remapped'],['label'])
var m5 = resultSmooth.eq(5).and(ccap10.eq(5)).remap([1],[5]).int().select(['remapped'],['label'])
var m6 = resultSmooth.eq(6).and(ccap10.eq(6)).remap([1],[6]).int().select(['remapped'],['label'])

var c10_1 = ccap10.remap([1], [1]).int().select(['remapped'],['label']); //grass
var c10_2 = ccap10.remap([2], [2]).int().select(['remapped'],['label']); //shrub
var c10_3 = ccap10.remap([3], [3]).int().select(['remapped'],['label']); //tree
var c10_4 = ccap10.remap([4], [4]).int().select(['remapped'],['label']); //bare
var c10_5 = ccap10.remap([5], [5]).int().select(['remapped'],['label']); //water
var c10_6 = ccap10.remap([6], [6]).int().select(['remapped'],['label']); //impervious


//            .updateMask(maskTacomaNarrows.geometry())
var result12356 = resultSmooth.remap([1,2,3,5,6], [1,2,3,5,6]).int().select(['remapped'],['label']); // all but bare
var l3 = resultSmooth.remap([1,2,3], [1,2,3]).int().select(['remapped'],['label']); // 1-m veg
var l4 = ccap10.updateMask(ccap10.eq(5).or(ccap10.eq(4))).focal_max(10,'circle','meters').int().select(['ccap10'],['label']) // 10-m water grown out //
var l5 = resultSmooth.remap([4], [4]).int().select(['remapped'],['label']); // 1-m bare
var l6 = ccap10.int().select(['ccap10'],['label']); // 10-m fill
var ccap10smooth = ccap10.focal_mode(5,'circle','meters').int().select(['ccap10'],['label'])

var layering = ee.ImageCollection([l6,l5,l4,m6,l3,l2b,l2a,l2,l1]).mosaic().updateMask(l6); //Mosaic puts last image on top, etc.

Map.addLayer(ccap10smooth, {min:0, max:6, palette: paletteInput}, 'ccap10smooth', 0);
Map.addLayer(l6, {min:0, max:6, palette: paletteInput}, 'l6 = ccap 10m', 0);
Map.addLayer(l5, {min:0, max:6, palette: paletteInput}, 'l5 = 1m bare', 0);
Map.addLayer(l4, {min:0, max:6, palette: paletteInput}, 'l4 = 10m water w/ bare', 0);
Map.addLayer(m4, {palette:'beige'}, 'm4 = matched bare', 0)
Map.addLayer(m5, {palette:'black'}, 'm5 = matched water', 0)
Map.addLayer(m6, {palette:'gray'}, 'm6 = matched impervious', 0)
Map.addLayer(l3, {min:0, max:6, palette: paletteInput}, 'l3 = 1m veg classes', 0);
Map.addLayer(result12356, {min:0, max:6, palette: paletteInput}, 'result, except bare', 0)
Map.addLayer(l2b, {min:0, max:6, palette: paletteInput}, 'l2b = water layer', 0);
Map.addLayer(l2a, {min:0, max:6, palette: paletteInput}, 'l2a = ows', 0);
Map.addLayer(l2, {min:0, max:6, palette: paletteInput}, 'l2 = roads', 0);
Map.addLayer(l1, {min:0, max:6, palette: paletteInput}, 'l1 = roofs', 0);
Map.addLayer(layering, {min:0, max:6, palette: paletteInput}, 'layering', 0);

var rLayering = layering.updateMask(layering.neq(4));
Map.addLayer(rLayering, {min:0, max: 6, palette: paletteInput}, 'layering -- no dirt', 0)

var rLayeringNew = l6.blend(rLayering).blend(roadsDirt).updateMask(elev.lt(1500)).int16()
Map.addLayer(rLayeringNew, {min:0, max: 6, palette: paletteInput}, 'layering -- dirt filled with CCAP10', 0)


// Output of the image export
var ps_lc_export = ee.Image('users/jrobertson2000/ps_lc_export');
Map.addLayer(ps_lc_export, {min:1, max:6, palette: paletteOutput}, 'PS LC Export', 0);

var unk = ps_lc_export.updateMask(ps_lc_export.eq(4).or(ps_lc_export.eq(5)));
Map.addLayer(unk, {min:1, max:6, palette: paletteOutput}, 'PS LC Export masked', 0);


//************************start FINAL OUTPUT IMPORTED
var robertsonLC = ee.Image('users/jrobertson2000/psLandCover_layeringMatched');
Map.addLayer(robertsonLC, {min:1, max:6, palette: paletteOutput}, 'robertson land cover', 0);
//************************stop FINAL OUTPUT IMPORTED

//------ start playing with FINAL OUTPUT IMPORTED -------//
var rLC = robertsonLC.updateMask(robertsonLC.neq(4));
var rLCfill = ccap10.blend(rLC)
                    .blend(waterLayer)
                    .blend(roadsDirt)
                    .blend(ows)
                    .updateMask(robertsonLC).updateMask(elev.lt(1500));
Map.addLayer(rLCfill, {min:1, max: 6, palette: paletteOutput}, 'fill dirt with other', 0)
//------ end playing with FINAL OUTPUT IMPORTED -------//

//---------FINAL OUTPUTS
var psLandCover_1m = ee.Image('users/jrobertson2000/psLandCover_1m')
Map.addLayer(psLandCover_1m, {min:0, max:6, palette: paletteInput, opacity:1.0}, 'near final PS LC mosaic', 1);

var psLandCover_1m_fin = ee.Image('users/jrobertson2000/psLandCover_1m_fin')
Map.addLayer(psLandCover_1m_fin, {min:0, max:6, palette: paletteInput, opacity:1.0}, 'final PS LC mosaic', 1);

var psLandCover_1m_finPS_1500m = ee.Image('users/jrobertson2000/psLandCover_1m_finPS_1500m');
var paletteInput2 = ['white','#b6bc5f','darkgreen','#004e00','beige','black','pink','brown']//,'cyan']; //more true color
Map.addLayer(psLandCover_1m_finPS_1500m, {min:0, max:7, palette: paletteInput2, opacity:1.0}, 'final exported', 1);