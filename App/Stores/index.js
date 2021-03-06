import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as ExampleReducer } from './Example/Reducers'
import { reducer as LoginReducer } from './Login/Reducers'
import { reducer as SessionReducer } from './Session/Reducers'
import { reducer as FunctionalityReducer } from './Functionality/Reducers'
export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    example: ExampleReducer,
    login: LoginReducer,
    session: SessionReducer,
    functionality: FunctionalityReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
