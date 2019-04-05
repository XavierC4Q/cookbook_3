import * as React from 'react';
import { Link } from 'react-router-dom';
import { IAppStateProps } from '../App';
import { IUser } from '../store/reducers/user';

export interface IHeaderProps extends IAppStateProps {}

const ProfileLink = (user: IUser): React.ReactNode => {
    const link = `/profile/${user.pk}`;
    return <Link to={link}><h3 style={{ textAlign: 'right' }}>Your Profile</h3></Link>
};

const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => (
    <div className='head-cont'>
        <Link to='/'><h3>Cookbook</h3></Link>
        {' '}
        {props.currentUser && ProfileLink(props.currentUser)}
    </div>
);

export default Header;
