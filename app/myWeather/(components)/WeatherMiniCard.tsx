import { getIconFromDesc } from '@/utility/weatherIconDic';
import { toTitleCase } from '@/utility/functions';
import styles from './miniCard.module.css';

type Props = {
  step: number;
  weather: WeatherVariables,
  passedClasses?: Array<string>;
};

const degC = '\u00b0' + 'C';
const degF = '\u00b0' + 'F';

function WeatherMiniCard({
  step,
  weather,
  passedClasses = [],
}: Props): React.ReactElement {
  const date: Date = new Date();
  const displayHour: number = (date.getHours() + (step * 3)) % 24;
  const displayHourAsString: string = `${displayHour}:00`;
  const descriptor = toTitleCase(weather.description.trim()).split(' ').slice(0, 2);

  return (
    <div className={[passedClasses.join(' '), styles.mini_card_wrapper].join(' ')}>
      <section className={`${styles.section_time_descriptor}`}>
        <p>{displayHourAsString}</p>
        <p>
          {Math.floor(weather.temp)}
          {degC}
        </p>
        {descriptor.map((line, idx) => (
          <p key={`${line}${idx}`}>{line}</p>
        ))}
      </section>
      <section className={`${styles.section_icon}`}>
        <div className={`${'icon wi'} ${getIconFromDesc(weather.description) ?? ''}`} />

      </section>
    </div>
  );
}

export default WeatherMiniCard;
