import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReduxStore from './store/config';

import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<ReduxProvider store={ReduxStore()}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ReduxProvider>,
	document.getElementById('root'),
);

serviceWorker.unregister();
