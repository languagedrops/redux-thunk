const enhancedThunk = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === 'function') {
    const returnValue = action(getState, dispatch)
    if (returnValue && Array.isArray(returnValue)) {
      returnValue.forEach(dispatch);
    } else if (returnValue) {
      dispatch(returnValue);
    } else {
      return returnValue;
    }
  }

  return next(action)
}
export default enhancedThunk
