const NUMBER_MASK = /^[\d]+$/;

export const numValidator = (text: string): boolean => NUMBER_MASK.test(text);
export const textValidator = (text: string): boolean => text && text.length < 255;
