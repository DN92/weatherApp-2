import { getGeoCodeByCity, getGeoCodeByZip } from "../calls/geocoding";
import { useState, useMemo, Dispatch, SetStateAction } from 'react'
import { isNumeric } from '../utility/functions'

interface getCoordinatesArgsObj {
  zipCode?: string,
  city?: string,
  state?: string,
}
function isValidZipCode(zipCode: string) {
  const validLength = zipCode.length === 5
  const validNumeric = isNumeric(zipCode, false)
  return validLength && validNumeric
}

function isValidCityState(city: string, state: string) {
  return(city.length >= 2 && state)
}

function useLocationFromGeoApi(
  fetchErrorSet: Dispatch<SetStateAction<string>>,
  formErrorSet: Dispatch<SetStateAction<string>>
  ): [string, string, (arg0: getCoordinatesArgsObj) => Promise<void>] {
  const [geoCodeResult, setGeoCodeResult] = useState<openWeatherApiLocation | undefined>()
  const longitude = useMemo(() => {
    return geoCodeResult?.lon || ''
  }, [geoCodeResult])
  const latitude = useMemo(() => {
    return geoCodeResult?.lat || ''
  }, [geoCodeResult])


  async function getCoordinates(argsObj: getCoordinatesArgsObj): Promise<void> {
    if (argsObj.zipCode && isValidZipCode(argsObj.zipCode)) {
      await getGeoCodeByZip(
        argsObj.zipCode,
        setGeoCodeResult as Dispatch<SetStateAction<openWeatherApiByZip>>,
        fetchErrorSet
      )
      formErrorSet('')
    } else if (argsObj.city && argsObj.state && isValidCityState(argsObj.city, argsObj.state)) {
      await getGeoCodeByCity(
        argsObj.city,
        argsObj.state,
        setGeoCodeResult as Dispatch<SetStateAction<openWeatherApiByCity>>,
        fetchErrorSet
      )
      formErrorSet('')
    } else {
      formErrorSet('Enter a valid 5 digit zip code, or provide a City and State')
    }
  }

  return [longitude, latitude, getCoordinates]
}

export default useLocationFromGeoApi
