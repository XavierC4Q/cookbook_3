import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer, AppState } from './reducers/root';

export default (): Store<AppState> => {
    const middleware = [thunk];
    const store = createStore(rootReducer, undefined, composeWithDevTools(
        applyMiddleware(...middleware)
    ));

    return store;
};