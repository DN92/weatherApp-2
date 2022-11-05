export {};

declare global {
  export interface openWeatherApiByCity {
    name: string,
    local_names?: string
    lat: string,
    lon: string,
    country?: string,
    state?: string,
  }

  export interface openWeatherApiByZip {
    zip: string,
    name: string,
    lat: string,
    lon: string,
    country: string
  }

  export type openWeatherApiLocation = openWeatherApiByCity | openWeatherApiByZip

  export interface geoCodeOptions {
    key?: string | undefined,
    version?: string,
    limit?: string,
  }

  type children = {children: React.ReactNode}

}
