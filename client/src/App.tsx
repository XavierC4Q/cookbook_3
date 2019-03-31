import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { loggedInThunk } from './store/actions/actionCreators/user';

import './App.css';

interface IOwnProps {}

interface IStateProps {}

interface IDispatchProps {
	getLoggedInUser: () => Promise<boolean>;
}

type Props = IStateProps & IDispatchProps & IOwnProps;

const App: React.FC<Props> = (props: Props) => {
	useEffect(() => {
		props.getLoggedInUser();
	}, []);

	return( <div>
    The Application
  </div>);
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): IDispatchProps => {
	return {
		getLoggedInUser: async () => {
			await dispatch(loggedInThunk());
			return true;
		}
	};
};

export default connect<IStateProps, IDispatchProps, IOwnProps>(null, mapDispatchToProps)(App);
