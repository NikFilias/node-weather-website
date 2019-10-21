const request = require('request')

//Forecast function to make the forecast request
const forecast = (lat, long, callback) => {

    const url = 'https://api.darksky.net/forecast/873ccc36b8f5ee598560817bfbb2eee3/'+ lat + ','+ long

    request({url, json: true }, (error, {body}) => {

        //Error handling
        if (error) {
            callback('Unable to connect to weather service!')
        }
        //If the location was not found log the error message
        else if (body.error){    
            callback('Ubanle to find location!')
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.apparentTemperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast