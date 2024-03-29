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
): Promise<void> {
  const DF: GeoCodeOptions = {
    key: openWeatherKey,
    version: VERSION,
    limit: '100',
  };

  const path: string = 'https://api.openweathermap.org/geo/';
  const key: string | undefined = options?.key || DF.key;
  const version: string | undefined = options?.version || DF.version;
  const limit: string | undefined = options?.limit || DF.limit;
  const city: string = cityName.replaceAll(' ', '_');
  const state: string = statesDictionary[stateAbbr]?.toLowerCase() ?? '';

  if (!key) {
    throw Error('no api key');
  }

  const response = await fetch(
    `${path + version}/direct?q=${city}&limit=${limit}&appid=${key}`,
    { next: { revalidate: 60 * 60 } },
  );
  if (response.status >= 200 && response.status <= 299) {
    const data: Array<OpenWeatherApiByCity> = await response.json();
    const resultArr1 = data.filter((ele) => ele.state?.toLowerCase() === state);

    if (resultArr1.length > 0) {
      successSetter(resultArr1[0]);
      return;
    }

    const resultArr2 = data.filter((ele) => ele.country === 'US');
    if (resultArr2.length > 0) {
      successSetter(resultArr2[0]);
      return;
    }
  }

  if (errorSetter) {
    errorSetter(response.statusText);
  }
}

export async function getGeoCodeByZip(
  zipCode: string,
  successSetter: Dispatch<SetStateAction<OpenWeatherApiByZip>>,
  errorSetter?: Dispatch<SetStateAction<string>>,
): Promise<void> {
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
      successSetter(data);
    }
  } else if (errorSetter) {
    errorSetter(response.statusText);
  }
}
