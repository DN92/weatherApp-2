'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import states, { inputHasState, findStateAbbr } from '../../utility/statesDictionary';
import useLocationFromGeoApi from '../../hooks/useLocationFromGeoApi';
import styles from './styles.module.css';
import magnifyingGlass from '../../images/magGlass.webp';

// TODO :: MAKE SURE SUBMIT CAN HANDLE BAD REQUESTS IE: VALID BUT NON-EXISTANT ZIP CODES

type UserInputType = 'zipCode' | 'city' | '';

const statesKeys = Object.keys(states);
const stateFieldBuffer: [string, string] = ['', ''];

function Home(): React.ReactElement {
  const history = useRouter();
  const [userZip, setUserZip] = useState<string>('');
  const [userCity, setUserCity] = useState<string>('');
  const [userState, setUserState] = useState<string>('');
  const [userStateAbb, setUserStateAbb] = useState<string>('');
  const [enableZip, setEnableZip] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [lon, lat, getCoordinates] = useLocationFromGeoApi(setFetchError, setFormError);

  const [userInput, setUserInput] = useState('');

  function resetCityState(): void {
    setUserCity('');
    setUserState('');
  }

  function resetZip(): void {
    setUserZip('');
  }

  function resetForm(): void {
    setUserZip('');
    setUserCity('');
    setUserState('');
    setFormError('');
  }

  const keyDownBuffer = useCallback(
    (event: React.KeyboardEvent) => {
      return () => {
        const input = Number(event.keyCode);
        if ((input >= 65 && input <= 90) || (input >= 97 && input <= 122)) {
          stateFieldBuffer[0] = stateFieldBuffer[1]; // eslint-disable-line
          stateFieldBuffer[1] = event.key;
          const stateToCheck = stateFieldBuffer.join('').toUpperCase();
          if (states[stateToCheck]) {
            setUserStateAbb(stateToCheck);
          } else {
            const searchAbbsByFirstLetter = statesKeys.find((ele) => ele[0] === stateToCheck[1]);
            if (searchAbbsByFirstLetter) setUserStateAbb(searchAbbsByFirstLetter);
          }
        }
      };
    },
    [],
  );

  function handleZipCodeInput(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    console.log(value);
    if (value.length <= 5 && (/^\d+$/.test(value) || value === '')) {
      setUserZip(value);
    } else if (!/^\d+$/.test(userZip)) { //  additional safeguard against non-numeric values entering this field
      setUserZip('');
    }
  }

  function handleSubmitWithZip(): void {
    resetCityState();
    getCoordinates({ zipCode: userZip });
  }

  function handleSubmitWithCity(): void {
    resetZip();
    if (userCity && /^[a-zA-Z\s]+$/.test(userCity) && userState) {
      getCoordinates({ city: userCity, state: userState });
    }
  }

  // function handleSubmit(): void {
  //   if (enableZip) {
  //     handleSubmitWithZip();
  //   } else {
  //     handleSubmitWithCity();
  //   }
  // }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    // closure functions
    function deriveUserInput(input: string): UserInputType {
      const onlyLetters = /^[A-Za-z\s,.]*$/.test(input.trim());
      const onlyNumbers = /^[0-9]*$/.test(input.trim());
      if (onlyLetters) {
        return 'city';
      }
      if (onlyNumbers) {
        return 'zipCode';
      }
      return '';
    }

    function validateZipCode(zip: string): boolean {
      return /^[0-9]{5}$/.test(zip);
    }
    // <end closure functions>

    event.preventDefault();
    switch (deriveUserInput(userInput)) {
      case 'city': {
        const stateInInput = inputHasState(userInput);
        console.log('stateInINput": ', stateInInput);
        if (stateInInput) {
          const state = findStateAbbr(stateInInput);
          const regex = /[^a-zA-Z0-9 ]/g;
          const city = userInput.replace(stateInInput, '').replace(regex, '').trim();
          if (!state) {
            setFormError('bad state value');
            break;
          }
          console.log('city and state', city || 'no city', state);
          getCoordinates({ city, state });
        } else {
          getCoordinates({ city: userInput });
        }
        break;
      }
      case 'zipCode': {
        if (!validateZipCode(userInput)) {
          setFormError('FORM ERROR: ZIPCODE PROBLEM');
          break;
        }
        getCoordinates({ zipCode: userInput });
        break;
      }
      default:
        setFormError('FORM ERROR DETECTED');
        break;
    }
  }

  useEffect(() => { console.log('HERE', lon, lat); }, [lon, lat]);

  useEffect(() => {
    if (!!lon && !!lat) {
      history.push(`/myWeather/?lat=${lat}&lon=${lon}`);
    }
  }, [lon, lat, history]);

  //  clear form error on form change
  useEffect(() => {
    setFormError('');
  }, [userCity, userState, userZip, enableZip]);


  // JSX BELOW THIS LINE--------------------------------------
  return (
    <div className={styles.component_wrapper}>
      <div className={styles.component}>
        <button
          className={styles.use_city_and_state_button}
          type="button"
          aria-label={enableZip ? 'switch form to city and state' : 'switch form to use zip code'}
          onClick={(): void => {
            setEnableZip((prev) => !prev);
          }}
        >
          {enableZip ? 'Use City and State' : 'Use Zip Code'}
        </button>
        <main className={styles.main}>
          <div className={styles.title}>
            <h4>Get Your Weather</h4>
          </div>
          <form
            id="search_bar_wrapper"
            className={styles.search_bar_wrapper}
            onSubmit={handleSubmit}
          >
            <input
              className={styles.search_bar_input}
              type="text"
              placeholder="Search"
              value={userInput}
              onChange={(e): void => {
                setUserInput(e.target.value);
              }}
            />
            <button
              type="submit"
              form="search_bar_wrapper"
              className={[styles.magGlass_btn, 'btn_nostyle'].join(' ')}
            >
              <Image
                className={styles.magGlass}
                src={magnifyingGlass}
                alt="magnifying glass submit button"
                fill
              />
            </button>
          </form>

          <div className={formError ? '' : 'invisible'}>
            <p className={[styles.formError, 'truncate_text', 'error'].join(' ')}>
              *&nbsp;&nbsp;
              {formError}
            </p>
          </div>

          {enableZip ?
            (
              <div>
                <label htmlFor="zip-code-text-input-id" className={styles.zip_code_text_input_label}>
                  <input
                    id="zip-code-text-input-id"
                    className={styles.zip_code_text_input}
                    type="text"
                    placeholder="Zip code"
                    onChange={(event):void => handleZipCodeInput(event)}
                    value={userZip}
                  />
                </label>
              </div>
            )
            :
            (
              <div>
                <div>
                  <label htmlFor="city-text-input">
                    Location
                    <input
                      id="city-text-input"
                      type="text"
                      placeholder="city"
                      onChange={(event): void => setUserCity(event.target.value)}
                      value={userCity}
                    />
                  </label>
                  <div>
                    <label htmlFor="select-state-input">
                      Select State
                      {/* attempted to keep select menu open. online search recommended 'multiple' attribute but this forces value prop to be an array. */}
                      {/* TODO: find a way to control the open/close */}
                      <select
                        id="select-state-input"
                        aria-labelledby="select-state-input"
                        placeholder="select state"
                        value={userStateAbb}
                        onKeyDown={(event): void => {
                          keyDownBuffer(event)();
                        }}
                        onChange={(event): void => {
                          if (event) {
                            console.log(event.target.value);
                            setUserStateAbb(event.target.value);
                          }
                        }}
                      >
                        <option
                          value=""
                          label=""
                          aria-label="none"
                        />
                        {statesKeys.map((state, idx) => (
                          <option
                            key={idx.toString() + state}
                            value={state}
                          >
                            {state}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              </div>
            )}
          <div className={styles.get_my_weather_button_wrapper}>
            <button
              className={styles.get_my_weather_button}
              type="button"
              aria-label="submit form"
              onClick={(e): void => {
                handleSubmit(e);
              }}
            >
              Get Your Weather
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
