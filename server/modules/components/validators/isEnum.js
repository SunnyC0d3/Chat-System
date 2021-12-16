import isString from './isString.js';

const defaultOptions = {
  enum: {},
};

const isEnum = ({ value, options = defaultOptions }) => {
  if (!options.enum) {
    const message = `options.enum required can be an object or string seperated by command`;
    return { confirm: false, message };
  }

  const enumValues = isString({ value: options.enum }).confirm
    ? options.enum.split(' ')
    : Object.values(options.enum);

  const found = enumValues.some((enumItem) => enumItem === value);
  if (!found) {
    return { confirm: false, message: `Possible value are ${enumValues}` };
  }
  return { confirm: true };
};

export default isEnum;
