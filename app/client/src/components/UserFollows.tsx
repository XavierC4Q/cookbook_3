import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { IUserFollow, TUserTypes } from '../store/users/types';
import { IUser } from '../store/auth/types';

const stateProps = (state: RootState) => ({
    follows: state.users.users as TUserTypes,
    loading: state.users.loadingUsers,
    err: state.users.usersError,
});

interface IOwnProps {
    id: string;
    currentUser: IUser | null;
    owner: IUser | null,
    getFollowers: (id: string) => void;
}

type Props = ReturnType<typeof stateProps> & IOwnProps;

const mapUserFollows = (follows: IUserFollow[]): React.ReactNodeArray => {
    return (follows.map((follow, index) => {
        const user = follow.follows;
        return (<div key={index}>
            <section>
                <h4>{user.username}</h4>
            </section>
            <section>
                <img src={user.profile_image || ''} alt='user' />
            </section>
            <section>
                <p>Favorited On: {follow.followed_on}</p>
            </section>
            </div>);
    }));
};

const UserFollows: React.FC<Props> = (props) => {
    const { getFollowers, follows, currentUser, owner } = props;

    React.useEffect(() => {
        getFollowers(props.id);
    }, [ props.id ]);

    const handleTitle = (): string => {
        if (currentUser && owner && currentUser.id === owner.id) return 'Your';
        return 'Their';
    };

    return (
        <div>
            <h2>{handleTitle()} Follows</h2>
            <div>
                {follows.length > 0 && mapUserFollows(follows as IUserFollow[])}
            </div>
        </div>
    );
};

export default connect(stateProps, null)(UserFollows);