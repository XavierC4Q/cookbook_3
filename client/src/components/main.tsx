import * as React from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';

import DashBoardContainer from './containers/dashboardContainer';
import ProfileContainer from './containers/profileContainer';
import UserAuthContainer from './containers/userAuthContainer';
import EditRecipe from './recipe/editRecipe';

interface IMatch {
	id: string;
}

const Main: React.FC<{}> = (props: {}) => (
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
		<Route path='/profile/:id' render={(routeProps: RouteComponentProps<IMatch>): React.ReactNode => {
			return <ProfileContainer {...routeProps} id={routeProps.match.params.id}/>;
		}} />
		<Route path='/recipe/edit/:id' render={(routeProps: RouteComponentProps<IMatch>): React.ReactNode => {
			return <EditRecipe {...routeProps} recipeId={routeProps.match.params.id}/>;
		}}/>
	</div>
);

export default Main;
