export function isNumeric(string: string, withSpace: boolean = true): boolean {
  const numbersWithSpace = '1234567890 '  //  contains empty space character
  const numbersWithoutSpace = '1234567890'
  return string.split('').every(char => (withSpace ? numbersWithSpace : numbersWithoutSpace).includes(char))
}
