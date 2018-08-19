export const getHistory = () => (dispatch, getState, { history }) => history;
export const navigate = (...args) => dispatch => dispatch(getHistory()).push(...args);
