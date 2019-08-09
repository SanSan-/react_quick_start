/* eslint-disable no-undef */
import * as Immutable from 'immutable';
import { isEmpty, isEmptyObject, isEmptyArray, isMapOrList, isValidImmutable, isIE } from '~utils/CommonUtils';

describe('function isMapOrList', () => {

  it('should return true if input is Immutable.Map or Immutable.List', () => {
    expect(isMapOrList(Immutable.fromJS(['1', '2']))).toEqual(true);
    expect(isMapOrList(Immutable.fromJS([]))).toEqual(true);
    expect(isMapOrList(Immutable.fromJS({ prop1: '1', prop2: '2' }))).toEqual(true);
    expect(isMapOrList(Immutable.fromJS({}))).toEqual(true);
  });

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

describe('function isValidImmutable', () => {

  it('should return true if input is Immutable.Map or Immutable.List and size > 0', () => {
    expect(isValidImmutable(Immutable.fromJS(['1', '2']))).toEqual(true);
    expect(isValidImmutable(Immutable.fromJS({ prop1: '1', prop2: '2' }))).toEqual(true);
  });

  it('should return false if input is Immutable.Map or Immutable.List and size = 0', () => {
    expect(isValidImmutable(Immutable.fromJS([]))).toEqual(false);
    expect(isValidImmutable(Immutable.fromJS({}))).toEqual(false);
  });

  it('should return false if input is not Immutable.Map or Immutable.List', () => {
    expect(isValidImmutable('1')).toEqual(false);
    expect(isValidImmutable({})).toEqual(false);
    expect(isValidImmutable([])).toEqual(false);
    expect(isValidImmutable({ prop1: '1', prop2: '2' })).toEqual(false);
    expect(isValidImmutable(['1', '2'])).toEqual(false);
  });

  it('should return null and undefined if input is null and undefined', () => {
    expect(isValidImmutable(null)).toEqual(null);
    /* eslint no-undefined: 0 */
    expect(isValidImmutable(undefined)).toEqual(undefined);
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
