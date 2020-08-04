import Type from '~enums/Types';
import { EMPTY_STRING } from '~const/common';

export const isEmpty = (value: unknown): boolean =>
  value === null || typeof value === Type.UNDEFINED || value === EMPTY_STRING;

export const isEmptyObject = <T> (value: T): boolean => isEmpty(value) ||
  (value.constructor === Object && Object.keys(value).length === 0);

export const isEmptyArray = <T> (value: T): boolean => !(value && value instanceof Array && value.length > 0);

export const isIE = (): boolean => false || !!document.documentMode;

export const isClient = (): boolean => typeof window === Type.OBJECT;

export const filterInnerObject = <T extends Record<string, unknown>> (
  obj: Record<string, T>,
  filterKey: string,
  filterValue: string
): Record<string, T> => Object.keys(obj).reduce((acc, key) => (
    obj[key][filterKey] === filterValue ? {
      ...acc,
      [key]: obj[key]
    } : acc
  ), {});

export const filterObject = <T> (
  obj: Record<string, T>,
  matcher: (obj: Record<string, unknown>, key: string) => boolean,
  mapper: (obj: Record<string, unknown>, key: string) => Record<string, unknown> | string
): Record<string, unknown> => Object.keys(obj).reduce((acc, key) => (
    matcher(obj, key) ? acc : {
      ...acc,
      [key]: mapper(obj, key)
    }
  ), {});
