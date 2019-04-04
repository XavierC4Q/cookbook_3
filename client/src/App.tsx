import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { loggedInThunk } from './store/actions/actionCreators/user';

import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';

import './App.css';

interface IDispatchProps {
	getLoggedInUser: () => Promise<boolean>;
}

interface IAppProps extends IDispatchProps, RouteComponentProps {}

const App: React.FC<IAppProps> = (props: IAppProps) => {
	React.useEffect(() => {
		props.getLoggedInUser();
	}, []);

	return (
		<div className='app-cont'>
			<Header />
				<Main />
			<Footer />
		</div>
	);
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): IDispatchProps => {
	return {
		getLoggedInUser: async () => {
			await dispatch(loggedInThunk());
			return true;
		}
	};
};

export default withRouter(connect<{}, IDispatchProps, {}>(null, mapDispatchToProps)(App));
