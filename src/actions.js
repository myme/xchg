export const getHistory = () => (dispatch, getState, { history }) => history;

export const getSessionManager = () => (dispatch, getState, { sessionManager }) => sessionManager;

export const navigate = (...args) => dispatch => dispatch(getHistory()).push(...args);

export const gotoSession = sessionId => (dispatch) => {
  dispatch(navigate(`/${sessionId}`));
};

export const newSession = () => async (dispatch) => {
  const sessionId = await dispatch(getSessionManager()).newSession();
  dispatch(gotoSession(sessionId));
};

export const connectToSession = sessionId => async (dispatch) => {
  await dispatch(getSessionManager()).connectToSession(sessionId);
  dispatch(gotoSession(sessionId));
};

export const destroySession = sessionId => async (dispatch) => {
  await dispatch(getSessionManager()).destroySession(sessionId);
  dispatch(navigate('/'));
};
