import { EMPTY_STRING } from '~const/common';

const WHITE_SPACE_FORMAT = / /gi;
const WHITE_SPACE_REPLACE_FORMAT = '$1 ';
const NUMBER_MASK = /^[\d]+$/;
const NUMBER_AND_WORD_MASK = /^[\d\w]+$/;
const SUM_FORMAT = /(\d)(?=(\d{3})+(?!\d))/g;
const SUM_MASK = /^(\d{1,3})([ ]\d{3})*([.,-]\d{1,2})?$/;
const STRONG_SUM_MASK = /^(\d{1,3})([ ]\d{3})*$/;
const SUM_ONLY_DOTS_MASK = /^[\d]+([.][\d]{1,2})?$/;
export const NAME_MASK = /^([\u0400-\u04FFA-Za-z]+)[ ]([\u0400-\u04FFA-Za-z]+)[ ]?([\u0400-\u04FFA-Za-z]+)?$/;
const UUID_MASK = /^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[1-5][0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/;

export const trimSpaces = (text:string): string => text.replace(WHITE_SPACE_FORMAT, EMPTY_STRING);
export const sumFormatter = (text:string): string => trimSpaces(text).replace(SUM_FORMAT, WHITE_SPACE_REPLACE_FORMAT);
export const numValidator = (text: string): boolean => NUMBER_MASK.test(text);
export const numAndWordValidator = (text: string): boolean => NUMBER_AND_WORD_MASK.test(text);
export const sumValidator = (text: string): boolean => SUM_MASK.test(text);
export const strongSumValidator = (text: string): boolean => STRONG_SUM_MASK.test(text);
export const sumOnlyDotsValidator = (text: string): boolean => SUM_ONLY_DOTS_MASK.test(text);
export const nameValidator = (text: string): boolean => NAME_MASK.test(text);
export const uuidValidator = (text: string): boolean => UUID_MASK.test(text);
export const textValidator = (text: string): boolean => text && text.length < 255;
