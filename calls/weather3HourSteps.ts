// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

import { openWeather_units } from "../@types"  // enum

export default async function getWeather3HourSteps(
  lat: string,
  lon: string,
  units: openWeather_units = openWeather_units.metric,
  count: number = 8  // number of list elements returned. 8 should give us 24hours worth
) {
  const key = process.env.NEXT_PUBLIC_OPENWHETHER_API
  const domain = 'https://api.openweathermap.org'
  const path = `/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&cnt=${count}&appid=${key}`

  const response = await fetch(domain+path, {next: {revalidate: 60}})
  if (response.status >= 200 && response.status <= 299) {
    const data = await response.json()
    // console.log('weather3hourSteps:: ', data)
    console.log('showing results for ' + data?.city?.name)
    const list: Array<{main: weatherVariables}> = data.list
    return list.map(ele => ele.main)
  } else {

  }
}
