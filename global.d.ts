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

  interface weatherData {
    coord?: {lon: number, lat: number},
    weather?: summary,
    base?: string,
    main?: weatherVariables,
    visibility?: number,
    wind?: weatherWind,
    clouds?: weatherClouds,
    dt?: number,
    sys?: weatherSYS,
    timezone?: number,
    id?: number,
    name?: 'string',
    cod?: number,
  }
}

interface weatherSYS {
  country?: string,
  sunrise?: number,
  sunset?: number,
}

interface weatherClouds {
  all?: number,
}

interface weatherWind {
  speed?: number,
  deg?: number,
  gust?: number,
}

interface weatherVariables {
  temp?: number,
  feels_like?: number,
  temp_min?: number,
  temp_max?: number,
  pressure?: number,
  humidity?: number,
  sea_level?: number,
  grnd_level?: number,
}

interface summary {
  id?: number,
  main?: string,
  description?: string,
  icon?: string
}
