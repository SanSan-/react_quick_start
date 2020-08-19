import { RosterFilter, SearchBuffer, Validator, ValidStatus } from '~types/filters';
import { Dispatch, SetStateAction } from 'react';
import produce, { original } from 'immer';
import { SelectValue } from 'antd/lib/select';
import { updateThingsFilter } from '~components/filter/ThingsFilter';
import { isEmptyObject } from '~utils/CommonUtils';
import { message } from 'antd';
import { SEARCH_ERROR } from '~const/log';
import { FILTER_VALIDATION_KEY, FILTER_VALIDATION_VALUE } from '~const/settings';

export const createClearAllFilters = <T extends RosterFilter> (
  filter: T,
  defaultFilter: T,
  setFilter: Dispatch<SetStateAction<T>>,
  setBuffer: Dispatch<SetStateAction<SearchBuffer<T>>>,
  validators: Record<string, Validator>,
  defaultValidators: Record<string, Validator>,
  setValidators: Dispatch<SetStateAction<Record<string, Validator>>>
): () => void => (): void => {
    setBuffer((prevState) => produce(prevState, (draft: SearchBuffer<T>) => {
      draft.filter = filter;
      draft.validators = validators;
    }));
    setFilter(defaultFilter);
    setValidators(defaultValidators);
  };

export const createRestoreFiltersFromBuffer = <T extends RosterFilter> (
  buffer: SearchBuffer<T>,
  setFilter: Dispatch<SetStateAction<T>>,
  setBuffer: Dispatch<SetStateAction<SearchBuffer<T>>>,
  setValidators: Dispatch<SetStateAction<Record<string, Validator>>>
): () => void => (): void => {
    setFilter(buffer.filter);
    setValidators(buffer.validators);
    setBuffer({});
  };

export const createUpdateDateFilter = <T extends RosterFilter> (
  startDateKey: string,
  endDateKey: string,
  setFilter: Dispatch<SetStateAction<T>>,
  setBuffer: Dispatch<SetStateAction<SearchBuffer<T>>>
): (startDate: string, endDate: string) => void =>
    (startDate: string, endDate: string): void => {
      setFilter((prevState) => produce(prevState, (draft: T) => {
        draft[startDateKey] = startDate;
        draft[endDateKey] = endDate;
      }));
      setBuffer({});
    };

export const createUpdateFilter =
  <T extends RosterFilter, K extends keyof T, E extends T[K]>
  (setFilter: Dispatch<SetStateAction<T>>) => (key: K, value: E): E => {
    setFilter((prevState) => produce(prevState, (draft: T) => {
      draft[key] = value;
    }));
    return value;
  };

export const handleUpdateFilter =
  <T extends RosterFilter, K extends keyof T, E extends T[K]> (
    key: K,
    value: E,
    setFilter: Dispatch<SetStateAction<T>>,
    setBuffer: Dispatch<SetStateAction<SearchBuffer<T>>>
  ): void => {
    setFilter((prevState) => produce(prevState, (draft: T) => {
      draft[key] = value;
    }));
    setBuffer({});
  };

export const createHandleSelect = <T extends RosterFilter> (
  setFilter: Dispatch<SetStateAction<T>>,
  setBuffer: Dispatch<SetStateAction<SearchBuffer<T>>>
): (value: SelectValue) => void =>
    (value: SelectValue): void => {
      setFilter((prevState) => produce(prevState, (draft) => {
        draft.selected = value as string[];
      }));
      setBuffer({});
    };

export const createHandleThings = <T extends RosterFilter> (
  setFilter: Dispatch<SetStateAction<T>>,
  setBuffer: Dispatch<SetStateAction<SearchBuffer<T>>>
): (index: number) => void =>
    (index: number): void => {
      setFilter((prevState) => produce(prevState, (draft) => {
        draft.otherThing = updateThingsFilter(original(draft).otherThing, index);
      }));
      setBuffer({});
    };

export const createSetValidator = <T extends Record<string, Validator>> (
  setValidators: Dispatch<SetStateAction<T>>
): (key: string, validateStatus: ValidStatus, help: string) => void =>
    (key: string, validateStatus: ValidStatus, help: string): void => {
      setValidators((prevState) => produce(prevState, (draft: T) => {
        draft[key] = {
          validateStatus,
          help
        };
      }));
    };

export const filterInnerObject = <T extends Record<string, Validator>> (
  obj: T,
  filter: string,
  filterValue: string
): Record<string, T> => Object.keys(obj).reduce((acc, val) => (
    obj[val][filter] === filterValue ? {
      ...acc,
      [val]: obj[val]
    } : acc
  ), {});

export const createHandleSubmit = <T extends RosterFilter> (
  filter: T,
  validators: Record<string, Validator>,
  setIsSearchFilterExpanded: Dispatch<SetStateAction<boolean>>
): (callback: (filter: T) => void) => void =>
    (callback: (filter: T) => void): void => {
      if (isEmptyObject(filterInnerObject(validators, FILTER_VALIDATION_KEY, FILTER_VALIDATION_VALUE))) {
        setIsSearchFilterExpanded && setIsSearchFilterExpanded(false);
        callback(filter);
      } else {
        message.error(SEARCH_ERROR);
      }
    };

export const filterObject = <T extends RosterFilter, K extends keyof T, E extends T[K]> (
  obj: T,
  matcher: (obj: T, key: string) => boolean,
  mapper: (obj: T, key: string) => E
): T => Object.keys(obj).reduce((acc, key) => (
    matcher(obj, key) ? acc : {
      ...acc,
      [key]: mapper ? mapper(obj, key) : obj[key]
    }
  ), {} as T);

export const createHandleSearch = <T extends RosterFilter, K extends keyof T, E extends T[K]> (
  initFilter: T,
  updateFilter: (filter: T) => void,
  filterMatcher: (obj: T, key: string) => boolean,
  filterMapper: (obj: T, key: string) => E
): (actual: T) => void =>
    (actual: T): void => {
      const filter = filterObject(actual, filterMatcher, filterMapper);
      if (isEmptyObject(filter)) {
        updateFilter(initFilter);
      } else {
        updateFilter(filter);
      }
    };

