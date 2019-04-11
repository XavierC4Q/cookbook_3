import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../store/config';
import { ThunkDispatch } from 'redux-thunk';
import { IUser, IUserState } from '../../store/reducers/user';
import { IProfileState } from '../../store/reducers/profile';
import { logoutThunk } from '../../store/actions/actionCreators/user';
import { getSingleUserThunk, editUserThunk } from '../../store/actions/actionCreators/profile';
import { getAllUserRecipesThunk, getSingleRecipeThunk } from '../../store/actions/actionCreators/recipe';
import { IRecipeState } from '../../store/reducers/recipe';
import UserRecipes from '../profile/userRecipes';

interface IProfileContainerStateProps extends IProfileState, Partial<IRecipeState>, Partial<IUserState> {}

interface IDispatchProps {
	logutUser: () => void;
	getSingleUserInfo: (id: string) => void;
	editProfile: (update_info: Partial<IUser>) => void;
	getAllRecipes: (id: string) => void;
	getSingleRecipe: (recipeId: string) => void;
}

export interface IProfileContainerProps extends IProfileContainerStateProps, IDispatchProps {
	id: string;
}

const ProfileContainer: React.FC<IProfileContainerProps> = (props: IProfileContainerProps) => {
	React.useEffect(
		() => {
			props.getSingleUserInfo(props.id);
			props.getAllRecipes(props.id);
		},
		[ props.id ]
	);

	return (
		<React.Fragment>
			<Route
				path='/profile/:id'
				render={(routeProps: RouteComponentProps): React.ReactNode => (
					<UserRecipes
						{...routeProps}
						{...props}
						currentUser={props.currentUser || null}
						profileOwner={props.profile_user}
						recipes={props.all_user_recipes || []}
					/>
				)}
			/>
		</React.Fragment>
	);
};

const mapStateToProps = (state: AppState): IProfileContainerStateProps => {
	return {
		currentUser: state.users.currentUser,
		profile_user: state.profile.profile_user,
		loading_profile_user: state.profile.loading_profile_user,
		user_error: state.profile.user_error,
		all_user_recipes: state.recipe.all_user_recipes,
		all_recipes_err: state.recipe.all_recipes_err,
		all_recipes_loading: state.recipe.all_recipes_loading,
		single_recipe: state.recipe.single_recipe,
		single_recipe_loading: state.recipe.single_recipe_loading,
		single_recipe_err: state.recipe.single_recipe_err
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): IDispatchProps => {
	return {
		logutUser: () => dispatch(logoutThunk()),
		getSingleUserInfo: id => dispatch(getSingleUserThunk(id)),
		editProfile: update_info => dispatch(editUserThunk(update_info)),
		getAllRecipes: id => dispatch(getAllUserRecipesThunk(id)),
		getSingleRecipe: recipeId => dispatch(getSingleRecipeThunk(recipeId))
	};
};

export default connect<IProfileContainerStateProps, IDispatchProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(
	ProfileContainer
);
