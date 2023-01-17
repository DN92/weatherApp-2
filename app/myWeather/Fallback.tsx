import TheTime from './TheTime'
import styles from '../../CSS/myWeather.module.css'
import LoadingSun from '../LoadingSun'

export default function Fallback () {
  return (
    <div className={ styles.weather_today_container }>
      <div className={ styles.weather_today_header }>
        <div
        >
        </div>

      </div>
      <div className={ styles.weather_today_grid }>
        <div className={ styles.weather_today_grid_child }>
          <div className={styles.weather_today_p}>
            <LoadingSun />
          </div>
          <div className='icon-wrapper'>
            {/* <LoadingSun /> */}
          </div>
        </div>
        <div className={ styles.weather_today_grid_child}>
          <div className={ styles.weather_today_p }>
           {/* <LoadingSun /> */}
          </div>
          <div className='icon-wrapper'>
            <i className='icon wi wi-sunset'></i>
          </div>
        </div>
        <div className={ styles.weather_today_grid_child }>
          <div className={ styles.weather_today_p }>
            {/* <LoadingSun /> */}
          </div>
        <div className='icon-wrapper'>
          <i className='icon wi wi-thermometer'/>
        </div>
        </div>
        <div className={ styles.weather_today_grid_child }>
          <div className={ styles.weather_today_p }>
            {/* <LoadingSun /> */}
          </div>
          <div className='icon-wrapper'>
            <i className='icon wi wi-thermometer-exterior'/>
          </div>
        </div>
        <div className={ styles.weather_today_grid_child }>
          <div className={ styles.weather_today_p }>
            <p className='FSlg'>PlaceHolder</p>
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
