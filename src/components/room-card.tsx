import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Room} from "@/types/room.ts";
import {Link} from "react-router-dom";
import {ArrowRight, PlusIcon, XIcon} from "lucide-react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import {URL, LOCAL_STORAGE_ACCESS_TOKEN} from "@/lib/utils.ts";
import {toast} from "@/components/ui/use-toast.ts";

type CardProps = {
    room: Room;
    isJoined?: boolean;
}

export function RoomCard({room, isJoined}: CardProps) {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);

    // Join room mutation
    const mutation = useMutation({
        mutationFn: async ({roomId}: {roomId?: number}) => {
            if (!roomId) {
                toast({
                    title: "Room ID is required",
                    description: "Please try again",
                })
                return
            }
            return await fetch(`${URL}/api/v1/user/join-room`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({roomId: roomId})
            })
                .then((res) => res.json())
        }
    })

    return (
        <Card className={"flex flex-col w-full max-w-[350px] min-w-fit mx-auto items-center"}>
            <CardHeader>
                <CardTitle>
                    {room.name}
                </CardTitle>
            </CardHeader>
            <CardFooter className={"flex flex-row justify-between w-full"}>
                <Button 
                    className={"rounded-full"}
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => {
                        mutation.mutate({roomId: room.id})
                    }}>
                    {isJoined ? <XIcon className={"w-4 h-4"}/> : <PlusIcon className={"w-4 h-4"}/>}
                </Button>
                <Link to={`/room/${room.id}`}>
                    <Button 
                        size={"icon"}
                        className={"rounded-full"}
                    >
                        <ArrowRight className={"w-4 h-4"}/>
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
