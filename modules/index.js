const makeValidation = require('./components/validate');

const validated = makeValidation((types) => ({
  payload: {
    firstname: 2,
  },
  checks: {
    firstname: { type: types.string },
  },
}));

console.log(validated);
