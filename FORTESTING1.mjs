
const states = {
  ak: 'alaska',
  al: 'alabama',
  ar: 'arkansas',
  az: 'arizona',
  ca: 'california',
  co: 'colorado',
  ct: 'connecticut',
  dc: 'district of columbia',
  de: 'delaware',
  fl: 'florida',
  ga: 'georgia',
  hi: 'hawaii',
  ia: 'iowa',
  id: 'idaho',
  il: 'illinois',
  in: 'indiana',
  ks: 'kansas',
  ky: 'kentucky',
  la: 'louisiana',
  ma: 'massachusetts',
  md: 'maryland',
  me: 'maine',
  mi: 'michigan',
  mn: 'minnesota',
  mo: 'missouri',
  ms: 'mississippi',
  mt: 'montana',
  nc: 'north carolina',
  nd: 'north dakota',
  ne: 'nebraska',
  nh: 'new hampshire',
  nj: 'new jersey',
  nm: 'new mexico',
  nv: 'nevada',
  ny: 'new york',
  oh: 'ohio',
  ok: 'oklahoma',
  or: 'oregon',
  pa: 'pennsylvania',
  ri: 'rhode island',
  sc: 'south carolina',
  sd: 'south dakota',
  tn: 'tennessee',
  tx: 'texas',
  ut: 'utah',
  va: 'virginia',
  vt: 'vermont',
  wa: 'washington',
  wi: 'wisconsin',
  wv: 'west virginia',
  wy: 'wyoming',
};

function findStateAbbr(value) {
  const cleanedValue = value.trim().replace(/[,_.]/g, ' ');
  return Object.keys(states).find((key) => states[key] === cleanedValue) || null;
}

function stateToAbbr(input){
  const cleanedInput = input.toLowerCase().trim();
  const resultByKey = Object.keys(states).find((key) => key === cleanedInput);
  if (resultByKey) {
    return resultByKey;
  }
  return Object.keys(states).find((key) => states[key] === input);
}

const parseIntoCityState = (string) => {
  if (string.length === 0) {
    return [null, null];
  }
  const stringCln = string.trim().toLowerCase()
  const regex = /[,\-_=:>\s?]+/g; // possible string separators including empty space

  const splitArr = stringCln.split(regex)
    .map((str) => str.trim())
    .filter((str) => str !== '');
  if (splitArr.length === 1) return [splitArr[0], null];

  if (splitArr.length === 2) {
    const possibleStateAbbr = stateToAbbr(splitArr[1])
    if (possibleStateAbbr) {
      return splitArr
    }
    return [splitArr.join(' '), null]
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

const test1 = ' new york new york ';
const test2 = ' high point north carolina'
const test3 = 'high point nc'
const test4 = 'high point, new york'
const test5 = 'high point'
const test6 = 'high washington'.toUpperCase()
const test7 = '  SOME VERY LONG CITY NAME-new hampshire'
console.log(parseIntoCityState(test1));

export {};
