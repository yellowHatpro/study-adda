import {Role} from "@/types/role.ts";

export interface User {
    id? : number,
    name?: string,
    title?: string,
    dob?: Date,
    email? : string,
    role?: Role
}
