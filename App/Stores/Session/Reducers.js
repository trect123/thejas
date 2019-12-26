/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { SessionTypes } from './Actions'

export const setIsLoading = (state) => ({
  ...state,
  isLoading: true,
})

export const resetIsLoading = (state) => ({
  ...state,
  isLoading: false,
})

export const reducer = createReducer(INITIAL_STATE, {
  [SessionTypes.SET_IS_LOADING]: setIsLoading,
  [SessionTypes.RESET_IS_LOADING]: resetIsLoading,
})
