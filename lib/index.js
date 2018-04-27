'use strict';

exports.__esModule = true;
var enhancedThunk = function enhancedThunk(_ref) {
  var dispatch = _ref.dispatch,
      getState = _ref.getState;
  return function (next) {
    return function (action) {
      if (typeof action === 'function') {
        var returnValue = action(getState, dispatch);
        if (returnValue && Array.isArray(returnValue)) {
          returnValue.forEach(dispatch);
        } else if (returnValue) {
          dispatch(returnValue);
        } else {
          return returnValue;
        }
      }

      return next(action);
    };
  };
};
exports['default'] = enhancedThunk;