import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import authStore from "@/store/authStore.ts";
import {LOCAL_STORAGE_ACCESS_TOKEN} from "@/lib/utils.ts";
import {AuthState, UserState} from "@/types/auth.ts";

interface Props {
    children: React.ReactNode
}
export const Navbar: React.FC<Props> = ({children}) => {
    const navigate = useNavigate()
    const {user} = authStore.getState()
    return (
        <header
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className={"flex flex-row items-center justify-between w-full p-2"}>
                <Link to={"/"}>
                    <h1 className={"font-light hover:bg-neutral-700 p-2 rounded-md"}>
                        Study Adda
                    </h1>
                </Link>
                {children}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src={""}/>
                            <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <Link to={"/profile"}>
                            <DropdownMenuItem>
                                {user?.title ?? "Profile"}
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator/>
                        <Link to={"/settings"}>
                            <DropdownMenuItem>
                                Settings
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={()=>{
                            localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN)
                            const authState : AuthState = {
                                isAuthenticated: false,
                                user: undefined,
                                userState: UserState.LOGGED_OUT
                            }
                            authStore.setState(authState)
                            navigate("/auth")
                        }}>
                            Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
