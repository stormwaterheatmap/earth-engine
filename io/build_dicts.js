// This line lists all assets under the specified Earth Engine path.
var assets = ee.data.listAssets(
    'projects/ee-swhm/assets/production_layers/'
).assets
print(assets)
// This creates an empty dictionary to hold the rasters.
var rasters = {}

// This loops through each asset in the list of assets.
for(var i = 0; i < assets.length; i++) {
    // This gets the current asset's ID as a dictionary.
    var dict = ee.Image(assets[i]['id'])
    
    // This gets the pretty_name property from the dictionary 
    var lay_name = dict.get('pretty_name').getInfo()
    
    // This adds the current asset's dictionary to the rasters dictionary
    // with its pretty name as the key.
    rasters[lay_name] = dict
}

// This prints the rasters dictionary to the console as an ee.Dictionary object.
print(ee.Dictionary(rasters))
