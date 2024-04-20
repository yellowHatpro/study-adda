import {Layout} from "@/components/layout";
import {useQuery} from "@tanstack/react-query";
import {URL} from "@/lib/utils.ts";
import {toast} from "@/components/ui/use-toast.ts";
import Loading from "@/components/loading.tsx";
import {Room} from "@/types/room.ts";
import {Card, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {PlusIcon} from "lucide-react";

const RoomsPage = () => {

    // Rooms Query
    const {isPending: getRoomsPending, isError: isRoomError, error: getRoomError, data: rooms} = useQuery({
        queryKey: ['getAllRooms'],
        queryFn: async () => {
            return await fetch(`${URL}/api/v1/room`)
                .then((res) => res.json())
                .then((res) => res['roomsData'] as Room[])
        }
    })

    if (isRoomError) {
        toast({
            title: "Something went wrong",
            description: getRoomError.message,
        })
    }

    if (getRoomsPending){
        return <Loading/>
    }

    if (!rooms || (rooms && rooms.length===0)){
        return <div
            className={"flex flex-col items-center justify-center h-screen"}>
            <h1>Oops, no rooms in this trash application :(</h1>
            <Button asChild className={"child:mx-0.5 my-4"}>
                <Link to={"/room/create-room"}><PlusIcon/>
                    <h1>Create new room</h1></Link>
            </Button>
        </div>
    }

    return <Layout>
        {rooms && rooms.map((room,index)=>{
            return (
                <section className={""}>
                    <Card className={"flex max-w-[450px] min-w-fit p-4 m-4"} key={index}>
                        <CardHeader>
                            <CardTitle>
                                {room.name}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </section>
            )
        })}
    </Layout>
}

export default RoomsPage

