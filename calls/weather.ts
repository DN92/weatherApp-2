// https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}

export default async function getWeather(lat: string , lon: string) {
  const domain =  'https://api.openweathermap.org/'
  const key = process.env.NEXT_PUBLIC_OPENWHETHER_API
  const path = `data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`

  const response = await fetch(domain+path)
  if (response.status >= 200 && response.status <= 299) {
    const data = await response.json()
    console.log('weatherData:: ', data)
    return data
  } else {

  }
}
