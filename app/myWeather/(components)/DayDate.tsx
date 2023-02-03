import styles from './dayDate.module.css';

function DayDate(): React.ReactElement {
  const now = new Date();
  const dateToString = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={`${styles.clock}`}>
      <h3 className={`${styles.dateToString}`}>
        {dateToString}
      </h3>
    </div>
  );
}

export default DayDate;
