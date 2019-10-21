const request = require('request')

//Function that handles the geocode http request
const geocode = (address, callback) => {

    //Set the url we want to make the HTTP request
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmlrZmlsaWFzIiwiYSI6ImNrMXpmMW90YjBvc20zbmxpMTExdXBieXoifQ.ReMHCou4mYCq66I2oL9Bgw&limit=1'

    request( {url, json: true}, (error, {body}) => {
        
        //Low level error handling
        if (error) {
            callback('Unable to connect to location services!')
        }
        //Upper level error handling
        else if (body.features.length === 0 ) {
            callback('Unable to find location! Try another search.')
        }
        //Success
        else {
            //Set the latitude
            const latitude   = body.features[0].center[1]

            //Set the longitude
            const longitude = body.features[0].center[0]

            //Set the location
            const placeName = body.features[0].place_name

            callback(undefined, {
                latitude, 
                longitude,
                location: placeName 
            })
        }
    })
}

module.exports = geocode