import getWeather3HourSteps from '../../calls/weather3HourSteps';
import TheTime from './(components)/TheTime';
import styles from './myWeather.module.css';
import WeatherMiniCard from './(components)/WeatherMiniCard';
import { getIconFromDesc } from '../../utility/weatherIconDic';

type Props = {
  searchParams: {
    lat: string,
    lon: string,
  }
};

// non component constants

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
// end

// component starts here
const MyWeather = async ({ searchParams }: Props): Promise<React.ReactElement> => {
  const { lat, lon } = searchParams;
  const weather: OpenWeatherThreeHourCall | undefined = await getWeather3HourSteps(lat, lon, 'metric');

  // guard
  if (!(lat && lon) || !weather) {
    return (
      <div>
        Did Not Receive Longitude and/or Latitude or api call failed
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

  const [min, max, average] = getMaxAndMinAndAvg(weather.list);
  const humidity = getAverageHumidity(weather.list);
  // end guard

  // console.log('three-hour', weather);

  return (
    <div className={styles.component_wrapper}>
      <section className={`${styles.section_day_place} blue-text`}>
        <TheTime />
        <div className={`${styles.title_wrapper}`}>
          <h3 className={`${styles.title}`}>{weather.name.toUpperCase()}</h3>
          <div className={`${styles.title_subsection}`}>
            <aside className={`${styles.title_subsection_aside}`}>
              <p className="icon_small wi wi-sunrise" />
              <span>{`${weather.sunrise.getHours()}:${weather.sunrise.getMinutes().toString().padStart(2, '0')}`}</span>
            </aside>
            <aside className={`${styles.title_subsection_aside} row_reverse`}>
              <p className=" icon_small wi wi-sunset" />
              <span>{`${weather.sunset.getHours()}:${weather.sunset.getMinutes().toString().padStart(2, '0')}`}</span>
            </aside>
          </div>
        </div>
      </section>
      <section className={`${styles.current_temp} blue-text`}>
        <p className={`${styles.current_temp_text}`}>
          {Math.floor(weather.list[0]?.temp) ?? 'unknown'}
          {degC}
        </p>
        <p className={`${styles.current_description_text}`}>{weather.list[0]?.description}</p>
      </section>
      <section className={`${styles.weather_cards_wrapper}`}>
        {weather.list.length >= 4 && (
          <>
            <WeatherMiniCard step={1} weather={weather.list[1]} />
            <WeatherMiniCard step={2} weather={weather.list[2]} passedClasses={[styles.weather_cards_wrapper__second_child]} />
            <WeatherMiniCard step={3} weather={weather.list[3]} />
          </>
        )}
      </section>
      <section className={`${styles.foot_icon} wi ${getIconFromDesc(weather.list[0]?.description ?? '')}`} />

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
