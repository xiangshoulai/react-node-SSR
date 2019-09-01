import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"
import { matchPath } from "react-router"

import { SetRoute, RoutesArray } from "./route/index"
import configureStore from "./store/index"
import { async } from 'q';

const store = configureStore(__initState__);
// await SetRoute.component.preload();
const App = async () => {

    let _route = {
        component: {
            preload: () => { }
        }
    };
    RoutesArray.some(route => {
        let match = matchPath(window.location.pathname, route);
        if (match && match.path) {
            _route = route;
            return true;
        } else {
            return false
        }
    });

    await _route.component.preload();

    ReactDOM.hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <SetRoute />
            </BrowserRouter>
        </Provider>,
        document.getElementById("app")
    )
    if (process.env.NODE_ENV === 'development') {
        if (module.hot) {
            module.hot.accept();
        }
    }

}
export default App;