import styles from './miniCard.module.css';

type Props = {
  time?: string;
  descriptor?: string;
  icon?: string; // placeholder?
  passedClasses?: Array<string>;
};

function WeatherMiniCard({
  time = '17:00',
  descriptor = 'Light Rain',
  passedClasses = [],
}: Props): React.ReactElement {
  return (
    <div className={[passedClasses.join(' '), styles.mini_card_wrapper].join(' ')}>
      <section className={`${styles.section_time_descriptor}`}>
        <p>{time}</p>
        <p>{descriptor}</p>
      </section>
      <section className={`${styles.section_icon}`}>
        <p>ICON</p>

      </section>
    </div>
  );
}

export default WeatherMiniCard;
