import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import DashboardPage from './components/DashboardPage';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import LoadingPage from './components/LoadingPage';
import { startSetContent } from './actions/content'

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <DashboardPage />
    </Provider>
);

// Render loading screen
ReactDOM.render(<LoadingPage />, document.getElementById('app'));

store.dispatch(startSetContent()).then(response => {
    ReactDOM.render(jsx, document.getElementById('app'));
})
