import validationTypes from './validationTypes.js';
import getError from './errors.js';
import isString from './validators/isString.js';
import isEnum from './validators/isEnum.js';
import isArray from './validators/checks/isArray.js';

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
    const { type, options } = checks[key];
    const value = payload[key];

    switch (type) {
      case validationTypes.string: {
        const { confirm, message } = isString({ value, options });
        if (!confirm) {
          errors[key] = message;
        }
        break;
      }
      case validationTypes.enum: {
        const { confirm, message } = isEnum({ value, options });
        if (!confirm) {
          errors[key] = message;
        }
        break;
      }
      case validationTypes.array: {
        const { confirm, message } = isArray({ value, options });
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

export default makeValidation;
