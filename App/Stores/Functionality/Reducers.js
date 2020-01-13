/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { FunctionalityTypes } from './Actions'



export const getAccountHeads = (state) => ({
  ...state,
  accountHeads: [],
  getAccountHeadsError: '',

})

export const getAccountHeadsSuccess = (state, data) => ({
  ...state,
  accountHeads: data.data.accountHeads,
  frameStatusHeads: data.data.frameStatus,
  getAccountHeadsError: '',
})

export const getAccountHeadsFailure = (state, { errorMessage }) => ({
  ...state,
  getAccountHeadsError: errorMessage,
})




export const getPaymentHistory = (state) => ({
  ...state,
  paymentHistory: [],
  getPaymentHistoryStatus: '',
  getPaymentHistoryError: '',

})

export const getPaymentHistorySuccess = (state, data) => ({
  ...state,
  paymentHistory: data.data.paymentHistory,
  getPaymentHistoryStatus:'success',
  getPaymentHistoryError: '',
})

export const getPaymentHistoryFailure = (state, { errorMessage }) => ({
  ...state,
  getPaymentHistoryError: ` (${errorMessage})`,
  getPaymentHistoryStatus:'Failed',
})





export const submitPayment = (state) => ({
  ...state,
submitPaymentError: '',
  submitPaymentStatus:'',

})

export const submitPaymentSuccess = (state, data) => ({
  ...state,
  submitPaymentStatus:'success',
  submitPaymentError: ''
})

export const submitPaymentFailed = (state, { errorMessage }) => ({
  ...state,
  submitPaymentStatus:'failed',
  submitPaymentError: errorMessage,
})




export const clearError = (state) => ({
  ...state,
  getAccountHeadsError: '',
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [FunctionalityTypes.GET_PAYMENT_HISTORY]: getPaymentHistory,
  [FunctionalityTypes.GET_PAYMENT_HISTORY_SUCCESS]: getPaymentHistorySuccess,
  [FunctionalityTypes.GET_PAYMENT_HISTORY_FAILURE]: getPaymentHistoryFailure,
  [FunctionalityTypes.GET_ACCOUNT_HEADS]: getAccountHeads,
  [FunctionalityTypes.GET_ACCOUNT_HEADS_SUCCESS]: getAccountHeadsSuccess,
  [FunctionalityTypes.GET_ACCOUNT_HEADS_FAILURE]: getAccountHeadsFailure,
  [FunctionalityTypes.SUBMIT_PAYMENT]: submitPayment,
  [FunctionalityTypes.SUBMIT_PAYMENT_SUCCESS]: submitPaymentSuccess,
  [FunctionalityTypes.SUBMIT_PAYMENT_FAILED]: submitPaymentFailed,
  [FunctionalityTypes.CLEAR_ERROR]: clearError,
})
