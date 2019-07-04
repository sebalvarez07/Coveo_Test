import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import filterReducer from '../reducers/filter';
import contentReducer from '../reducers/content';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    // Store creation
    const store = createStore(
        combineReducers({
            filters: filterReducer,
            content: contentReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        // This line of code allows us to use the store chrome extension for dev tools
        // We've removed it as the line above takes care of this
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}

