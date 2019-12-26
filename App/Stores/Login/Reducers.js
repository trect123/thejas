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
  userID: 0,
  userType: -1,
  loginError: '',
})

export const loginUserSuccess = (state, userDetails) => ({
  ...state,
  isLoggedIn: true,
  username: userDetails.username,
  userID: userDetails.userID,
  userType: userDetails.loginType,
  loginError: '',
})

export const loginUserFailure = (state, { errorMessage }) => ({
  ...state,
  loginError: errorMessage,
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [LoginTypes.LOGIN_USER]: loginUser,
  [LoginTypes.LOGIN_USER_SUCCESS]: loginUserSuccess,
  [LoginTypes.LOGIN_USER_FAILURE]: loginUserFailure,
})
