import getWeatherNow from '../../calls/weatherNow';
import { OpenWeatherUnits } from '../../@types'; // enum
import getWeather3HourSteps from '../../calls/weather3HourSteps';
import TheTime from './TheTime';
import Fallback from './Fallback';
import { toTitleCase } from '../../utility/functions';
import styles from '../../CSS/myWeather.module.css';

interface props {
  searchParams: {
    lat: string,
    lon: string,
  }
}

const degC = '\u00b0' + 'C';

function getMaxAndMinAndAvg(data: Array<WeatherVariables> = []) {
  if (!(data.length > 0 && data[0].temp_min && data[0].temp_max)) {
    return [null, null, null];
  }
  const max = Math.max(...data.map((ele) => ele.temp as number));
  const min = Math.min(...data.map((ele) => ele.temp as number));
  const average = data.reduce((acc, curr) => acc + (curr.temp as number), 0) / data.length;
  return [Math.floor(min), Math.ceil(max), Math.floor(average)];
}

function getAverageHumidity(data: Array<WeatherVariables> = []) {
  if (!(data.length > 0 && data[0].humidity)) {
    return -1;
  }
  const humidities = data.map((ele) => ele.humidity as number);
  return Math.floor(humidities.reduce((a, b) => a + b) / humidities.length);
}

const MyWeather = async ({ searchParams }: props) => {
  const { lat, lon } = searchParams;
  // guard
  if (!(lat && lon)) {
    return (
      <div>
        Did Not Receive Longitude and/or Latitude
        <p>
          lat:
          {lat}
        </p>
        <p>
          lon:
          {lon}
        </p>
      </div>
    );
  }
  // end guard

  const currentWeather: WeatherData = await getWeatherNow(lat, lon, OpenWeatherUnits.metric);
  const threeHourWeather: Array<WeatherVariables> | undefined = await getWeather3HourSteps(lat, lon, OpenWeatherUnits.metric);
  const [min, max, average] = getMaxAndMinAndAvg(threeHourWeather);
  const humidity = getAverageHumidity(threeHourWeather);
  const weather = currentWeather?.weather?.[0];

  return <Fallback />;

//   return (
//     <div className={ styles.weather_today_container }>
//       <div className={ styles.weather_today_header }>
//         <div>
//           <h3>TODAY IN</h3>
//           <h3>{currentWeather?.name?.toUpperCase() || 'null'}</h3>
//         </div>
//         <TheTime />
//       </div>
//       <div className={ styles.weather_today_grid }>
//         <div className={ styles.weather_today_grid_child }>
//           <div className={styles.weather_today_p}>
//             <p className='FSml'>{weather?.description && toTitleCase(weather.description)}</p>
//             <p className='FSmd'>Expect to See</p>
//           </div>
//           <div className='icon-wrapper'>
//             <i className='icon wi wi-cloud'/>
//           </div>
//         </div>
//         <div className={ styles.weather_today_grid_child}>
//           <div className={ styles.weather_today_p }>
//             <p className='FSlg'>{average + degC}</p>
//             <p className='FSmd'>Today{"'"}s Average</p>
//           </div>
//           <div className='icon-wrapper'>
//             <i className='icon wi wi-sunset'></i>
//           </div>
//         </div>
//         <div className={ styles.weather_today_grid_child }>
//           <div className={ styles.weather_today_p }>
//             <p className='FSlg'>{max + degC}</p>
//             <p className='FSmd'>Today{"'"}s High</p>
//           </div>
//         <div className='icon-wrapper'>
//           <i className='icon wi wi-thermometer'/>
//         </div>
//         </div>
//         <div className={ styles.weather_today_grid_child }>
//           <div className={ styles.weather_today_p }>
//             <p className='FSlg'>{min + degC}</p>
//             <p className='FSmd'>Today{"'"}s Low</p>
//           </div>
//           <div className='icon-wrapper'>
//             <i className='icon wi wi-thermometer-exterior'/>
//           </div>
//         </div>
//         <div className={ styles.weather_today_grid_child }>
//           <div className={ styles.weather_today_p }>
//             <p className='FSlg'>{humidity === -1 ? 'Could not obtain humidity' : humidity + '%'}</p>
//             <p className='FSmd'>Average Humidity</p>
//           </div>
//           <div className='icon-wrapper'>
//             <i className='icon wi wi-humidity'/>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
};

export default MyWeather;
