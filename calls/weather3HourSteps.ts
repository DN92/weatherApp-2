// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

import { OpenWeatherUnits } from '../@types'; // enum

export default async function getWeather3HourSteps(
  lat: string,
  lon: string,
  units: OpenWeatherUnits = OpenWeatherUnits.metric,
  count = 8, // number of list elements returned. 8 should give us 24hours worth
): Promise<Array<object> | undefined> {
  try {
    const key = process.env.NEXT_PUBLIC_OPENWHETHER_API;
    const domain = 'https://api.openweathermap.org';
    const path = `/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&cnt=${count}&appid=${key}`;
    const response = await fetch(domain + path, { next: { revalidate: 60 * 60 } });
    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      console.log(`showing results for ${data?.city?.name}`);
      const { list } = data;
      return list.map((ele: Record<'main', object> | Record<string, unknown>) => {
        if (ele.main) {
          return ele.main;
        }
        return [];
      });
    }
    // else
    throw Error('response outside 200 range, from function: getWeather3HourSteps');
  } catch (error: unknown) {
    console.log(error);
    return undefined; // this return statement is only here because ts is complaining and i don't see a better solution.
  }
}
