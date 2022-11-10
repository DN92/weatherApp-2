import getWeatherNow from '../../calls/weatherNow'
import { openWeather_units } from '../../@types'  // enum
import getWeather3HourSteps from '../../calls/weather3HourSteps'
import TheTime from './TheTime'

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

function getTheTime() {
  const now = new Date()
  return now.getHours()%12 + ':' + now.getMinutes() + ' ' + (now.getHours() > 12 ? 'PM' : 'AM')
}

const MyWeather = async ({searchParams}: props) => {

  const {lat, lon} = searchParams
  // guard
  if (!(lat && lon)) {
    return (
      <div>
        Did Not Receive Longitude and/or Latitude
        <p>lat: {lat}</p>
        <p>lon: {lon}</p>
      </div>
    )
  }
  // end guard

  const currentWeather: weatherData = await getWeatherNow(lat, lon, openWeather_units.metric)
  const threeHourWeather: Array<weatherVariables> | undefined = await getWeather3HourSteps(lat, lon, openWeather_units.metric)
  // const timeZone = await getTimeZone(lat, lon)
  const [min, max] = getMaxAndMinTemp(threeHourWeather)
  const humidity = getAverageHumidity(threeHourWeather)
  const weather = currentWeather?.weather?.[0]
  const { main } = currentWeather
  const now = new Date()
  console.log('NOW::', now)

  return (
    <div className='weather-today-container'>
      {/* <p>{weather?.main}</p> */}
      {/* <p> {lat} {lon}</p> */}
      <div className='weather-today-header'>
        <h2>Today{"'"}s weather summary  for {currentWeather.name}</h2>
        <TheTime />
      </div>
      <div className='weather-today-grid'>
        {/* <div className='weather-today-flx-row'> */}
          <p>Today{"'"}s High: {max + degC}</p>
          <p>Today{"'"}s Low: {min + degC}</p>
          <p>Today{"'"}s weather will include a {weather?.description}</p>
        {/* </div> */}
        {/* <div className='weather-today-flx-row'> */}
          <p>Today{"'"}s min temp will be {min}{degC}</p>
          <p>Today{"'"}s max temp will be {max}{degC}</p>
          <p>Today{"'"}s average humidity will be: {humidity === -1 ? 'Could not obtain humidity' : humidity + '%'}</p>
        {/* </div> */}

      </div>
    </div>
  )
}

export default MyWeather
