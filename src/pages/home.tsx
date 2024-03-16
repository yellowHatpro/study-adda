import { Layout } from "@/components/layout";
import {RoomCard} from "@/components/room-card.tsx";
import {useQuery} from "@tanstack/react-query";
import {LOCAL_STORAGE_ACCESS_TOKEN, URL} from "@/lib/utils.ts";
import authStore from "@/store/authStore.ts";
import {AuthState} from "@/types/auth.ts";
import {Navigate} from "react-router-dom";

export const Home = () => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)
    const {isPending: isAuthPending, isError: isAuthError, data: authData} = useQuery({
        queryKey: ['authHome'],
        queryFn: () => fetch(`${URL}/v1/user`, {
            headers: {Authorization: `Bearer ${accessToken ? accessToken : ""}`}
        })
            .then((res)=>res.json())
            .then((res)=>{
                const authState : AuthState = {
                    isAuthenticated: true,
                    user: res.user
                }
                authStore.setState(authState)
            })
    })
    console.log(authData)
    if (isAuthPending) return "Loading"
    if (isAuthError) return <Navigate to={"/auth"}/>


    return (
        <Layout>
            <div className={"p-4"}>
                <RoomCard/>
            </div>
        </Layout>
    );
};
