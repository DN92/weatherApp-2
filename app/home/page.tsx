'use client'

import { Paper, TextInput, Button, Text, Group, Select } from "@mantine/core"
import { useState, useEffect} from 'react'
import states from '../../utility/statesDictionary'
import useLocationFromGeoApi from '../../hooks/useLocationFromGeoApi'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
const stateSelectorData = Object.keys(states)
  .concat('')
  .concat('')
  .sort()
  .map(state => ({value: state, label: state, key: state+Math.floor(Math.random() * 10000)}))

const Home = () => {
  const history = useRouter()
  const [userZip, setUserZip] = useState('')
  const [userCity, setUserCity] = useState('')
  const [userState, setUserState] = useState('')
  const [fetchError, setFetchError] = useState('')
  const [formError, setFormError] = useState('')
  const [lon, lat, getCoordinates] = useLocationFromGeoApi(setFetchError, setFormError)

  // useEffect(() => {
  //   console.log('lon lat :: ', lon, lat)
  // }, [lon, lat])

  useEffect(() => {
    if(!!lon && !!lat) {
      history.push(`/myWeather/?lat=${lat}&lon=${lon}`)
    }
  }, [lon, lat, history])


  return (

      <main
        className='TEST'
      >
        <Paper withBorder p='lg'>
            <Group position='apart'>
              <Text size='xl' weight={500}>
                Get the Weather!
              </Text>
            </Group>
            <Group position='apart' mb='xs'>
              <Text size='lg'>
                Enter a City and get the weather
              </Text>
            </Group>
            <Group>
              <Group position='apart'>
                <TextInput
                  label="Location"
                  placeholder='city'
                  onChange={ (event) => setUserCity(event.target.value) }
                  value={userCity}
                />
              </Group>
              <Group position='apart'>
                <Select
                  label='select-state'
                  placeholder='select state'
                  data={stateSelectorData}
                  onChange={event => {
                    if(event) {
                      setUserState(event)
                    }
                  }}
                />
              </Group>
            </Group>
            <Group position='apart'>
                <TextInput
                  label="zipCode"
                  placeholder='5 digit zip code'
                  onChange={ (event) => setUserZip(event.target.value) }
                  value={userZip}
                />
              </Group>
            <Group>
              <Button variant='gradient' size='md' onClick={() => {
                getCoordinates({zipCode: userZip, city: userCity, state: userState})
              }}>
                Get lon lat
              </Button>
            </Group>
        </Paper>
      </main>
  )
}

export default Home
