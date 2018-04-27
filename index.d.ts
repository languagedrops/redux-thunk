import {Middleware, Dispatch} from "redux";


export type ThunkAction<R, S> = (getState: () => S, dispatch: Dispatch<S>) => R;

declare module "redux" {
  export interface Dispatch<S>
    { <R>(asyncAction: ThunkAction<R, S>): R }
}


export const enhancedThunk: Middleware
