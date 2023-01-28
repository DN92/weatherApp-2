const states: Record<string, string > = {
  AK: 'alaska',
  AL: 'alabama',
  AR: 'arkansas',
  AZ: 'arizona',
  CA: 'california',
  CO: 'colorado',
  CT: 'connecticut',
  DC: 'district of columbia',
  DE: 'delaware',
  FL: 'florida',
  GA: 'georgia',
  HI: 'hawaii',
  IA: 'iowa',
  ID: 'idaho',
  IL: 'illinois',
  IN: 'indiana',
  KS: 'kansas',
  KY: 'kentucky',
  LA: 'louisiana',
  MA: 'massachusetts',
  MD: 'maryland',
  ME: 'maine',
  MI: 'michigan',
  MN: 'minnesota',
  MO: 'missouri',
  MS: 'mississippi',
  MT: 'montana',
  NC: 'north carolina',
  ND: 'north dakota',
  NE: 'Nebraska',
  NH: 'new hampshire',
  NJ: 'new jersey',
  NM: 'new mexico',
  NV: 'nevada',
  NY: 'new York',
  OH: 'ohio',
  OK: 'oklahoma',
  OR: 'oregon',
  PA: 'pennsylvania',
  RI: 'rhode island',
  SC: 'south carolina',
  SD: 'south dakota',
  TN: 'tennessee',
  TX: 'texas',
  UT: 'utah',
  VA: 'virginia',
  VT: 'vermont',
  WA: 'washington',
  WI: 'wisconsin',
  WV: 'west virginia',
  WY: 'wyoming',
};

Object.keys(states).forEach((key) => {
  states[key] = states[key].toLowerCase();
});

Object.freeze(states);

export function inputHasState(input: string): MatchesStates {
  return Object.values(states)
    .map((val) => val.toLowerCase())
    .find((val) => input.toLowerCase().includes(val)) ?? null;
}

export function findStateAbbr(value: string): string | null {
  const cleanedValue = value.replace(/[,_.]/g, ' ');
  return Object.keys(states).find((key) => states[key] === cleanedValue) || null;
}


export default states as Record<string, string>;
