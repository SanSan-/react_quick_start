import { isEmpty, isEmptyArray, isEmptyObject, isIE } from '~utils/CommonUtils';

describe('function isEmptyArray', () => {

  test('should return true', () => {
    expect(isEmptyArray(null)).toBeTruthy();
    /* eslint no-undefined: 0 */
    expect(isEmptyArray(undefined)).toBeTruthy();
    expect(isEmptyArray(1)).toBeTruthy();
    expect(isEmptyArray('1')).toBeTruthy();
    expect(isEmptyArray({})).toBeTruthy();
    expect(isEmptyArray([])).toBeTruthy();
    expect(isEmptyArray({ prop1: '1', prop2: '2' })).toBeTruthy();
  });

  test('should return false', () => {
    expect(isEmptyArray([1])).toBeFalsy();
    expect(isEmptyArray(['1', '2'])).toBeFalsy();
  });

});

describe('function isEmptyObject', () => {
  test('should return true', () => {
    expect(isEmptyObject(null)).toBeTruthy();
    /* eslint no-undefined: 0 */
    expect(isEmptyObject(undefined)).toBeTruthy();
    expect(isEmptyObject({})).toBeTruthy();
  });
  test('should return false', () => {
    expect(isEmptyObject(1)).toBeFalsy();
    expect(isEmptyObject('1')).toBeFalsy();
    expect(isEmptyObject({ prop1: '1', prop2: '2' })).toBeFalsy();
    expect(isEmptyObject([])).toBeFalsy();
  });

});

describe('function isEmpty', () => {
  test('should return true', () => {
    expect(isEmpty(null)).toBeTruthy();
    /* eslint no-undefined: 0 */
    expect(isEmpty(undefined)).toBeTruthy();
    expect(isEmpty('')).toBeTruthy();
  });
  test('should return false', () => {
    expect(isEmpty(1)).toBeFalsy();
    expect(isEmpty('1')).toBeFalsy();
  });

});

describe('function isIE', () => {
  test('should return false', () => {
    expect(isIE()).toBeFalsy();
  });

});
