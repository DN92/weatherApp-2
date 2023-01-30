export default async function getTimeZone(lat: string, lon: string) {
  // http://api.geonames.org/timezoneJSON?lat=47.01&lng=10.2&username=demo
  if (!(lat && lon && process.env.GEONAMES_API_USERNAME)) {
    throw Error(`getTimeZone failed:: lat, lon, username:: ${lat}${lon}${process.env.GEONAMES_API_USERNAME}`);
  }
  const domain = ' http://api.geonames.org';
  const path = `timezoneJSON?lat=${lat}&lng=${lon}&username=${process.env.GEONAMES_API_USERNAME}`;
  const response = await fetch(domain + path, { next: { revalidate: 60 * 60 } });
  return response;
}
