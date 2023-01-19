'use client';

import { Paper, TextInput, Button, Text, Group, Select } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import states from '../../utility/statesDictionary';
import useLocationFromGeoApi from '../../hooks/useLocationFromGeoApi';

const stateSelectorData = Object.keys(states)
  .concat('')
  .concat('')
  .sort()
  .map((state) => ({ value: state, label: state, key: state + Math.floor(Math.random() * 10000) }));

function Home() {
  const history = useRouter();
  const [userZip, setUserZip] = useState<string>('');
  const [userCity, setUserCity] = useState('');
  const [userState, setUserState] = useState('');
  const [enableZip, setEnableZip] = useState(true);
  const [validZip, setValidZip] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState('');
  const [formError, setFormError] = useState('');
  const [lon, lat, getCoordinates] = useLocationFromGeoApi(setFetchError, setFormError);

  function validateZipCode() {
    return (userZip.length === 5 && /^(\d+,)*(\d+)$/.test(userZip) && !userZip.includes(' '));
  }

  function handleSubmitWithZip(): void {
    if (!validateZipCode()) {
      setFormError('Invalid ZipCode');
    } else {
      getCoordinates({ zipCode: userZip, city: userCity, state: userState });
    }
  }

  function handleSubmitWithCity() {

  }

  function handleSubmit() {
    if (enableZip) {
      handleSubmitWithZip();
    } else {
      handleSubmitWithCity();
    }
  }

  useEffect(() => {
    if (!!lon && !!lat) {
      history.push(`/myWeather/?lat=${lat}&lon=${lon}`);
    }
  }, [lon, lat, history]);


  return (

    <main
      className="TEST"
    >
      <Paper withBorder p="lg">
        <Group position="apart">
          <Text size="xl" weight={500}>
            Get the Weather!
          </Text>
          <Group position="apart" mb="xs" />
          <Text size="lg">
            Select Desired Location
          </Text>
        </Group>


        {
          enableZip && (
            <Group position="apart">
              <TextInput
                label="Enter a 5 digit zip code"
                placeholder="Zip code"
                onChange={(event) => setUserZip(event.target.value)}
                value={userZip}
              />
            </Group>
          )
        }
        <div style={{
          minHeight: '1rem',
        }}
        />
        <Group>
          <Button
            variant="gradient"
            size="md"
            onClick={() => {
              handleSubmit();
            }}
          >
            Get My Weather
          </Button>
        </Group>
        {
          !enableZip && (
            <Group>
              <Group position="apart">
                <TextInput
                  label="Location"
                  placeholder="city"
                  onChange={(event) => setUserCity(event.target.value)}
                  value={userCity}
                />
              </Group>
              <Group position="apart">
                <Select
                  label="select-state"
                  placeholder="select state"
                  data={stateSelectorData}
                  onChange={(event) => {
                    if (event) {
                      setUserState(event);
                    }
                  }}
                />
              </Group>
            </Group>
          )
        }
        <div style={{
          minHeight: '1.25rem',
        }}
        />
        <Button
          variant="gradient"
          size="md"
          onClick={() => {
            setEnableZip((prev) => !prev);
          }}
        >
          {enableZip ? 'Use City and State' : 'Use Zip Code'}
        </Button>

      </Paper>
    </main>
  );
}

export default Home;
