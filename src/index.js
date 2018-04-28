const enhancedThunk = ({ dispatch, getState }) => (next) => (action) => {
  return processAction(dispatch, getState, next, action)
}

const processAction = (dispatch, getState, next, action) => {
  if (typeof action === 'function') {
    const returnValue = action(getState, dispatch)
    if (returnValue && Array.isArray(returnValue)) {
      returnValue.forEach((returnedAction) => processAction(dispatch, getState, next, returnedAction))
    } else if (returnValue && returnValue.type && typeof returnValue.type === 'string') {
      return dispatch(returnValue);
    } else if (returnValue && typeof returnValue === 'function') {
      return processAction(dispatch, getState, next, returnValue);
    } else {
      return returnValue;
    }
  } else {
    return next(action)
  }
}

export default enhancedThunk
