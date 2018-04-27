'use strict';

exports.__esModule = true;
var enhancedThunk = function enhancedThunk(_ref) {
  var dispatch = _ref.dispatch,
      getState = _ref.getState;
  return function (next) {
    return function (action) {
      if (typeof action === 'function') {
        var returnValue = action(getState, dispatch);
        if (returnValue && returnValue.type && typeof returnValue.type === 'string') {
          dispatch(returnValue);
        } else if (returnValue && Array.isArray(returnValue)) {
          returnValue.forEach(dispatch);
        } else {
          return returnValue;
        }
      }

      return next(action);
    };
  };
};
exports['default'] = enhancedThunk;