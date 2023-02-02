'use client';

import { useState, useEffect, useMemo } from 'react';
import styles from './theTime.module.css';

function TheTime(): React.ReactElement {
  const [now, setNow] = useState(new Date());
  const dateToString = useMemo(() => (
    now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })
  ), [now]);
  const [flashSemiColon, setFlashSemiColon] = useState(false);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setNow(new Date());
    }, 60 * 1000); // update the time every minute
    const interval2 = setInterval(() => {
      setFlashSemiColon((prev) => !prev);
    }, 750);
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  return (
    <div className={`${styles.clock}`}>
      <p className={`${styles.dateToString}`}>
        {dateToString}
      </p>
    </div>
  );
}

export default TheTime;
