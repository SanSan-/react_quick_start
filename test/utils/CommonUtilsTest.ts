import { isEmpty, isEmptyArray, isEmptyObject, isIE, isMapOrList } from '~utils/CommonUtils';

describe('function isMapOrList', () => {

  it('should return false if input is not Immutable.Map or Immutable.List', () => {
    expect(isMapOrList('1')).toEqual(false);
    expect(isMapOrList(null)).toEqual(false);
    /* eslint no-undefined: 0 */
    expect(isMapOrList(undefined)).toEqual(false);
    expect(isMapOrList({})).toEqual(false);
    expect(isMapOrList([])).toEqual(false);
    expect(isMapOrList({ prop1: '1', prop2: '2' })).toEqual(false);
    expect(isMapOrList(['1', '2'])).toEqual(false);
  });

});

describe('function isEmptyArray', () => {

  it('should return true', () => {
    expect(isEmptyArray(null)).toEqual(true);
    /* eslint no-undefined: 0 */
    expect(isEmptyArray(undefined)).toEqual(true);
    expect(isEmptyArray(1)).toEqual(true);
    expect(isEmptyArray('1')).toEqual(true);
    expect(isEmptyArray({})).toEqual(true);
    expect(isEmptyArray([])).toEqual(true);
    expect(isEmptyArray({ prop1: '1', prop2: '2' })).toEqual(true);
  });

  it('should return false', () => {
    expect(isEmptyArray([1])).toEqual(false);
    expect(isEmptyArray(['1', '2'])).toEqual(false);
  });

});

describe('function isEmptyObject', () => {

  it('should return true', () => {
    expect(isEmptyObject(null)).toEqual(true);
    /* eslint no-undefined: 0 */
    expect(isEmptyObject(undefined)).toEqual(true);
    expect(isEmptyObject({})).toEqual(true);
  });

  it('should return false', () => {
    expect(isEmptyObject(1)).toEqual(false);
    expect(isEmptyObject('1')).toEqual(false);
    expect(isEmptyObject({ prop1: '1', prop2: '2' })).toEqual(false);
    expect(isEmptyObject([])).toEqual(false);
  });

});

describe('function isEmpty', () => {

  it('should return true', () => {
    expect(isEmpty(null)).toEqual(true);
    /* eslint no-undefined: 0 */
    expect(isEmpty(undefined)).toEqual(true);
    expect(isEmpty('')).toEqual(true);
  });

  it('should return false', () => {
    expect(isEmpty(1)).toEqual(false);
    expect(isEmpty('1')).toEqual(false);
  });

});

describe('function isIE', () => {

  it('should return false', () => {
    expect(isIE()).toEqual(false);
  });

});
