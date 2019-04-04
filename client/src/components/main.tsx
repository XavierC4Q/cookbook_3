import * as React from 'react';
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom';

import DashBoardContainer from './containers/dashboardContainer';
import UserAuthContainer from './containers/userAuthContainer';
import ProfileContainer from './containers/profileContainer';

export interface IMainProps {}

const Main: React.FC<IMainProps> = (props: IMainProps) => (
	<div className='main-cont'>
		<Route
			exact
			path='/'
			render={(routeProps: RouteProps): React.ReactNode => {
				return <DashBoardContainer {...routeProps} />;
			}}
		/>
		<Route
			path='/auth'
			render={(routeProps: RouteComponentProps): React.ReactNode => {
				return <UserAuthContainer {...routeProps} />;
			}}
		/>
		<Route path='/profile/:id' render={(routeProps: RouteComponentProps): React.ReactNode => {
			return <ProfileContainer {...routeProps} />
		}} />
	</div>
);

export default Main;
