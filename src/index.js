import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import {browserHistory, Router, Route} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';

import Layout from 'containers/layout';
import Phones from 'containers/phones';
import Phone from 'containers/phone';

// Can import like this b/c we use it in node_modules folder in src.
import reducers from 'reducers';

// Want to pass root reducer inside here
const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
    ));

const history = syncHistoryWithStore(browserHistory, store);

// Parameter one routing
// Parameter 2 where we inject React
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route component={Layout}>
                <Route path ="/" component={Phones} />
            </Route>
            <Route path="/phones/:id" component={Phone} />
        </Router>
    </Provider>,
    document.getElementById('root')
)