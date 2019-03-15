const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const weatherURL = `https://api.darksky.net/forecast/54615d2540e17205e0a726accc1c38f5/${latitude},${longitude}?lang=el&units=si`;

    request({ url: weatherURL, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather server", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                rain_chance: body.currently.precipProbability,
                humidity: body.currently.humidity,
                wind_speed: body.currently.windSpeed, 
                summary: body.currently.summary
            })
        }
    });
}

module.exports = forecast;