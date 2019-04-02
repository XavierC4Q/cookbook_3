import * as React from 'react';
import { RouteProps, Link } from 'react-router-dom';
import { IDashboardState } from './containers/dashboardContainer';
import Feed from './feed';

interface IDashboardProps extends IDashboardState, RouteProps {}

const Dashboard: React.FC<IDashboardProps> = (props: IDashboardProps) => {
	if (!props.currentUser) {
		return (
			<div className='visitor-cont'>
				<div className='visitor-links'>
					<nav>
						<Link to='/auth/login'>Login Here</Link>
						{' '}
						<Link to='/auth/signup'>Signup Here</Link>
					</nav>
				</div>
			</div>
		)
	}
	return (
		<Feed />
	);
};

export default Dashboard;
