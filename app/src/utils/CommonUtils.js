import * as Immutable from 'immutable';

export const isEmpty = (value) => value === null || typeof value === 'undefined' || value === '';

export const isEmptyObject = (value) => isEmpty(value) ||
  (value.constructor === Object && Object.keys(value).length === 0);

export const isEmptyArray = (value) => !(value && value instanceof Array && value.length > 0);

export const isMapOrList = (value) => value instanceof Immutable.Map || value instanceof Immutable.List;

export const isValidImmutable = (value) => value && isMapOrList(value) && value.size > 0;

export const isIE = () => false || !!document.documentMode;

export const filterInnerObject = (obj, filterKey, filterValue) => Object.keys(obj).reduce((acc, key) => (
  obj[key][filterKey] === filterValue ? {
    ...acc,
    [key]: obj[key]
  } : acc
), {});

export const filterObject = (obj, matcher, mapper) => Object.keys(obj).reduce((acc, key) => (
  matcher(obj, key) ? acc : {
    ...acc,
    [key]: mapper(obj, key)
  }
), {});
