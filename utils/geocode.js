const request = require('request')

const GEOCODE_API_KEY =
  'pk.eyJ1IjoiYXJpZWwxOTg3IiwiYSI6ImNrdzd3NTFwdzl0N2szMXMxMXlkZHJ1ZXAifQ.h4t9jUrDVWo84AIn0Se7cA'

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address,
  )}.json?access_token=${GEOCODE_API_KEY}&limit=1`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to geocode service', undefined)
    } else if (body.message) {
      callback('Unable to find location', undefined)
    } else {
      const coords = {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name,
      }

      callback(undefined, coords)
    }
  })
}

module.exports = geocode
