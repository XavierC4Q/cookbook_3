import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { ILoginCred, ISignUpCred, loginThunk, signupThunk } from '../../store/actions/actionCreators/user';
import { AppState } from '../../store/config';
import { IUserState } from '../../store/reducers/user';
import LoginForm from '../forms/login';
import SignUpForm from '../forms/signup';

interface IDispatchProps {
	loginUser: (credentials: ILoginCred) => void;
	signupUser: (credentials: ISignUpCred) => void;
}

export interface IUserAuthContainerProps extends IUserState, IDispatchProps {}

const UserAuthContainer: React.FC<IUserAuthContainerProps> = (props: IUserAuthContainerProps) => {
	return (
		<React.Fragment>
			<Route
				path='/auth/login'
				render={(routeProps: RouteComponentProps): React.ReactNode => {
					return <LoginForm {...routeProps} {...props} />;
				}}
			/>
			<Route
				path='/auth/signup'
				render={(routeProps: RouteComponentProps): React.ReactNode => {
					return <SignUpForm {...routeProps} {...props} />;
				}}
			/>
		</React.Fragment>
	);
};

const mapStateToProps = (state: AppState): IUserState => state.users;

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): IDispatchProps => {
	return {
		loginUser: (credentials) => dispatch(loginThunk(credentials)),
		signupUser: (credentials) => dispatch(signupThunk(credentials)),
	};
};

export default connect<IUserState, IDispatchProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(
	UserAuthContainer,
);
