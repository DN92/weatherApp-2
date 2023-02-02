export const dayIconDic: Record<string, string> = {
  cloud: 'wi-day-cloudy',
  // cloudyGusts: 'wi-day-cloudy-gusts',
  // cloudyHigh: 'wi-day-cloudy-high',
  // cloudyWindy: 'wi-day-cloudy-windy',
  fog: 'wi-day-fog',
  hail: 'wi-day-hail',
  haze: 'wi-day-haze',
  hot: 'wi-hot',
  lightning: 'wi-day-lightning',
  // lightWind: 'wi-day-light-wind',
  rain: 'wi-day-rain',
  // rainMix: 'wi-day-rain-mix',
  // rainWind: 'wi-day-rain-wind',
  shower: 'wi-day-showers',
  sleet: 'wi-day-sleet',
  sleetStorm: 'wi-day-sleet-storm',
  snow: 'wi-day-snow',
  // snowThunderstorm: 'wi-day-snow-thunderstorm',
  // snowWind: 'wi-day-snow-wind',
  solarEclipse: 'wi-solar-eclipse',
  sprinkle: 'wi-day-sprinkle',
  stormShower: 'wi-day-storm-showers',
  sunny: 'wi-day-sunny',
  overcast: 'wi-day-sunny-overcast',
  thunderstorm: 'wi-day-thunderstorm',
  windy: 'wi-day-windy',
};

export const nightIconDic: Record<string, string> = {
  clear: 'wi-night-clear',
  cloud: 'wi-night-cloudy',
  cloudyGust: 'wi-night-cloudy-gusts',
  cloudyWind: 'wi-night-cloudy-windy',
  gusts: 'wi-night-alt-cloudy-gusts',
  fog: 'wi-night-fog',
  hail: 'wi-night-alt-hail',
  lightning: 'wi-night-alt-lightning',
  nightAltCloud: 'wi-night-alt-cloudy',
  rain: 'wi-night-alt-rain',
  rainMix: 'wi-night-alt-rain-mix',
  rainWind: 'wi-night-alt-rain-wind',
  shower: 'wi-night-alt-showers',
  sleet: 'wi-night-alt-sleet',
  sleetStorm: 'wi-night-alt-sleet-storm',
  snow: 'wi-night-alt-snow',
  snowThunderstorm: 'wi-night-alt-snow-thunderstorm',
  snowWind: 'wi-night-alt-snow-wind',
  sprinkle: 'wi-night-alt-sprinkle',
  stormShower: 'wi-night-alt-storm-showers',
  thunderstorm: 'wi-night-alt-thunderstorm',
  windy: 'wi-night-alt-cloudy-windy',
};

const dayIconDicKeys = Object.keys(dayIconDic);
const nightIconDicKeys = Object.keys(nightIconDic);

export function getIconFromDesc(description: string, isNight: boolean = false): string {
  let clnString: string = description.trim().toLowerCase();
  if (clnString.length < 2) return '';
  if (isNight) {
    if (clnString.includes('clear')) {
      return nightIconDic.sunny;
    }
    const classNameResult = nightIconDicKeys.find((ele) => ele.toLowerCase().includes(clnString)) ?? '';
    if (classNameResult) return nightIconDic[classNameResult];
  }
  return clnString.includes('clear') ?
    dayIconDic.sunny
    :
    dayIconDic[dayIconDicKeys.find((ele) => clnString.includes(ele.toLowerCase())) ?? ''] ?? '';
}
