import React from "react";
import {Navbar} from "@/components/layout/navbar.tsx";

interface Props {
   children?: React.ReactNode,
    navbarElements?: React.ReactNode
}
export const Layout : React.FC<Props>= ({children, navbarElements}) => {
    return (
        <div>
            <Navbar children={navbarElements} />
            {children}
        </div>
    );
};
