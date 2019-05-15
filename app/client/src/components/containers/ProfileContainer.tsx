import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { RootState, Dispatch } from 'typesafe-actions';
import { GetProfileOwnerAction } from '../../store/users/actions';
import { GetUserRecipesAction } from '../../store/recipe/actions';

import RecipeList from '../RecipeList';

const stateProps = (state: RootState) => ({
    ...state.auth,
    owner: state.users.singleUser,
    recipes: state.recipes.recipeList
});

const dispatchProps = (dispatch: Dispatch) => ({
    getProfileOwner: (id: string) => dispatch(GetProfileOwnerAction(id)),
    getUserRecipes: (id: string) => dispatch(GetUserRecipesAction(id))
});

type Props = ReturnType<typeof stateProps> & ReturnType<typeof dispatchProps> & { id: string };

const ProfileContainer: React.FC<Props> = (props) => {
    const { getProfileOwner, getUserRecipes } = props;

    React.useEffect(() => {
        getProfileOwner(props.id);
    }, [ props.id ]);

    return (
        <React.Fragment>
            <Route path='/profile/:id' render={() => (
                <RecipeList 
                    recipes={props.recipes} 
                    currentUser={props.currentUser} 
                    owner={props.owner}
                    title='Recipes'
                    getRecipes={getUserRecipes}
                    />
            )} />
        </React.Fragment>
    );
};

export default connect(stateProps, dispatchProps)(ProfileContainer);