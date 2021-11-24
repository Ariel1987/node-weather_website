const request = require('request')

const WEATHER_API = '66914e94781e7043c66bd385374a114d'

const forecast = (lat, long, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API}&units=metric`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined)
    } else if (body.message) {
      callback('Unable to find location', undefined)
    } else {
      callback(
        undefined,
        `${body.weather[0].main}. Currently it is ${Math.round(
          body.main.temp,
        )}ºC and it feels like ${Math.round(body.main.feels_like)}ºC`,
      )
    }
  })
}

module.exports = forecast
