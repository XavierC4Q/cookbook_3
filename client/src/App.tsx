import * as React from 'react';
import { Route, withRouter, RouteProps, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { loggedInThunk } from './store/actions/actionCreators/user';

import DashBoardContainer from './components/containers/dashboardContainer';
import UserAuthContainer from './components/containers/userAuthContainer';
import Header from './components/header';
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
			<Route
				exact
				path='/'
				render={(routeProps: RouteProps): React.ReactNode => {
					return <DashBoardContainer {...routeProps} />;
				}}
			/>
			<Route
				path='/auth'
				render={(routeProps: RouteComponentProps): React.ReactNode => {
					return <UserAuthContainer {...routeProps} />;
				}}
			/>
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
