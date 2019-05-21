import * as React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../store/auth/types';


export const recipeEditLink = (currentUser: IUser, owner: IUser, id: number): JSX.Element | null => {
	if (currentUser.id === owner.id) {
		const recipeEditUrl = `/recipe/edit/${id}`;
		return (
			<span>
				<Link to={recipeEditUrl}>Edit Recipe</Link>
			</span>
		);
	}
	return null;
};

