import * as React from 'react';
import { Link, RouteProps } from 'react-router-dom';
import { IDashboardStateProps } from './containers/dashboardContainer';
import Feed from './feed';

interface IDashboardProps extends IDashboardStateProps, RouteProps {}

const Dashboard: React.FC<IDashboardProps> = (props: IDashboardProps) => {
	if (!localStorage.getItem('user')) {
		return (
			<div className='visitor-cont'>
				<div className='visitor-links'>
					<nav>
						<Link to='/auth/login'>Login Here</Link> <Link to='/auth/signup'>Signup Here</Link>
					</nav>
				</div>
			</div>
		);
	}
	return <Feed />;
};

export default Dashboard;
