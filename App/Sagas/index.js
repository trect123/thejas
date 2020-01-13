import { takeLatest, all } from 'redux-saga/effects'
import { ExampleTypes } from 'App/Stores/Example/Actions'
import { LoginTypes } from 'App/Stores/Login/Actions'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { getAccountHeads, submitPayment, getPaymentHistory } from './FunctionalitySaga'
import { fetchUser } from './ExampleSaga'
import { loginUser } from './LoginSaga'
import { startup } from './StartupSaga'
import { FunctionalityTypes } from 'App/Stores/Functionality/Actions'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),
    // Call `fetchUser()` when a `FETCH_USER` action is triggered
    takeLatest(ExampleTypes.FETCH_USER, fetchUser),
    takeLatest(LoginTypes.LOGIN_USER, loginUser),
    takeLatest(FunctionalityTypes.GET_ACCOUNT_HEADS,getAccountHeads),
    takeLatest(FunctionalityTypes.SUBMIT_PAYMENT,submitPayment),
    takeLatest(FunctionalityTypes.GET_PAYMENT_HISTORY,getPaymentHistory)
  ])
}
