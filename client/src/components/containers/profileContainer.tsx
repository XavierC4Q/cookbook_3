import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../store/config';
import { ThunkDispatch } from 'redux-thunk';
import { IUser, IUserState } from '../../store/reducers/user';
import { IProfileState } from '../../store/reducers/profile';
import { logoutThunk } from '../../store/actions/actionCreators/user';
import { getSingleUserThunk, editUserThunk } from '../../store/actions/actionCreators/profile';
import UserProfile from '../profile/userProfile';

interface IProfileContainerStateProps extends IProfileState, Partial<IUserState> {}

interface IDispatchProps {
	logutUser: () => void;
	getSingleUserInfo: (id: string) => void;
	editProfile: (update_info: Partial<IUser>) => void;
}

export interface IProfileContainerProps extends IProfileContainerStateProps, IDispatchProps {}

const ProfileContainer: React.FC<IProfileContainerProps> = (props: IProfileContainerProps) => {
	return (
		<React.Fragment>
			<Route
				path='/profile/:id'
				render={(routeProps: RouteComponentProps): React.ReactNode => (
					<UserProfile {...routeProps} {...props} />
				)}
			/>
		</React.Fragment>
	);
};

const mapStateToProps = (state: AppState): IProfileContainerStateProps => {
	return {
		currentUser: state.users.currentUser,
		profile_user: state.profile.profile_user,
		loading_profile_user: state.profile.loading_profile_user,
		user_error: state.profile.user_error
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): IDispatchProps => {
	return {
		logutUser: () => dispatch(logoutThunk()),
		getSingleUserInfo: id => dispatch(getSingleUserThunk(id)),
		editProfile: update_info => dispatch(editUserThunk(update_info))
	};
};

export default connect<IProfileContainerStateProps, IDispatchProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(
	ProfileContainer
);
