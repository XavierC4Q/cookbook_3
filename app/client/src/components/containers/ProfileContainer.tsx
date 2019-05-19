import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { RootState, Dispatch } from 'typesafe-actions';
import { GetProfileOwnerAction, GetFollowersAction } from '../../store/users/actions';
import { GetUserRecipesAction } from '../../store/recipe/actions';
import { IRecipe } from '../../store/recipe/types';

import RecipeList from '../recipe/RecipeList';
import UserFollows from '../UserFollows';
import ProfileHeader from '../ProfileHeader';

const stateProps = (state: RootState) => ({
    ...state.auth,
    owner: state.users.singleUser,
    recipes: state.recipes.recipeList
});

const dispatchProps = (dispatch: Dispatch) => ({
    getProfileOwner: (id: string) => dispatch(GetProfileOwnerAction(id)),
    getUserRecipes: (id: string) => dispatch(GetUserRecipesAction(id)),
    getUserFollowers: (id: string) => dispatch(GetFollowersAction(id)),
});

type Props = ReturnType<typeof stateProps> & ReturnType<typeof dispatchProps> & { id: string };

const ProfileContainer: React.FC<Props> = (props) => {
    const { getProfileOwner, getUserRecipes, getUserFollowers } = props;

    React.useEffect(() => {
        getProfileOwner(props.id);
    }, [ props.id ]);

    return (
        <React.Fragment>
            {props.owner && <ProfileHeader {...props.owner}/>}
            <Route exact path='/profile/:id' render={() => (
                <RecipeList 
                    recipes={props.recipes as IRecipe[]} 
                    currentUser={props.currentUser}
                    owner={props.owner}
                    title='Recipes'
                    getRecipes={getUserRecipes}
                    />
            )} />
            <Route path='/profile/:id/follows' render={() => (
                <UserFollows 
                    id={props.id}
                    currentUser={props.currentUser}
                    owner={props.owner}
                    getFollowers={getUserFollowers}
                />
            )} />
        </React.Fragment>
    );
};

export default connect(stateProps, dispatchProps)(ProfileContainer);