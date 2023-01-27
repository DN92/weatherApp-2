import { useState, useMemo, Dispatch, SetStateAction } from 'react';
import { getGeoCodeByCity, getGeoCodeByZip } from '../calls/geocoding';
import { isNumeric } from '../utility/functions';

interface GetCoordinatesArgsObj {
  zipCode?: string,
  city?: string,
  state?: string,
}

function isValidZipCode(zipCode: string): boolean {
  const validLength = zipCode.length === 5;
  const validNumeric = isNumeric(zipCode, false);
  return validLength && validNumeric;
}

function isValidCityState(city: string, state: string): boolean {
  return Boolean(city.length >= 2 && state);
}

function useLocationFromGeoApi(
  fetchErrorSet: Dispatch<SetStateAction<string>>,
  formErrorSet: Dispatch<SetStateAction<string>>,
): [string, string, (arg0: GetCoordinatesArgsObj) => Promise<void>] {
  const [geoCodeResult, setGeoCodeResult] = useState<OpenWeatherApiLocation | undefined>();
  const longitude = useMemo(() => {
    return geoCodeResult?.lon || '';
  }, [geoCodeResult]);
  const latitude = useMemo(() => {
    return geoCodeResult?.lat || '';
  }, [geoCodeResult]);


  async function getCoordinates(argsObj: GetCoordinatesArgsObj): Promise<void> {
    let cleanupErrorsAtEnd = true;
    if (argsObj.zipCode && isValidZipCode(argsObj.zipCode)) {
      await getGeoCodeByZip(
        argsObj.zipCode,
        setGeoCodeResult as Dispatch<SetStateAction<OpenWeatherApiByZip>>,
        fetchErrorSet,
      );
    } else if (argsObj.city && argsObj.state && isValidCityState(argsObj.city, argsObj.state)) {
      await getGeoCodeByCity(
        argsObj.city || '',
        argsObj.state || '',
        setGeoCodeResult as Dispatch<SetStateAction<OpenWeatherApiByCity>>,
        fetchErrorSet,
      );
    } else {
      cleanupErrorsAtEnd = false;
      formErrorSet('Enter a valid 5 digit zip code, or provide a City and State');
    }
    if (cleanupErrorsAtEnd) {
      formErrorSet('');
    }
  }

  return [longitude, latitude, getCoordinates];
}

export default useLocationFromGeoApi;
