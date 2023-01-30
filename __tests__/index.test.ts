import { expect, jest, test } from '@jest/globals';
import homepage from '../app/home/page';

function myTest(num1, num2) {
  return num1 + num2;
}

describe('myTest', () => {
  it('adds two numbers', () => {
    expect(myTest(1, 2)).toBe(3);
  });
});

export default {};
