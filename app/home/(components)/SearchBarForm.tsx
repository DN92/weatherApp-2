'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const DELAY_BUFFER: string = 'delay buffer';
type UserInputPossibles = 'zipCode' | 'city' | '';

type InputProps = {

};


function SearchBarFrom({}: InputProps): React.ReactElement {
  const [submitBuffer, setSubmitBuffer] = useState<boolean>(false);
  const [userInput, setUserInput] = useState('');
  const [formError, setFormError] = useState<string>('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    if (!userInput) return;

    if (submitBuffer) {
      console.log('please wait a bit before submitting again');
      setFormError(DELAY_BUFFER);
      return;
    }

    setSubmitBuffer(true);

    // closure functions
    function deriveUserInput(input: string): UserInputPossibles {
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

    const parseIntoCityState = (string: string): [string | null, string | null] => {
      if (string.length === 0) {
        return [null, null];
      }
      const stringCln = string.trim().toLowerCase();
      const regex = /[,\-_=:>\s?]+/g; // possible string separators including empty space

      const splitArr = stringCln.split(regex)
        .map((str) => str.trim())
        .filter((str) => str !== '');
      if (splitArr.length === 1) return [splitArr[0], null];

      if (splitArr.length === 2) {
        const possibleStateAbbr = stateToAbbr(splitArr[1]);
        if (possibleStateAbbr) {
          return splitArr as [string, string];
        }
        return [splitArr.join(' '), null];
      }

      for (let i = 1; i <= 2; i++) {
        const idxToTest = splitArr.length - i;
        const possibleCity = splitArr.slice(0, idxToTest).join(' ');
        const possibleState = splitArr.slice(idxToTest).join(' ');
        const possibleStateAbbr = stateToAbbr(possibleState);
        if (possibleStateAbbr) {
          return [possibleCity, possibleStateAbbr];
        }
      }
      //  no match found
      return [null, null];
    };

    function validateZipCode(zip: string): boolean {
      return /^[0-9]{5}$/.test(zip);
    }
    // <end closure functions>

    event.preventDefault();
    switch (deriveUserInput(userInput)) {
      case 'city': {
        const [city, stateAbbr] = parseIntoCityState(userInput);
        if (city && stateAbbr) {
          getCoordinates({ city: city, state: stateAbbr });
        } else if (city) {
          getCoordinates({ city: city });
        } else {
          setFormError('parseIntoCityState Failed');
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
        setFormError('Something went wrong');
        break;
    }
  }

  return (
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
  );
}

export default SearchBarFrom;
