'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import states, { inputHasState, findStateAbbr, stateToAbbr } from '../../utility/statesDictionary';
import useLocationFromGeoApi from '../../hooks/useLocationFromGeoApi';
import styles from './styles.module.css';
import magnifyingGlass from '../../images/magGlass.webp';

// TODO :: MAKE SURE SUBMIT CAN HANDLE BAD REQUESTS IE: VALID BUT NON-EXISTANT ZIP CODES

type UserInputType = 'zipCode' | 'city' | '';

const DELAY_BUFFER: string = 'delay buffer';

const statesKeys = Object.keys(states);

function Home(): React.ReactElement {
  const history = useRouter();
  const [userZip, setUserZip] = useState<string>('');
  const [userCity, setUserCity] = useState<string>('');
  const [userState, setUserState] = useState<string>('');
  const [enableZip, setEnableZip] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [lon, lat, getCoordinates] = useLocationFromGeoApi(setFetchError, setFormError);

  const [userInput, setUserInput] = useState('');
  const [submitBuffer, setSubmitBuffer] = useState<boolean>(false);

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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    if (submitBuffer) {
      console.log('please wait a bit before submitting again');
      setFormError(DELAY_BUFFER);
      return;
    }

    setSubmitBuffer(true);

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

    const parseIntoCityState = (string: string): ([string, string | null]) | null => {
      if (string.length === 0) {
        return null;
      }
      const arrayedString = string.split(',').map((str) => str.trim());
      if (arrayedString.length > 2) {
        return null;
      }
      if (arrayedString.length === 2) {
        return arrayedString as [string, string];
      }
      if (arrayedString.length === 1) {
        return [arrayedString[0], null];
      }
      return null;
    };

    function validateZipCode(zip: string): boolean {
      return /^[0-9]{5}$/.test(zip);
    }
    // <end closure functions>

    event.preventDefault();
    switch (deriveUserInput(userInput)) {
      case 'city': {
        let city;
        let state;
        [city, state] = parseIntoCityState(userInput);
        if (city && state) {
          const abbrdState = stateToAbbr(state);
          if (abbrdState) {
            getCoordinates({ city, state: abbrdState });
          }
        } else if (city) {
          getCoordinates({ city });
        } else {
          setFormError('case city errored');
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

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (formError === DELAY_BUFFER) {
      setFormError('');
    }
    if (submitBuffer) {
      const buffer = setTimeout(() => {
        setSubmitBuffer(false);
      }, 1500);
      return clearTimeout(buffer);
    }
  }, [submitBuffer]); // formError is not applied to dep array since that would cause the timer error to clear instantly which is not desired behavior.


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
        </main>
      </div>
    </div>
  );
}

export default Home;
