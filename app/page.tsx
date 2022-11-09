'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import {Test} from './test-component'

const AppHome = () => {

  const router = useRouter()
  const [dotsCounter, setDotsCounter] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('interval')
      setDotsCounter(dotsCounter => dotsCounter > 2 ? 0 : dotsCounter + 1)
    }, 650)
    setTimeout(() => {
      console.log('timeout finished')
      clearInterval(interval)
      router.push('/home')
    }, 100)
    return () => {
      clearInterval(interval)
    }
  }, [])  // linter is wrong about removing dep array, interval will rerun on unmount.

  return (
    <p>Redirecting{'.'.repeat(dotsCounter)}</p>
  )

  // return <Test />
}

export default AppHome
