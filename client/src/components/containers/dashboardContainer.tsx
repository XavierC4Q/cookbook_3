import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/config';
import { IUser } from '../../store/reducers/user';

import Dashboard from '../dashboard';

export interface IDashboardState {
	currentUser: IUser | null;
}

interface IDashBoardContainerProps extends IDashboardState {};

const DashBoardContainer: React.FC<IDashBoardContainerProps> = (props: IDashBoardContainerProps) => {
	
	return (
		<React.Fragment>
			<Dashboard {...props} />
		</React.Fragment>
	);
};

const mapStateToProps = (state: AppState): IDashboardState => ({
	currentUser: state.users.currentUser
});

export default connect<IDashboardState, {}, {}, AppState>(mapStateToProps)(DashBoardContainer);
