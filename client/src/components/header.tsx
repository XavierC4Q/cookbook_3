import * as React from 'react';
import { Link } from 'react-router-dom';
import { IAppStateProps } from '../App';
import { IUser } from '../store/reducers/user';

const ProfileLink = (user: IUser): React.ReactNode => {
	const link = `/profile/${user.id}`;
	return (
		<Link to={link}>
			<h3 style={{ textAlign: 'right' }}>Your Profile</h3>
		</Link>
	);
};

const Header: React.FC<IAppStateProps> = (props: IAppStateProps) => (
	<div className='head-cont'>
		<Link to='/'>
			<h3>Cookbook</h3>
		</Link>{' '}
		{props.currentUser && ProfileLink(props.currentUser)}
	</div>
);

export default Header;
