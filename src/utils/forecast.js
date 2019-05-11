const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/6b04cd607d9459c2269070f7650c9896/'
    request({url: `${url}${latitude},${longitude}?units=si`, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location')
        } else if (response.statusCode !== 200) {
            callback(response.statusMessage);
        } else {
            const data = {
                temp: body.currently.temperature,
                chanceOfRain: body.currently.precipProbability,
                summary: body.daily.data[0].summary
        }
          callback(undefined, data)
        }
    })
}

module.exports = forecast