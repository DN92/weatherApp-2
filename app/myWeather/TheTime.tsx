'use client'

import { useState, useEffect, useMemo } from 'react'
import useMediaQuery from "../../hooks/useMediaQuery"


const TheTime = () => {
  const { maxSize: screenSize, name } = useMediaQuery()
  const [now, setNow] = useState(new Date())
  const theHour = useMemo(() => {
    const hour = now.getHours()
    return hour === 0 ? 12 : hour
  }, [now])
  const theMinute = useMemo(() => {
    const minute = now.getMinutes()
    return minute < 10 ? '0' + minute.toString() : minute
  }, [now])
  const [flashSemiColon, setFlashSemiColon] = useState(false)

  useEffect(() => {
    const interval1 = setInterval(() => {
      setNow(new Date)
    }, 60 * 1000)
    const interval2 = setInterval(() => {
      setFlashSemiColon(prev => !prev)
    }, 750)
    return () => {
      clearInterval(interval1)
      clearInterval(interval2)
    }
  }, [])

  return (
    <>
      <p>{screenSize < 1290 ? 'The Time is' : ''} {theHour}
      <span style={{opacity: (flashSemiColon ? 0 : 1)}}>:</span>
      {theMinute}
      </p>
    </>
  )
}

export default TheTime
