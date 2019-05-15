import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps } from 'react-router-dom';
import { RootState, Dispatch } from 'typesafe-actions';
import { UserAuthState } from '../../store/auth/reducers';
import { ICredentials, INewUserCredentials } from '../../store/auth/types';
import { LoginUserAction, SignUpUserAction } from '../../store/auth/actions';

import Login from '../Login';
import Signup from '../Signup';

const stateProps = (state: RootState): UserAuthState => ({ ...state.auth });

const dispatchProps = (dispatch: Dispatch) => ({
	loginUser: (info: ICredentials) => dispatch(LoginUserAction(info)),
	signupUser: (info: INewUserCredentials) => dispatch(SignUpUserAction(info)),
});

type OwnProps = UserAuthState & ReturnType<typeof dispatchProps>;

const AuthContainer: React.FC<OwnProps> = (props) => {
	return (
		<React.Fragment>
			<Route
				path='/auth/login'
				render={(routeProps: RouteComponentProps) => {
					return (
						<Login
							{...routeProps}
							currentUser={props.currentUser}
							isLoading={props.isLoading}
							authError={props.authError}
							loginUser={props.loginUser}
						/>
					);
				}}
            />
            <Route
				path='/auth/signup'
				render={(routeProps: RouteComponentProps) => {
					return (
						<Signup
							{...routeProps}
							currentUser={props.currentUser}
							isLoading={props.isLoading}
							authError={props.authError}
							signupUser={props.signupUser}
						/>
					);
				}}
			/>
		</React.Fragment>
	);
};

export default connect(stateProps, dispatchProps)(AuthContainer);