const states: Record<string, string > = {
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


Object.keys(states).forEach((key) => {
  states[key] = states[key].toLowerCase();
});

Object.freeze(states);

export function inputHasState(input: string): MatchesStates {
  let state: string | null = Object.values(states)
    .map((val) => val.toLowerCase())
    .find((val) => input.toLowerCase().includes(val)) ?? null;
  if (!state) {
    state = Object.keys(states)
      .map((key) => key.toLowerCase())
      .find((key) => input.toLowerCase().includes(key)) ?? null;
  }
  return state;
}

export function stateToAbbr(input: string): string | undefined {
  const cleanedInput = input.toLowerCase().trim();
  const resultByKey = Object.keys(states).find((key) => key === cleanedInput);
  if (resultByKey) {
    return resultByKey;
  }
  return Object.keys(states).find((key) => states[key] === input);
}

export function findStateAbbr(value: string): string | null {
  const cleanedValue = value.replace(/[,_.]/g, ' ');
  return Object.keys(states).find((key) => states[key] === cleanedValue) || null;
}


export default states as Record<string, string>;
