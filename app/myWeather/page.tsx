import getWeatherNow from '../../calls/weatherNow'
import { openWeather_units} from '../../@types'  // enum
import getWeather3HourSteps from '../../calls/weather3HourSteps'

interface props {
  searchParams: {
    lat: string,
    lon: string,
 }
}

const degC ='\u00b0' + 'C'

function getMaxAndMinTemp(data: Array<weatherVariables> = []) {
  if(!(data.length > 0 && data[0].temp_min && data[0].temp_max)) {
    return [null, null]
  }
  const max = Math.max(...data.map(ele => ele.temp as number))
  const min = Math.min(...data.map(ele => ele.temp as number))
  return [min, max]
}

function getAverageHumidity(data: Array<weatherVariables> =[]) {
  if(!(data.length > 0 && data[0].humidity)) {
    return -1
  }
  const humidities = data.map(ele => ele.humidity as number)
  return Math.floor(humidities.reduce((a, b) => a + b) / humidities.length)
}

const MyWeather = async ({searchParams}: props) => {

  const {lat, lon} = searchParams
  // guard
  if (!(lat && lon)) {
    return (
      <div>
        Did Not Receive Longitude and/or Latitude
      </div>
    )
  }
  // end guard

  const currentWeather: weatherData = await getWeatherNow(lat, lon, openWeather_units.metric)
  const threeHourWeather: Array<weatherVariables> | undefined = await getWeather3HourSteps(lat, lon, openWeather_units.metric)
  const [min, max] = getMaxAndMinTemp(threeHourWeather)
  const humidity = getAverageHumidity(threeHourWeather)
  const weather = currentWeather?.weather?.[0]
  const { main } = currentWeather

  return (
    <div>
      {degC}
      <p>input lat: {lat}</p>
      <p>input lon: {lon}</p>
      <p>{weather?.main}</p>
      <p>{weather?.description}</p>
      <p>Temp: {main?.temp}{degC}</p>
      <p>Real Feel: {main?.feels_like}{degC}</p>
      <p>Min: {min}{degC}</p>
      <p>Max: {max}{degC}</p>
      <p>Humidity: {humidity === -1 ? 'Could not obtain humidity' : humidity + '%'}</p>
    </div>
  )
}

export default MyWeather
