import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import React from "react";
import {Link} from "react-router-dom";

interface Props {
    children: React.ReactNode
}
export const Navbar: React.FC<Props> = ({children}) => {
    return (
        <header
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className={"flex flex-row items-center justify-between w-full p-2"}>
                <Link to={"/"}>
                    <text className={"font-light hover:bg-neutral-700 p-2 rounded-md"}>
                        Study Adda
                    </text>
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
                                Profile
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator/>
                        <Link to={"/settings"}>
                            <DropdownMenuItem>
                                Settings
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
