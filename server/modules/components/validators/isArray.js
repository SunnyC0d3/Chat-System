import isString from './isString.js';

const defaultOptions = {
  unique: false,
  stringOnly: false,
  empty: true,
};

const isArray = ({ value: array, options = defaultOptions }) => {
  if (!Array.isArray(array)) {
    return { confirm: false, message: 'Please provide an array' };
  }
  if (options.unique) {
    const isUnique = new Set(array).size === array.length;
    if (!isUnique) {
      return { confirm: false, message: 'Values of array should be unique' };
    }
  }
  if (options.stringOnly) {
    const areString = array.every((item) => isString({ value: item }).confirm);
    if (!areString) {
      return { confirm: false, message: 'Values of array should be string only' };
    }
  }
  if (!options.empty && array.length === 0) {
    return { confirm: false, message: 'Array cannot be empty' };
  }
  return { confirm: true };
};

export default isArray;
