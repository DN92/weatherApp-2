import styles from './miniCard.module.css';

type Props = {
  step: number;
  weather: WeatherVariables,
  passedClasses?: Array<string>;
};

function WeatherMiniCard({
  step,
  weather,
  passedClasses = [],
}: Props): React.ReactElement {
  const date: Date = new Date();
  const displayHour: number = (date.getHours() + (step * 3)) % 24;
  const displayHourAsString: string = `${displayHour}:00`;

  return (
    <div className={[passedClasses.join(' '), styles.mini_card_wrapper].join(' ')}>
      <section className={`${styles.section_time_descriptor}`}>
        <p>{displayHourAsString}</p>
        <p>
          {weather.description}
        </p>
      </section>
      <section className={`${styles.section_icon}`}>
        <p>ICON</p>

      </section>
    </div>
  );
}

export default WeatherMiniCard;
