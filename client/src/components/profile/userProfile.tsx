import * as React from 'react';
import { IProfileContainerProps } from '../containers/profileContainer';
import { RouteComponentProps } from 'react-router';

export interface IUserProfileProps extends RouteComponentProps, IProfileContainerProps {
	id: string;
}

const UserProfile: React.FC<IUserProfileProps> = (props: IUserProfileProps) => {
	React.useEffect(
		() => {
			props.getSingleUserInfo(props.id);
		},
		[ props.id ]
	);

	const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
		try {
			await props.logutUser();
			props.history.push('/');
		} catch (error) {
			console.log('FAILED TO LOGOUT');
		}
	};

	return (
		<div>
			{props.profile_user && <h1>{props.profile_user.username}'s Profile</h1>}
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default UserProfile;
