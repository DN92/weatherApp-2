export {};

declare global {

  type CssBreakPointMeasure = 'max-width' | 'min-width' | 'min-height' | 'max-height';

  type GenerateImageSizesInputRest = [BreakPoints, ViewWidths]; // [number, number] tuple

  interface OpenWeatherApiByCity {
    name: string,
    local_names?: string
    lat: string,
    lon: string,
    country?: string,
    state?: string,
  }

  interface OpenWeatherApiByZip {
    zip: string,
    name: string,
    lat: string,
    lon: string,
    country: string
  }

  type OpenWeatherApiLocation = OpenWeatherApiByCity | OpenWeatherApiByZip;

  interface GeoCodeOptions {
    key?: string | undefined,
    version?: string,
    limit?: string,
  }

  type ReactChildren = { children: React.ReactNode };

  interface WeatherData {
    coord?: { lon: number, lat: number },
    weather?: Array<WeatherSummary>,
    base?: string,
    main?: WeatherVariables,
    visibility?: number,
    wind?: WeatherWind,
    clouds?: WeatherClouds,
    dt?: number,
    sys?: WeatherSYS,
    timezone?: number,
    id?: number,
    name?: string,
    cod?: number,
  }

  interface WeatherSummary {
    id?: number,
    main?: string,
    description?: string,
    icon?: string
  }

  interface WeatherVariables {
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

type BreakPoints = number;
type ViewWidths = number;

interface WeatherClouds {
  all?: number,
}

interface WeatherSYS {
  country?: string,
  sunrise?: number,
  sunset?: number,
}

interface WeatherWind {
  speed?: number,
  deg?: number,
  gust?: number,
}


