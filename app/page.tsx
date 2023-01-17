'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import LoadingSun from '../images/loadingSun.gif'
import styles from '../CSS/loading-wrapper.module.css'

console.log('styles check', typeof styles.loadingWrapper)

const AppHome = () => {

  const router = useRouter()
  const [trailingDotsCounter, setTrailingDotsCounter] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('interval')
      setTrailingDotsCounter(dotsCounter => dotsCounter > 2 ? 0 : dotsCounter + 1)
    }, 650)
    setTimeout(() => {
      clearInterval(interval)
      router.push('/home')
    }, 100)
    return () => {
      clearInterval(interval)
    }
  }, [router])

  return (
    <>
      <p>Redirecting{'.'.repeat(trailingDotsCounter)}</p>
      <div className={`${styles.loadingWrapper}`} >
        <Image
          src={LoadingSun}
          alt="loading sun gif"
          height='200'
          width='200'
        />
      </div>
    </>
  )

  // return <Test />
}

export default AppHome
