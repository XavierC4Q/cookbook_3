import * as React from 'react';
import { Link, RouteProps } from 'react-router-dom';


type Props = {} & RouteProps;

const Main: React.FC<Props> = (props) => {
    if (!localStorage.getItem('user')) {
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
		);
    }
    return (<div>
            <h1>User Feed</h1>
        </div>);
};

export default Main;