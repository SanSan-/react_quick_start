import { AnyAction } from 'redux';

export const NEW_LINE_SIGN = '\n';
export const EQUAL_SIGN = '=';
export const PLUS_SIGN = '+';
export const MINUS_SIGN = '-';
export const SLASH_SIGN = '/';
export const DOT_SIGN = '.';
export const QUOTE_SIGN = ',';
export const SEMICOLON_SIGN = ';';
export const AMPERSAND_SIGN = '&';
export const QUESTION_SIGN = '?';
export const RIGHT_COMA_SIGN = ')';
export const LEFT_COMA_SIGN = '(';
export const SPACE_SIGN = ' ';
export const EMPTY_STRING = '';
export const QUOTE_JOINER = ', ';
export const SEMICOLON_JOINER = '; ';

export const ZERO_SIGN = '0';

export const FORM_ELEMENT_SIZE = 'small';

export const DATE_FORMAT = 'DD.MM.YYYY';
export const ANT_DATE_FORMAT = 'YYYY-MM-DD';

export const EMPTY_FUNC = (): void => {
  // do nothing
};

export const EMPTY_ACTION: AnyAction = {
  type: EMPTY_STRING
};
