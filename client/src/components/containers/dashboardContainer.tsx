import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/config';
import { IUser } from '../../store/reducers/user';

import Dashboard from '../dashboard';

export interface IDashboardStateProps {
	currentUser: IUser | null;
}

const DashBoardContainer: React.FC<IDashboardStateProps> = (props: IDashboardStateProps) => {

	return (
		<React.Fragment>
			<Dashboard {...props} />
		</React.Fragment>
	);
};

const mapStateToProps = (state: AppState): IDashboardStateProps => ({
	currentUser: state.users.currentUser,
});

export default connect<IDashboardStateProps, {}, {}, AppState>(mapStateToProps)(DashBoardContainer);
