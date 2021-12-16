const defaultOptions = {
  empty: false,
};

const isString = ({ value, options = defaultOptions }) => {
  if (typeof value !== 'string') {
    return { confirm: false, message: 'Value is not of type string!' };
  }
  if (!options.empty && value.trim().length === 0) {
    return { confirm: false, message: 'String cannot be empty!' };
  }
  return { confirm: true, message: '' };
};

export default isString;
