export const enhancedThunk = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === 'function') {
    const returnValue = action(dispatch, getState)
    if (returnValue && returnValue.type && typeof returnValue.type === 'string') {
      dispatch(returnValue)
    } else if (returnValue && Array.isArray(returnValue)) {
      returnValue.forEach(dispatch)
    } else {
      return returnValue
    }
  }

  return next(action)
}
