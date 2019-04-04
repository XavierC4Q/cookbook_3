import * as React from 'react';
import { IProfileContainerProps } from '../containers/profileContainer';
import { RouteComponentProps } from 'react-router';

export interface IUserProfileProps extends RouteComponentProps,IProfileContainerProps {}
 
const UserProfile: React.FC<IUserProfileProps> = (props: IUserProfileProps) => {
    React.useEffect(() => {
        
    }, [props.currentUser, props.profile_user]);

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        try {
            await props.logutUser();
            props.history.push('/');
        } catch (error) {
            console.log('FAILED TO LOGOUT');
        }
    };

    return (<div>
            <h1>The User Profile</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>);
}
 
export default UserProfile;