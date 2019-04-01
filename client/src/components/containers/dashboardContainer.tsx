import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/config';
import { IUser } from '../../store/reducers/user';

import Dashboard from '../dashboard';

interface IOwnProps {}

interface IStateProps {
	currentUser: IUser | null;
}

interface IDispatchProps {}

type DashBoardContainerProps = IStateProps & IDispatchProps & IOwnProps;

const DashBoardContainer: React.FC<DashBoardContainerProps> = (props: DashBoardContainerProps) => {
	return (
		<React.Fragment>
			<Dashboard {...props} />
		</React.Fragment>
	);
};

const mapStateToProps = (state: AppState): IStateProps => ({
	currentUser: state.users.currentUser
});

export default connect<IStateProps, {}, IOwnProps, AppState>(mapStateToProps)(DashBoardContainer);
