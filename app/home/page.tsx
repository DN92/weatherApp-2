'use client';

import styles from './styles.module.css';
import SearchBarFrom from './(components)/SearchBarForm';

// TODO :: MAKE SURE SUBMIT CAN HANDLE BAD REQUESTS IE: VALID BUT NON-EXISTANT ZIP CODES

function Home(): React.ReactElement {
  // JSX BELOW THIS LINE--------------------------------------
  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h3>Find Location</h3>
      </div>
      <SearchBarFrom />
    </main>
  );
}

export default Home;
