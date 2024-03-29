'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LoadingSun from '../images/loadingSun.gif';
import styles from '../CSS/loading-wrapper.module.css';

function AppHome(): React.ReactElement {
  const router = useRouter();
  const [trailingDotsCounter, setTrailingDotsCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrailingDotsCounter((dotsCounter) => (dotsCounter > 2 ? 0 : dotsCounter + 1));
    }, 650);
    setTimeout(() => {
      clearInterval(interval);
      router.push('/home');
    }, 100);
    return (): void => {
      clearInterval(interval);
    };
  }, [router]);

  return (
    <>
      <p>
        Redirecting
        {'.'.repeat(trailingDotsCounter)}
      </p>
      <div className={`${styles.loadingWrapper}`}>
        <Image
          src={LoadingSun}
          alt="loading sun gif"
          height="200"
          width="200"
        />
      </div>
    </>
  );

  // return <Test />
}

export default AppHome;
