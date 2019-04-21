import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { editRecipeThunk, getSingleRecipeThunk } from '../../store/actions/actionCreators/recipe';
import { AppState } from '../../store/config';
import { IRecipe } from '../../store/reducers/recipe';

interface IStateProps {
	singleRecipe: IRecipe | null;
	singleRecipeLoading: boolean;
	singleRecipeErr: string;
	editLoading: boolean;
	editSuccess: boolean;
	editRecipeErr: string;
}

interface IDispatchProps {
	getSingleRecipe: (recipeId: string) => void;
	recipeEdit: (recipeId: string, updatedRecipe: Partial<IRecipe>) => void;
}

interface IOwnProps extends RouteComponentProps {
	recipeId: string;
}

type EditRecipeProps = IOwnProps & IStateProps & IDispatchProps;

const EditRecipe: React.FC<EditRecipeProps> = (props: EditRecipeProps) => {
	React.useEffect(() => {
		props.getSingleRecipe(props.recipeId);
	});
	return (props.singleRecipe ? <div><h2>Edit Recipe</h2></div> : <h3>Recipe Not Found</h3>);
};

const mapStateToProps = (state: AppState): IStateProps => {
	return {
		singleRecipe: state.recipe.single_recipe,
		singleRecipeLoading: state.recipe.single_recipe_loading,
		singleRecipeErr: state.recipe.single_recipe_err,
		editLoading: state.recipe.edit_recipe_loading,
		editSuccess: state.recipe.edit_recipe_success,
		editRecipeErr: state.recipe.edit_recipe_err,
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): IDispatchProps => {
	return {
		getSingleRecipe: (recipeId) => dispatch(getSingleRecipeThunk(recipeId)),
		recipeEdit: (recipeId, updatedRecipe) => dispatch(editRecipeThunk(recipeId, updatedRecipe)),
	};
};

export default connect<IStateProps, IDispatchProps, IOwnProps, AppState>(mapStateToProps, mapDispatchToProps)(EditRecipe);
