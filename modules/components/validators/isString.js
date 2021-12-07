const isString = (value) => {
  if (typeof value !== 'string') {
    return { confirm: false, message: 'Value is not of type string!' };
  }
  if (value.trim().length === 0) {
    return { confirm: false, message: 'String cannot be empty!' };
  }
  return { confirm: true, message: '' };
};

module.exports = isString;
