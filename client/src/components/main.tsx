import * as React from 'react';
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom';

import DashBoardContainer from './containers/dashboardContainer';
import UserAuthContainer from './containers/userAuthContainer';

export interface IMainProps {}

const Main: React.FC<IMainProps> = (props: IMainProps) => (
	<React.Fragment>
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
	</React.Fragment>
);

export default Main;
