'use client';

import { Paper, TextInput, Button, Text, Group, Select } from '@mantine/core';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import states from '../../utility/statesDictionary';
import useLocationFromGeoApi from '../../hooks/useLocationFromGeoApi';

const statesKeys = Object.keys(states);
const stateFieldBuffer: [string, string] = ['', ''];

const stateSelectorData = statesKeys
  .concat('')
  .concat('')
  .sort()
  .map((state) => ({ value: state, label: state, key: state + Math.floor(Math.random() * 100000) }));

function Home(): React.ReactElement {
  const history = useRouter();
  const [userZip, setUserZip] = useState<string>('');
  const [userCity, setUserCity] = useState('');
  const [userState, setUserState] = useState('');
  const [userStateAbb, setUserStateAbb] = useState('');
  const [enableZip, setEnableZip] = useState(true);
  const [validZip, setValidZip] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState('');
  const [formError, setFormError] = useState('');
  const [lon, lat, getCoordinates] = useLocationFromGeoApi(setFetchError, setFormError);

  function validateZipCode(): boolean {
    return (userZip.length === 5 && /^(\d+,)*(\d+)$/.test(userZip) && !userZip.includes(' '));
  }

  function resetCityState(): void {
    setUserCity('');
    setUserState('');
  }

  function resetZip(): void {
    setUserZip('');
    setValidZip(false);
  }

  function resetForm(): void {
    setUserZip('');
    setUserCity('');
    setUserState('');
    setValidZip(false);
    setFormError('');
  }

  const keyDownBuffer = useCallback(
    (event: React.KeyboardEvent) => {
      return () => {
        const input = Number(event.keyCode);
        if ((input >= 65 && input <= 90) || (input >= 97 && input <= 122)) {
          stateFieldBuffer[0] = stateFieldBuffer[1]; // eslint-disable-line
          stateFieldBuffer[1] = event.key;
          console.log(stateFieldBuffer.join('').toUpperCase());
          const stateToCheck = stateFieldBuffer.join('').toUpperCase();
          if (states[stateToCheck]) {
            setUserStateAbb(stateToCheck);
          } else {
            setUserStateAbb(statesKeys.find((ele) => ele[0] === stateToCheck[1]) ?? '');
          }
        }
      };
    },
    [],
  );


  function handleSubmitWithZip(): void {
    resetCityState();
    if (!validateZipCode()) {
      setFormError('Invalid ZipCode');
    } else {
      getCoordinates({ zipCode: userZip });
    }
  }

  function handleSubmitWithCity(): void {
    resetZip();
    if (userCity && /^[a-zA-Z\s]+$/.test(userCity) && userState) {
      getCoordinates({ city: userCity, state: userState });
    }
  }

  function handleSubmit(): void {
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
                onChange={(event): void => setUserZip(event.target.value)}
                value={userZip}
              />
            </Group>
          )
        }
        <div style={{
          minHeight: '1rem',
        }}
        />

        {
          !enableZip && (
            <Group>
              <Group position="apart">
                <TextInput
                  label="Location"
                  placeholder="city"
                  onChange={(event): void => setUserCity(event.target.value)}
                  value={userCity}
                />
              </Group>
              <Group position="apart">
                <Select
                  label="select-state"
                  placeholder="select state"
                  data={stateSelectorData}
                  value={userStateAbb}
                  onKeyDown={(event): void => {
                    keyDownBuffer(event)();
                  }}
                  onChange={(event): void => {
                    if (event) {
                      setUserState(event);
                    }
                  }}
                />
              </Group>
            </Group>
          )
        }

        <Group>
          <Button
            variant="gradient"
            size="md"
            onClick={(): void => {
              handleSubmit();
            }}
          >
            Get My Weather
          </Button>
        </Group>

        <div style={{
          minHeight: '1.25rem',
        }}
        />
        <Button
          variant="gradient"
          size="md"
          onClick={(): void => {
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
