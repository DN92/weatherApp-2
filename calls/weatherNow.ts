// https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}

import { openWeather_units } from "../@types"  // enum

export default async function getWeatherNow(
  lat: string ,
  lon: string,
  units: openWeather_units = openWeather_units.metric
  ) {
  const key = process.env.NEXT_PUBLIC_OPENWHETHER_API
  const domain =  'https://api.openweathermap.org'
  const path = `/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${key}`

  const response = await fetch(domain+path, {next: {revalidate: 60* 60}})
  if (response.status >= 200 && response.status <= 299) {
    const data = await response.json()
    // console.log('weatherData:: ', data)
    return data
  } else {

  }
}
