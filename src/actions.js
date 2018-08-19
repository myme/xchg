export const getHistory = () => (dispatch, getState, { history }) => history;

export const getSessionManager = () => (dispatch, getState, { sessionManager }) => sessionManager;

export const navigate = (...args) => dispatch => dispatch(getHistory()).push(...args);

export const newSession = () => (dispatch) => {
  console.log(dispatch(getSessionManager()));
  const sessionId = dispatch(getSessionManager()).newSession();
  dispatch(navigate(`/${sessionId}`));
};

export const destroySession = sessionId => (dispatch) => {
  dispatch(getSessionManager()).destroySession(sessionId);
  dispatch(navigate('/'));
};
