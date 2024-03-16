import {create} from "zustand";
import {AuthState} from "@/types/auth.ts";

const authStore = create<AuthState>(() => ({
    authState: {},
}))

export default authStore
