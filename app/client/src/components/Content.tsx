import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import AuthContainer from './containers/AuthContainer';
import ProfileContainer from './containers/ProfileContainer';
import EditRecipe from './recipe/EditRecipe';
import Main from './Main';

const Content: React.FC<{}> = () => (
	<React.Fragment>
		<Route exact path='/' render={(routeProps: RouteComponentProps) => <Main {...routeProps} />} />
		<Route path='/auth' render={(routeProps: RouteComponentProps) => <AuthContainer {...routeProps} />} />
		<Route
			path='/profile/:id'
			render={(routeProps: RouteComponentProps<{ id: string }>) => {
				return <ProfileContainer id={routeProps.match.params.id} />;
			}}
		/>
		<Route
			path='/recipe/edit/:id'
			render={(routeProps: RouteComponentProps<{ id: string }>) => {
				return <EditRecipe id={routeProps.match.params.id} {...routeProps}/>;
			}}
		/>
	</React.Fragment>
);

export default Content;
