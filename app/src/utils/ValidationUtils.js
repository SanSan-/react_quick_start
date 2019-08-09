const NUMBER_MASK = /^[\d]+$/;

export const numValidator = (text) => NUMBER_MASK.test(text);
export const textValidator = (text) => text && text.length < 255;
