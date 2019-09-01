import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';
import { createLogger } from 'redux-logger';

import HomeReducer from "./Home/reducer";

export default function configureStore(initState?: any) {
    let middleware = [];
    // middleware.push(thunk);

    if (process.env.NODE_ENV == "development") {
        const logg = createLogger();
        middleware.push(logg);
    }

    const reducer = combineReducers({
        homeReducer: HomeReducer
    })
    if (initState) {
        return createStore(reducer, initState, compose(applyMiddleware(...middleware)))
    } else {
        return createStore(reducer, compose(applyMiddleware(...middleware)))
    }


}

