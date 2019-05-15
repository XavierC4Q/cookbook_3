import React from 'react';
import { connect } from 'react-redux';
import { LoggedInAction } from './store/auth/actions';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RootState, Dispatch } from 'typesafe-actions';

import Header from './components/header/Header';
import Content from './components/Content';
import Footer from './components/Footer';

const stateProps = (state: RootState) => ({
	currentUser: state.auth.currentUser,
	authLoading: state.auth.isLoading,
});

const dispatchProps = (dispatch: Dispatch) => ({
	getLoggedInUser: () => dispatch(LoggedInAction()),
});

type StateProps = ReturnType<typeof stateProps>;

type DispatchProps = ReturnType<typeof dispatchProps>;

type OwnProps = StateProps & DispatchProps & RouteComponentProps;

const App: React.FC<OwnProps> = (props) => {
	const { getLoggedInUser } = props;

	React.useEffect(() => {
		getLoggedInUser();
	}, []);

	return (
    <div>
      <Header user={props.currentUser}/>
      <Content />
      <Footer />
		</div>
	);
};

export default withRouter(connect(stateProps, dispatchProps)(App));
