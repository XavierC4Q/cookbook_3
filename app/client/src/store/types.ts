import { StateType, ActionType } from 'typesafe-actions';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

declare module 'typesafe-actions' {
    export type Store = StateType<typeof import('./store').default>;

    export type RootState = StateType<typeof import('./rootReducer').default>;

    export type RootAction = ActionType<typeof import('./rootActions').default>;

    export type Thunk<R> = ThunkAction<R, RootState, undefined, RootAction>;

    export type Dispatch = ThunkDispatch<RootState, undefined, RootAction>

    interface Types {
        RootAction: RootAction
    }
}