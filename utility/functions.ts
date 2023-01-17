export function isNumeric(string: string, withSpace = true): boolean {
  const numbersWithSpace = '1234567890 '; //  contains empty space character
  const numbersWithoutSpace = '1234567890';
  return string.split('').every((char) => (withSpace ? numbersWithSpace : numbersWithoutSpace).includes(char));
}

export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    },
  );
}
