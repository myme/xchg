export const getHistory = () => (dispatch, getState, { history }) => history;

export const getSessionManager = () => (dispatch, getState, { sessionManager }) => sessionManager;

export const navigate = (...args) => dispatch => dispatch(getHistory()).push(...args);

export const newSession = () => async (dispatch) => {
  const sessionId = await dispatch(getSessionManager()).newSession();
  dispatch(navigate(`/${sessionId}`));
};

export const destroySession = sessionId => async (dispatch) => {
  await dispatch(getSessionManager()).destroySession(sessionId);
  dispatch(navigate('/'));
};
