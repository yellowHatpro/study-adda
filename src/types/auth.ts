import {User} from "../../study-adda-backend/types/user.ts";

export type AuthState = {
    isAuthenticated?: boolean,
    user?: User
}
