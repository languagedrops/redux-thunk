(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ReduxThunk"] = factory();
	else
		root["ReduxThunk"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var enhancedThunk = function enhancedThunk(_ref) {
	  var dispatch = _ref.dispatch,
	      getState = _ref.getState;
	  return function (next) {
	    return function (action) {
	      return processAction(dispatch, getState, next, action);
	    };
	  };
	};

	var processAction = function processAction(dispatch, getState, next, action) {
	  if (typeof action === 'function') {
	    var returnValue = action(getState, dispatch);
	    if (returnValue && Array.isArray(returnValue)) {
	      returnValue.forEach(function (returnedAction) {
	        return processAction(dispatch, getState, next, returnedAction);
	      });
	    } else if (returnValue && returnValue.type && typeof returnValue.type === 'string') {
	      return dispatch(returnValue);
	    } else if (returnValue && typeof returnValue.type === 'function') {
	      return processAction(dispatch, getState, next, returnValue);
	    } else {
	      return returnValue;
	    }
	  } else {
	    return next(action);
	  }
	};

	exports['default'] = enhancedThunk;

/***/ })
/******/ ])
});
;