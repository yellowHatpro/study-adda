import React from "react";
import { Navbar } from "@/components/layout/navbar.tsx";
import {LOCAL_STORAGE_ACCESS_TOKEN, URL} from "@/lib/utils.ts";
import {useQuery} from "@tanstack/react-query";
import {AuthState, UserState} from "@/types/auth.ts";
import authStore from "@/store/authStore.ts";
import {Navigate} from "react-router-dom";
import Loading from "@/components/loading.tsx";

interface Props {
  children?: React.ReactNode;
  navbarElements?: React.ReactNode;
}
export const Layout: React.FC<Props> = ({ children, navbarElements }) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)
    const {isPending: isAuthPending, isSuccess, data: user} = useQuery({
        queryKey: ['authHome'],
        queryFn: () => fetch(`${URL}/api/v1/user`, {
            headers: {authorization: `Bearer ${accessToken ? accessToken : ""}`}
        })
            .then((res)=>res.json())
            .then((res)=>{
                return res.user
            })
    })
    if (isSuccess){
        const authState : AuthState = {
            //TODO: Check if access token is OK
            isAuthenticated: true,
            user: user,
            userState: UserState.LOGGED_IN
        }
        authStore.setState(authState)
    }

    if (!accessToken){
        return <Navigate to={"/auth"}/>
    }
    if (isAuthPending) return <div className={"w-full flex h-screen justify-center items-center"}>
        <Loading/>
    </div>

  return (
    <div className={"flex flex-col min-h-screen h-screen"}>
      <Navbar children={navbarElements} />
      <div className={"grow"}>{children}</div>
    </div>
  );
};
