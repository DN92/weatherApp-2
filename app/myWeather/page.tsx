import getWeatherNow from '../../calls/weatherNow'
import { openWeather_units } from '../../@types'  // enum
import getWeather3HourSteps from '../../calls/weather3HourSteps'
import TheTime from './TheTime'
import { toTitleCase } from '../../utility/functions'

interface props {
  searchParams: {
    lat: string,
    lon: string,
 }
}

const degC ='\u00b0' + 'C'

function getMaxAndMinAndAvg(data: Array<weatherVariables> = []) {
  if(!(data.length > 0 && data[0].temp_min && data[0].temp_max)) {
    return [null, null, null]
  }
  const max = Math.max(...data.map(ele => ele.temp as number))
  const min = Math.min(...data.map(ele => ele.temp as number))
  const average = data.reduce((acc, curr) => acc+(curr.temp as number), 0) / data.length
  return [Math.floor(min), Math.ceil(max), Math.floor(average)]
}

function getAverageHumidity(data: Array<weatherVariables> =[]) {
  if(!(data.length > 0 && data[0].humidity)) {
    return -1
  }
  const humidities = data.map(ele => ele.humidity as number)
  return Math.floor(humidities.reduce((a, b) => a + b) / humidities.length)
}

const MyWeather = async ({searchParams}: props) => {
  console.log('GOT HERE')
  const {lat, lon} = searchParams
  // console.log('lat and lon:: ', lat , ' ', lon)
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
  const [min, max, average] = getMaxAndMinAndAvg(threeHourWeather)
  const humidity = getAverageHumidity(threeHourWeather)
  const weather = currentWeather?.weather?.[0]
  // const { main } = currentWeather
  const now = new Date()
  console.log('NOW::', now)

  return (
    <div className='weather-today-container'>
      {/* <p>{weather?.main}</p> */}
      {/* <p> {lat} {lon}</p> */}
      <div className='weather-today-header'>
        <div>
          <h3>TODAY IN</h3>
          <h3>{currentWeather?.name?.toUpperCase()}</h3>
        </div>
        <TheTime />
      </div>
      <div className='weather-today-grid'>
        <div className='weather-today-grid-child '>
          <div className='weather-today_p'>
            <p className='FSml'>{weather?.description && toTitleCase(weather.description)}</p>
            <p className='FSmd'>Expect to See</p>
          </div>
          <div className='icon-wrapper'>
            <i className='icon wi wi-cloud'/>
          </div>
        </div>
        <div className='weather-today-grid-child '>
          <div className='weather-today_p'>
            <p className='FSlg'>{average + degC}</p>
            <p className='FSmd'>Today{"'"}s Average</p>
          </div>
          <div className='icon-wrapper'>
            <i className='icon wi wi-sunset'></i>
          </div>
        </div>
        <div className='weather-today-grid-child '>
          <div className='weather-today_p'>
            <p className='FSlg'>{max + degC}</p>
            <p className='FSmd'>Today{"'"}s High</p>
          </div>
        <div className='icon-wrapper'>
          <i className='icon wi wi-thermometer'/>
        </div>
        </div>
        <div className='weather-today-grid-child '>
          <div className='weather-today_p'>
            <p className='FSlg'>{min + degC}</p>
            <p className='FSmd'>Today{"'"}s Low</p>
          </div>
          <div className='icon-wrapper'>
            <i className='icon wi wi-thermometer-exterior'/>
          </div>
        </div>
        <div className='weather-today-grid-child '>
          <div className='weather-today_p'>
            <p className='FSlg'>{humidity === -1 ? 'Could not obtain humidity' : humidity + '%'}</p>
            <p className='FSmd'>Average Humidity</p>
          </div>
          <div className='icon-wrapper'>
            <i className='icon wi wi-humidity'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyWeather
