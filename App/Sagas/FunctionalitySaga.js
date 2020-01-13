import { put, call } from 'redux-saga/effects'
import FunctionalityActions from 'App/Stores/Functionality/Actions'
import SessionActions from 'App/Stores/Session/Actions'
import { userService } from 'App/Services/UserService'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
export function* getAccountHeads(data) {
  console.log('action is ', data.payload)
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  //  yield put(ExampleActions.fetchUserLoading())

  try {
    yield put(SessionActions.setIsLoading())
    const accountHeads = yield call(userService.getAccountHeads, data.payload)
    yield put(SessionActions.resetIsLoading())
   yield put(FunctionalityActions.getAccountHeadsSuccess(accountHeads))
  } catch (error) {
    yield put(SessionActions.resetIsLoading())
    console.log('inside catch of get acounts', error)
   // yield put(FunctionalityActions.loginUserFailure(error.message))
  }
}


export function* getPaymentHistory(data) {
    console.log('going to call payment history is ', data.payload)
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    //  yield put(ExampleActions.fetchUserLoading())
  
    try {
      yield put(SessionActions.setIsLoading())
      const paymentEntries = yield call(userService.getPaymentHistory, data.payload)
      yield put(SessionActions.resetIsLoading())
      yield put(FunctionalityActions.getPaymentHistorySuccess(paymentEntries))
    } catch (error) {
      yield put(SessionActions.resetIsLoading())
      console.log('inside catch of get acounts', error)
    yield put(FunctionalityActions.getPaymentHistoryFailure(error.message))
    }
  }




export function* submitPayment(data) {
    console.log('action is ', data.payload)
    // Dispatch a redux action using `put()`
    // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
    //  yield put(ExampleActions.fetchUserLoading())
  
    try {
      yield put(SessionActions.setIsLoading())
      const accountHeads = yield call(userService.submitPayment, data.payload)
      yield put(SessionActions.resetIsLoading())
     yield put(FunctionalityActions.submitPaymentSuccess('success'))
    } catch (error) {
      yield put(SessionActions.resetIsLoading())
      console.log('inside catch of get acounts', error)
     yield put(FunctionalityActions.submitPaymentFailed(error.message))
    }
  }
  