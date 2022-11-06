import getWeather from '../../calls/weather'

interface inputProps {
  lon: string,
  lat: string,
}
const MyWeather = async ({lon, lat}: inputProps) => {

  const variable = await getWeather(lon='12', lat='0')

  return (
    <div>
      {variable?.base}
      <p>{variable?.clouds?.all}</p>
      <p></p>
      <p></p>
    </div>
  )
}

export default MyWeather
