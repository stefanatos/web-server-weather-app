const request = require('request');

const geocode = (city, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1Ijoic3RlZmFuYXRvcyIsImEiOiJjanN2eGt0eDcwYnVhNDRsaHZ3b2d3Yjk1In0.PQ5ESJu-uZmTItjF_DWAoQ`;

    request({url: geocodeURL, json: true}, (err, { body }) => {
        if (err) {
            callback("Unable to connect to Geocoding server", undefined);
        } else if (body.message) {
            callback(body.message);
        } else if (body.features.length < 1) {
            callback("Unable to find geocoding Location", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;