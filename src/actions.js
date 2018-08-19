import uuidv4 from 'uuid/v4';

export const getHistory = () => (dispatch, getState, { history }) => history;

export const navigate = (...args) => dispatch => dispatch(getHistory()).push(...args);

export const newSession = () => (dispatch) => {
  const uuid = uuidv4();
  dispatch(navigate( `/${uuid}`));
}
