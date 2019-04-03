import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../store/config';
import { IUserState } from '../../store/reducers/user';
import { loginThunk, signupThunk, LoginCred, SignUpCred } from '../../store/actions/actionCreators/user';
import LoginForm from '../forms/login';
import SignUpForm from '../forms/signup';


interface IStateProps extends IUserState {}

interface IDispatchProps {
	loginUser: (credentials: LoginCred) => void;
	signupUser: (credentials: SignUpCred) => void;
}

interface IUserAuthContainerProps extends IStateProps, IDispatchProps {};

const UserAuthContainer: React.FC<IUserAuthContainerProps> = (props: IUserAuthContainerProps) => {

    return (
		<div className='auth-cont'>
			<Route
				path='/auth/login'
				render={(routeProps: RouteComponentProps): React.ReactNode => {
					return (
						<LoginForm
							{...routeProps}
							loading={props.login_loading}
							loggedIn={props.currentUser}
							err={props.login_error}
							login={props.loginUser}
						/>
					);
				}}
			/>
			<Route
				path='/auth/signup'
				render={(routeProps: RouteComponentProps): React.ReactNode => {
					return (
						<SignUpForm
							{...routeProps}
							loading={props.signup_loading}
							loggedIn={props.currentUser}
							err={props.signup_error}
							signup={props.signupUser}
						/>
					);
				}}
			/>
		</div>
	);
};

const mapStateToProps = (state: AppState): IStateProps => state.users;

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): IDispatchProps => {
	return {
		loginUser: credentials => dispatch(loginThunk(credentials)),
		signupUser: credentials => dispatch(signupThunk(credentials))
	};
};

export default connect<IStateProps, IDispatchProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(
	UserAuthContainer
);
