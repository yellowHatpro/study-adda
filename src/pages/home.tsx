import {Layout} from "@/components/layout";
import {useQuery} from "@tanstack/react-query";
import {LOCAL_STORAGE_ACCESS_TOKEN, NETWORK_ISSUE, URL, USER_NO_ROOM_CREATED} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {PlusIcon} from "lucide-react";
import Loading from "@/components/loading.tsx";

export const Home = () => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)
    const {isPending, isError, error, data} = useQuery({
        queryKey: ['getAllRooms'],
        queryFn: async () => {
            const response = await fetch(`${URL}/api/v1/user/rooms-joined`, {
                headers: {authorization: `Bearer ${accessToken ? accessToken : ""}`}
            })
            const responseJson = await response.json()

            if (!response.ok){
                if (!responseJson?.success){
                    throw new Error(USER_NO_ROOM_CREATED)
                }
                throw new Error(NETWORK_ISSUE)
            }
            return await response.json()
        }
    })

    if (isPending){
        return <Layout><div className={"w-full h-full flex justify-center"}>
            <Loading/>
        </div></Layout>
    }

    if (isError){
        return <Layout>
            <div className={"w-full h-screen flex flex-col items-center justify-center"}>
                {error.message===USER_NO_ROOM_CREATED ? <>
                <h1 className={"p-4"}>Oops! You have not joined any rooms</h1>
                <Button>Join rooms</Button>
                <div className={"flex flex-row w-[90px] p-4  items-center child:mx-2 justify-center"}>
                    <Separator/>
                    <p>OR</p>
                    <Separator/>
                </div>
                <Button className={"child:mx-0.5"}>
                    <PlusIcon/>
                    <h1>Create new room</h1>
                </Button>
            </> : <h1>Network Issue</h1>}
            </div>
        </Layout>
    }

    return (
        <Layout>
            <section className={"p-4 flex"}>
                {<div></div>}
            </section>
        </Layout>
    );
};
