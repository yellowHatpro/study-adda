import {create} from "zustand";
import {AuthState, UserState} from "@/types/auth.ts";

const authStore = create<AuthState>(() => ({
    authState: {userState: UserState.LOGGED_OUT},
}))

export default authStore
