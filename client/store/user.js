import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_USER = 'SET_USER';
const GOT_ALL_USERS = 'GOT_ALL_USERS';
const UPDATE_USER = 'UPDATE_USER';

/**
 * ACTION CREATORS
 */
const setUser = (user) => ({ type: SET_USER, user });
const gotAllUsers = (users) => ({ type: GOT_ALL_USERS, users });
const editUser = (user) => ({ type: UPDATE_USER, user });

/**
 * THUNK CREATORS
 */
export const updateUser = (id, newUser) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data } = await axios.put(`/api/users/${id}`, newUser, {
        headers: { authorization: token },
      });
      dispatch(editUser(data));
    }
  };
};

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const { data } = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setUser(data));
  }
};

export const authenticate = (userObj, method) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, userObj);
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setUser({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  return {
    type: SET_USER,
    user: {},
  };
};
// get all user thunk
export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users');
    dispatch(gotAllUsers(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};
// delete user thunk
export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/users/${id}`);
    dispatch(getAllUsers());
  } catch (error) {
    console.log(error);
  }
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case GOT_ALL_USERS:
      return { ...state, allUsers: action.users };
    case UPDATE_USER:
      return { ...state, ...action.user };
    default:
      return state;
  }
}
