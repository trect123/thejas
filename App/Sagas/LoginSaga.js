import { put, call } from 'redux-saga/effects'
import LoginActions from 'App/Stores/Login/Actions'
import SessionActions from 'App/Stores/Session/Actions'
import { userService } from 'App/Services/UserService'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
export function* loginUser(data) {
  console.log('action is ', data)
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  //  yield put(ExampleActions.fetchUserLoading())

  try {
    yield put(SessionActions.setIsLoading())
    const userData = yield call(userService.loginUser, data.payload)
    yield put(SessionActions.resetIsLoading())
    console.log('response is ', userData)
    yield put(LoginActions.loginUserSuccess(userData))
  } catch (error) {
    yield put(SessionActions.resetIsLoading())
    console.log('inside catch', error)
    yield put(LoginActions.loginUserFailure(error))
  }
}
