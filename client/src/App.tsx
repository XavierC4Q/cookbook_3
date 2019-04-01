import * as React from 'react';
import { Route, Link, withRouter, RouteProps, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { loggedInThunk } from './store/actions/actionCreators/user';

import DashBoardContainer from './components/containers/dashboardContainer';

import './App.css';
import UserAuthContainer from './components/containers/userAuthContainer';

interface IOwnProps extends RouteComponentProps {}

interface IStateProps {}

interface IDispatchProps {
	getLoggedInUser: () => Promise<boolean>;
}

type Props = IStateProps & IDispatchProps & IOwnProps;

const App: React.FC<Props> = (props: Props) => {
	React.useEffect(() => {
		props.getLoggedInUser();
	}, []);

	return (
		<div>
			<nav>
				<Link to='/auth/login'>Login</Link> <Link to='/'>Dashboard</Link> <Link to='/auth/signup'>Signup</Link>
			</nav>
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

export default withRouter(connect<IStateProps, IDispatchProps, IOwnProps>(null, mapDispatchToProps)(App));
