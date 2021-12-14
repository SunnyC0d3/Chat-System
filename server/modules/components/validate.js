const validationTypes = require('./validationTypes');
const getError = require('./errors');
const isString = require('./validators/isString');

function makeValidation(cb) {
  const result = cb(validationTypes);
  const { payload, checks } = result || {};
  const errors = {};

  if (!payload) {
    return getError({ success: false, message: 'Payload is empty.' });
  }

  if (!checks) {
    return getError({ success: false, message: 'Checks is empty.' });
  }

  Object.keys(checks).forEach((key) => {
    const { type } = checks[key];
    const value = payload[key];

    switch (type) {
      case validationTypes.string: {
        const { confirm, message } = isString(value);
        if (!confirm) {
          errors[key] = message;
        }
        break;
      }
      default: {
        errors[key] = 'Unknown type has been passed.';
      }
    }
  });

  return getError({ success: Object.values(errors).length === 0, errors });
}

module.exports = makeValidation;
