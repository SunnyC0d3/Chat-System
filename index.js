/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/components/errors.js":
/*!**************************************!*\
  !*** ./modules/components/errors.js ***!
  \**************************************/
/***/ ((module) => {

var getError = function getError(_ref) {
  var _ref$success = _ref.success,
      success = _ref$success === void 0 ? false : _ref$success,
      _ref$message = _ref.message,
      message = _ref$message === void 0 ? success ? '' : 'Kindly fix the error(s)' : _ref$message,
      _ref$errors = _ref.errors,
      errors = _ref$errors === void 0 ? {} : _ref$errors;
  return {
    success: success,
    message: message,
    errors: errors
  };
};

module.exports = getError;

/***/ }),

/***/ "./modules/components/validate.js":
/*!****************************************!*\
  !*** ./modules/components/validate.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var validationTypes = __webpack_require__(/*! ./validationTypes */ "./modules/components/validationTypes.js");

var getError = __webpack_require__(/*! ./errors */ "./modules/components/errors.js");

var isString = __webpack_require__(/*! ./validators/isString */ "./modules/components/validators/isString.js");

function makeValidation(cb) {
  var result = cb(validationTypes);

  var _ref = result || {},
      payload = _ref.payload,
      checks = _ref.checks;

  var errors = {};

  if (!payload) {
    return getError({
      success: false,
      message: 'Payload is empty.'
    });
  }

  if (!checks) {
    return getError({
      success: false,
      message: 'Checks is empty.'
    });
  }

  Object.keys(checks).forEach(function (key) {
    var type = checks[key].type;
    var value = payload[key];

    switch (type) {
      case validationTypes.string:
        {
          var _isString = isString(value),
              confirm = _isString.confirm,
              message = _isString.message;

          if (!confirm) {
            errors[key] = message;
          }

          break;
        }

      default:
        {
          errors[key] = 'Unknown type has been passed.';
        }
    }
  });
  return getError({
    success: Object.values(errors).length === 0,
    errors: errors
  });
}

module.exports = makeValidation;

/***/ }),

/***/ "./modules/components/validationTypes.js":
/*!***********************************************!*\
  !*** ./modules/components/validationTypes.js ***!
  \***********************************************/
/***/ ((module) => {

var validationTypes = {
  string: 'string'
};
module.exports = validationTypes;

/***/ }),

/***/ "./modules/components/validators/isString.js":
/*!***************************************************!*\
  !*** ./modules/components/validators/isString.js ***!
  \***************************************************/
/***/ ((module) => {

var isString = function isString(value) {
  if (typeof value !== 'string') {
    return {
      confirm: false,
      message: 'Value is not of type string!'
    };
  }

  if (value.trim().length === 0) {
    return {
      confirm: false,
      message: 'String cannot be empty!'
    };
  }

  return {
    confirm: true,
    message: ''
  };
};

module.exports = isString;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./modules/index.js ***!
  \**************************/
var makeValidation = __webpack_require__(/*! ./components/validate */ "./modules/components/validate.js");

var validated = makeValidation(function (types) {
  return {
    payload: {
      firstname: 2
    },
    checks: {
      firstname: {
        type: types.string
      }
    }
  };
});
console.log(validated);
})();

/******/ })()
;