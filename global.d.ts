export {};

declare global {
  interface openWeatherApiByCity {
    name: string,
    local_names?: string
    lat: string,
    lon: string,
    country?: string,
    state?: string,
  }

  interface openWeatherApiByZip {
    zip: string,
    name: string,
    lat: string,
    lon: string,
    country: string
  }

  type openWeatherApiLocation = openWeatherApiByCity | openWeatherApiByZip

  interface geoCodeOptions {
    key?: string | undefined,
    version?: string,
    limit?: string,
  }

  type children = {children: React.ReactNode}

  interface weatherData {
    coord?: {lon: number, lat: number},
    weather?: Array<weatherSummary>,
    base?: string,
    main?: weatherVariables,
    visibility?: number,
    wind?: weatherWind,
    clouds?: weatherClouds,
    dt?: number,
    sys?: weatherSYS,
    timezone?: number,
    id?: number,
    name?: string,
    cod?: number,
  }

  interface weatherSummary {
    id?: number,
    main?: string,
    description?: string,
    icon?: string
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
    temp_kf?: number
  }

}

// end global declaration

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


