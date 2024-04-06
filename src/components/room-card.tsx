import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Room} from "@/types/room.ts";
import {Link} from "react-router-dom";

type CardProps = {
    room?: Room
}
export function RoomCard({room}: CardProps) {
    return (
        <Link to={`/room/${room?.id || 1}`}>
            <Card className={"w-[350px]"}>
                <CardHeader>
                    <CardTitle>{room?.name || ""}</CardTitle>
                </CardHeader>
                <CardContent>
                    <h1>Hi</h1>
                </CardContent>
            </Card>
        </Link>
    );
}
