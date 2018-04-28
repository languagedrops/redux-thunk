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