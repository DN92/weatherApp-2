export function isNumeric(string: string, withSpace = true): boolean {
  const numbersWithSpace = '1234567890 '; //  contains empty space character
  const numbersWithoutSpace = '1234567890';
  return string.split('').every((char) => (withSpace ? numbersWithSpace : numbersWithoutSpace).includes(char));
}

export function formatMillisecondsToTime(milliseconds: number): TimeString {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
  const formattedHours = (`0${hours}`).slice(-2);
  const formattedMinutes = (`0${minutes}`).slice(-2);
  return `${formattedHours}:${formattedMinutes}` as TimeString;
}

export function toTitleCase(str: string): string {
  return str.replaceAll(
    /\w\S*/g,
    (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    },
  );
}

export function militaryTimeToNumber(time: TimeString): number {
  return parseInt(time.replaceAll(':', ''), 10);
}

export function millisecondsToMilitaryTime(milliseconds: number): number {
  return militaryTimeToNumber(formatMillisecondsToTime(milliseconds));
}
