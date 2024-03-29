import states from './utility/statesDictionary';

export {};

declare global {

  type CssBreakPointMeasure = 'max-width' | 'min-width' | 'min-height' | 'max-height';

  type DefaultSize = number;

  type GenerateImageSizesInputRest = [BreakPoints, ViewWidths]; // [number, number] tuple

  interface GeoCodeOptions {
    key?: string | undefined,
    version?: string,
    limit?: string,
  }

  type MatchesStates = typeof states[keyof typeof states] | null;

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

  type OpenWeatherThreeHourCall = {
    name: string,
    now: Date,
    sunrise: Date,
    sunset: Date,
    isNight: boolean,
    list: Array<WeatherVariables>
  };

  type OpenWeatherUnits = 'standard' | 'metric' | 'imperial';

  type ReactChildren = { children: React.ReactNode };

  type TimeString = '[0-9]:[0-9]{0,2}' | '[0-9][0-9]:[0-9]{0,1}';

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
    temp: number,
    feels_like?: number,
    temp_min?: number,
    temp_max?: number,
    pressure?: number,
    humidity?: number,
    sea_level?: number,
    grnd_level?: number,
    temp_kf?: number,
    description: string,
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


