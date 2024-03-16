import { User } from "./user"

export type AuthState = {
    isAuthenticated?: boolean,
    user?: User,
    userState?: UserState
}

export enum UserState {
    REGISTERED, // if registered, then send user to sign in page, except when in auth page
    CREATED, // user is created, redirect to home page
    LOGGED_IN,
    LOGGED_OUT
}
