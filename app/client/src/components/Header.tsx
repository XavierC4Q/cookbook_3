import * as React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../store/auth/types';

const ProfileLink = (user: IUser): React.ReactNode => {
	const link = `/profile/${user.id}`;
	return (
		<Link to={link}>
			<h3 style={{ textAlign: 'right' }}>Your Profile</h3>
		</Link>
	);
};

const Header: React.FC<{ user: IUser | null}> = (props) => (
	<div>
		<Link to='/'>
			<h3>Cookbook</h3>
		</Link>{' '}
		{props.user && ProfileLink(props.user)}
	</div>
);


export default Header;