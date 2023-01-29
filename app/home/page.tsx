'use client';

import styles from './styles.module.css';
import SearchBarFrom from './(components)/SearchBarForm';

// TODO :: MAKE SURE SUBMIT CAN HANDLE BAD REQUESTS IE: VALID BUT NON-EXISTANT ZIP CODES

function Home(): React.ReactElement {
  // JSX BELOW THIS LINE--------------------------------------
  return (
    <div className={styles.component_wrapper}>
      <div className={`${styles.component} sun_in_clouds`}>
        <main className={styles.main}>
          <div className={styles.title}>
            <h4>Find Location</h4>
          </div>
          <SearchBarFrom />
        </main>
        <div className={`${styles.sun_circle_outer}  footer`}>

          <div className={`${styles.sun_circle_inner} sun_in_blue_sky`} />

        </div>
      </div>
    </div>
  );
}

export default Home;
