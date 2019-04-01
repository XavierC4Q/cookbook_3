import * as React from 'react';
import { Route, Link, withRouter, RouteProps, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { loggedInThunk } from './store/actions/actionCreators/user';

import DashBoardContainer from './components/containers/dashboardContainer';

import './App.css';

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
				<Link to='/'>Dashboard</Link> <Link to='/login'>Login</Link>
			</nav>
			<Route
				exact
				path='/'
				render={(routeProps: RouteProps): React.ReactNode => {
					return <DashBoardContainer {...routeProps} />;
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
