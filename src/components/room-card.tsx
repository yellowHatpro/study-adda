import {Card, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Room} from "@/types/room.ts";
import {Link} from "react-router-dom";
import {ArrowRight} from "lucide-react";

type CardProps = {
    room: Room
}
export function RoomCard({room}: CardProps) {
    return (
        <Card className={"flex max-w-[450px] min-w-fit p-4 m-4 relative"}>
            <CardHeader>
                <CardTitle>
                    {room.name}
                </CardTitle>
            </CardHeader>
            <Link to={`/room/${room.id}`}>
                <ArrowRight className={"absolute right-0 bottom-0 m-5 border border-white rounded-full hover:bg-neutral-500 transition duration-500 ease-in-out"}/>
            </Link>
        </Card>
    );
}
