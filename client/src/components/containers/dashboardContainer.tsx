import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/config';
import { IUser } from '../../store/reducers/user';

import Dashboard from '../dashboard';

interface IStateProps {
	currentUser: IUser | null;
}


type IDashBoardContainerProps = IStateProps;

const DashBoardContainer: React.FC<IDashBoardContainerProps> = (props: IDashBoardContainerProps) => {
	
	return (
		<React.Fragment>
			<Dashboard {...props} />
		</React.Fragment>
	);
};

const mapStateToProps = (state: AppState): IStateProps => ({
	currentUser: state.users.currentUser
});

export default connect<IStateProps, {}, {}, AppState>(mapStateToProps)(DashBoardContainer);
