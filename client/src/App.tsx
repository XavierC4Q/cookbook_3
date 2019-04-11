import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { loggedInThunk } from './store/actions/actionCreators/user';
import { IUser } from './store/reducers/user';
import { AppState } from './store/config';

import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';

import './App.css';

export interface IAppStateProps {
	currentUser: IUser | null
}

interface IDispatchProps {
	getLoggedInUser: () => Promise<boolean>;
}

interface IAppProps extends IAppStateProps, IDispatchProps, RouteComponentProps {}

const App: React.FC<IAppProps> = (props: IAppProps) => {
	React.useEffect(() => {
		props.getLoggedInUser();
	}, []);

	return (
		<div className='app-cont'>
			<Header currentUser={props.currentUser}/>
				<Main />
			<Footer />
		</div>
	);
};

const mapStateToProps = (state: AppState): IAppStateProps => {
	return {
		currentUser: state.users.currentUser
	}
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): IDispatchProps => {
	return {
		getLoggedInUser: async () => {
			await dispatch(loggedInThunk());
			return true;
		}
	};
};

export default withRouter(connect<IAppStateProps, IDispatchProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(App));
