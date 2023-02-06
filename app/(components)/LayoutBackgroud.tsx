'use client';

import styles from '../rootLayout.module.css';

console.log('client side test');

function isDaytime(testValue?: boolean): boolean {
  if (typeof testValue !== 'undefined') {
    console.log('here');
    return testValue;
  }
  const currentHour: number = new Date().getHours();
  return currentHour >= 7 && currentHour < 19;
}

function LayoutBackground({ children }: { children: React.ReactElement; }): React.ReactElement {
  return (
    <div className={`${styles.component} ${(isDaytime() ? 'sun_in_clouds' : 'night_sky_clear')} background_image_cover`}>
      {children}
    </div>
  );
}

export default LayoutBackground;
