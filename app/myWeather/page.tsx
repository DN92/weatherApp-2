import getWeatherNow from '../../calls/weatherNow';
import getWeather3HourSteps from '../../calls/weather3HourSteps';
import TheTime from './TheTime';
import { toTitleCase } from '../../utility/functions';
import styles from './myWeather2.module.css';
import WeatherMiniCard from './(components)/WeatherMiniCard';

type Props = {
  searchParams: {
    lat: string,
    lon: string,
  }
};

const degC = '\u00b0' + 'C';
const degF = '\u00b0' + 'F';

function getMaxAndMinAndAvg(data: Array<WeatherVariables> = []): [number, number, number] | Array<null> {
  if (!(data.length > 0 && data[0].temp_min && data[0].temp_max)) {
    return [null, null, null];
  }
  const max = Math.max(...data.map((ele) => ele.temp as number));
  const min = Math.min(...data.map((ele) => ele.temp as number));
  const average = data.reduce((acc, curr) => acc + (curr.temp as number), 0) / data.length;
  return [Math.floor(min), Math.ceil(max), Math.floor(average)];
}

function getAverageHumidity(data: Array<WeatherVariables> = []): number {
  if (!(data.length > 0 && data[0].humidity)) {
    return -1;
  }
  const humidities = data.map((ele) => ele.humidity as number);
  return Math.floor(humidities.reduce((a, b) => a + b) / humidities.length);
}

// component starts here
const MyWeather = async ({ searchParams }: Props): Promise<React.ReactElement> => {
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

  const currentWeather = await getWeatherNow(lat, lon, 'metric') as WeatherData;
  const threeHourWeather: Array<WeatherVariables> | undefined = await getWeather3HourSteps(lat, lon, 'metric');
  const [min, max, average] = getMaxAndMinAndAvg(threeHourWeather);
  const humidity = getAverageHumidity(threeHourWeather);
  const weather = currentWeather?.weather?.[0];

  // return <Fallback />;

  // console.log('current:: ', currentWeather);
  // console.log('three-hour', threeHourWeather);

  return (
    <div className={styles.component_wrapper}>
      <section className={styles.section_day_place}>
        <TheTime />
        <div>
          <h3 className={`${styles.title}`}>{currentWeather?.name?.toUpperCase() || 'null'}</h3>
        </div>
      </section>
      <section className={`${styles.current_temp}`}>
        <p>
          {Math.floor(currentWeather?.main?.temp as number) || 'unknown'}
          {degC}
        </p>
      </section>
      <section className={`${styles.weather_cards_wrapper}`}>
        <WeatherMiniCard />
        <WeatherMiniCard passedClasses={[styles.weather_cards_wrapper__second_child]} />
        <WeatherMiniCard />
      </section>
      {/* <div className="">
        <div className="">
          <div className="">
            <p className="FSml">{weather?.description && toTitleCase(weather.description)}</p>
            <p className="FSmd">Expect to See</p>
          </div>
          <div className="icon-wrapper">
            <i className="icon wi wi-cloud" />
          </div>
        </div>
        <div className="">
          <div className="">
            <p className="FSlg">{average + degC}</p>
            <p className="FSmd">
              Today
              {'\''}
              s Average
            </p>
          </div>
          <div className="icon-wrapper">
            <i className="icon wi wi-sunset" />
          </div>
        </div>
        <div className="">
          <div className="">
            <p className="FSlg">{max + degC}</p>
            <p className="FSmd">
              Today
              {'\''}
              s High
            </p>
          </div>
          <div className="icon-wrapper">
            <i className="icon wi wi-thermometer" />
          </div>
        </div>
        <div className="">
          <div className="">
            <p className="FSlg">{min + degC}</p>
            <p className="FSmd">
              Today
              {'\''}
              s Low
            </p>
          </div>
          <div className="icon-wrapper">
            <i className="icon wi wi-thermometer-exterior" />
          </div>
        </div>
        <div className="">
          <div className="">
            <p className="FSlg">{humidity === -1 ? 'Could not obtain humidity' : `${humidity}%`}</p>
            <p className="FSmd">Average Humidity</p>
          </div>
          <div className="icon-wrapper">
            <i className="icon wi wi-humidity" />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MyWeather;
