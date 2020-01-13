/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { LoginTypes } from './Actions'

export const loginUser = (state) => ({
  ...state,
  isLoggedIn: false,
  username: '',
  userId: 0,
  deviceId:'xyz',
  userType: -1,
  loginError: '',
})

export const loginUserSuccess = (state, userDetails) => ({
  ...state,
  isLoggedIn: true,
  username: userDetails.data.username,
  userId: userDetails.data.userid,
  accessToken: userDetails.data.accessToken, 
  userType: userDetails.data.loginType,
  loginError: '',
})

export const loginUserFailure = (state, { errorMessage }) => ({
  ...state,
  loginError: errorMessage,
})

export const clearError = (state) => ({
  ...state,
  loginError: '',
})

export const logoutUser = (state) => ({
  ...state,
  isLoggedIn: false,
  username: 'logged out ',
  userId: '',
  userType:'',
  loginError: '',
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [LoginTypes.LOGIN_USER]: loginUser,
  [LoginTypes.LOGOUT_USER]: logoutUser,
  [LoginTypes.LOGIN_USER_SUCCESS]: loginUserSuccess,
  [LoginTypes.LOGIN_USER_FAILURE]: loginUserFailure,
  [LoginTypes.CLEAR_ERROR]: clearError,
})
