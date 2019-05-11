const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWFuZXNrbyIsImEiOiJjanV1OWxpb3cwMG1uM3lvYmplMnh2ZnQzIn0._shQgh18AHvZ6kOqgyVQLg&limit=1'
    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to location services")
        } else if (body.message === "Not Found" || body.features.length === 0) {
            callback("Unable to find location. Try another search.")
        } else {
            const data = {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data)
        }
        
    })
}

module.exports = geocode