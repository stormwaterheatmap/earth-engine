var assets = ee.data.listAssets(
    'projects/ee-swhm/assets/production_layers/'
).assets

var img = ((assets['0']['name']))
print(img)

var ll = ee.List([])
for (var i = 0; i < assets.length; i++) {
  var lay = ee.Image(assets[i]['id'])
  var lay_dict = lay.toDictionary().getInfo()
  print(lay_dict['safe_name'])
  var id = assets[i]['name']
  var safe_name = lay_dict['safe_name']


var str = 'exports.'+safe_name+" = ee.Image('"+img+"')"

ll = ll.add(str)
}
print(ll.getInfo())