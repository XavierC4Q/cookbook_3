import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import Main from './components/main';
import { loggedInThunk } from './store/actions/actionCreators/user';
import { AppState } from './store/config';
import { IUser } from './store/reducers/user';

export interface IAppStateProps {
	currentUser: IUser | null;
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
		currentUser: state.users.currentUser,
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): IDispatchProps => {
	return {
		getLoggedInUser: async () => {
			await dispatch(loggedInThunk());
			return true;
		},
	};
};

export default withRouter(connect<IAppStateProps, IDispatchProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(App));
