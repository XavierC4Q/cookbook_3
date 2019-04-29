import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { editRecipeThunk, getSingleRecipeThunk, resetEditRecipe } from '../../store/actions/actionCreators/recipe';
import { AppState } from '../../store/config';
import { IRecipe } from '../../store/reducers/recipe';
import { IUser } from '../../store/reducers/user';

import EditRecipeForm from '../forms/editRecipeForm';

interface IStateProps {
	singleRecipe: IRecipe | null;
	singleRecipeLoading: boolean;
	singleRecipeErr: string;
	editLoading: boolean;
	editSuccess: boolean;
	editRecipeErr: string;
	currentUser: IUser | null;
	profileOwner: IUser | null;
}

interface IDispatchProps {
	getSingleRecipe: (recipeId: string) => void;
	recipeEdit: (recipeId: string, updatedRecipe: Partial<IRecipe>) => void;
	resetRecipeEdit: () => void;
}

interface IOwnProps extends RouteComponentProps {
	recipeId: string;
}

export type EditRecipeProps = IOwnProps & IStateProps & IDispatchProps;

const EditRecipeContainer: React.FC<EditRecipeProps> = (props: EditRecipeProps): React.ReactNode | any => {
	React.useEffect(() => {
		props.getSingleRecipe(props.recipeId);
	}, []);
	if (!props.singleRecipe && !props.singleRecipeLoading) {
		return <div>Recipe Loading</div>;
	}
	if (props.currentUser && props.profileOwner && props.currentUser.id === props.profileOwner.id) {
		return <EditRecipeForm {...props} />;
	}
	return <Redirect to='/' />;
};

const mapStateToProps = (state: AppState): IStateProps => {
	return {
		singleRecipe: state.recipe.single_recipe,
		singleRecipeLoading: state.recipe.single_recipe_loading,
		singleRecipeErr: state.recipe.single_recipe_err,
		editLoading: state.recipe.edit_recipe_loading,
		editSuccess: state.recipe.edit_recipe_success,
		editRecipeErr: state.recipe.edit_recipe_err,
		currentUser: state.users.currentUser,
		profileOwner: state.profile.profile_user,
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): IDispatchProps => {
	return {
		getSingleRecipe: (recipeId) => dispatch(getSingleRecipeThunk(recipeId)),
		recipeEdit: (recipeId, updatedRecipe) => dispatch(editRecipeThunk(recipeId, updatedRecipe)),
		resetRecipeEdit: () => dispatch(resetEditRecipe()),
	};
};

export default connect<IStateProps, IDispatchProps, IOwnProps, AppState>(
	mapStateToProps,
	mapDispatchToProps,
)(EditRecipeContainer);
