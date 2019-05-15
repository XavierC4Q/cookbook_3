import * as React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../store/auth/types';

const ProfileHeader: React.FC<IUser> = (owner) => {
    const userRecipesLink = `/profile/${owner.id}`;
    const userFollowsLink = `/profile/${owner.id}/follows`;

    return (
        <nav>
            <Link to={userRecipesLink}>Recipes</Link>
            {' '}
            <Link to={userFollowsLink}>Followers</Link>
            {' '}
        </nav>
    );
};

export default ProfileHeader;