import { Dispatch, SetStateAction } from 'react';
import statesDictionary from '../utility/statesDictionary';
import { isNumeric } from '../utility/functions';

const VERSION = '1.0';
// const usaCountryCode = '840'

const openWeatherKey = process.env.NEXT_PUBLIC_OPENWHETHER_API;

export async function getGeoCodeByCity(
  cityName: string,
  stateAbbr: string,
  successSetter: Dispatch<SetStateAction<OpenWeatherApiByCity>>,
  errorSetter?: Dispatch<SetStateAction<string>>,
  options?: GeoCodeOptions,
) {
  const DF: GeoCodeOptions = {
    key: openWeatherKey,
    version: VERSION,
    limit: '100',
  };

  const path = 'https://api.openweathermap.org/geo/';
  const key = options?.key || DF.key;
  const version = options?.version || DF.version;
  const limit = options?.limit || DF.limit;
  const city = cityName.replaceAll(' ', '_');
  const state = statesDictionary[stateAbbr as keyof {}];

  if (!key) {
    throw Error('no api key');
  }

  const response = await fetch(
    `${path + version}/direct?q=${city}&limit=${limit}&appid=${key}`,
    { next: { revalidate: 60 * 60 } },
  );
  if (response.status >= 200 && response.status <= 299) {
    const data: Array<OpenWeatherApiByCity> = await response.json();
    // console.log('data', data)
    const resultArr = data.filter((ele) => ele.state?.toLowerCase() === state);

    if (resultArr.length > 0) {
      console.log('THIS:: ', resultArr[0]);
      successSetter(resultArr[0]);
    } else if (errorSetter) {
      errorSetter(response.statusText);
    }
  }
}

export async function getGeoCodeByZip(
  zipCode: string,
  successSetter: Dispatch<SetStateAction<OpenWeatherApiByZip>>,
  errorSetter?: Dispatch<SetStateAction<string>>,
) {
  if (!isNumeric(zipCode, false)) {
    throw Error(`zipcode must be a numeric string, zipcode:: ${zipCode}`);
  }
  const path = 'http://api.openweathermap.org/geo/';
  const version = '1.0';
  const key = openWeatherKey;

  if (!key) {
    throw Error('no api key');
  }

  const response = await fetch(`${path + version}/zip?zip=${zipCode}&appid=${key}`, { next: { revalidate: 60 * 60 } });

  if (response.status >= 200 && response.status <= 299) {
    const data: OpenWeatherApiByZip = await response.json();
    if (data) {
      console.log('THIS:: ', data);
      successSetter(data);
    }
  } else if (errorSetter) {
    errorSetter(response.statusText);
  }
}
