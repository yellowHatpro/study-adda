import { Layout } from "@/components/layout";
import { useQuery } from "@tanstack/react-query";
import { URL } from "@/lib/utils.ts";
import { toast } from "@/components/ui/use-toast.ts";
import Loading from "@/components/loading.tsx";
import { Room } from "@/types/room.ts";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import { RoomCard } from "@/components/room-card.tsx";

const RoomsPage = () => {
  // Rooms Query
  const {
    isPending: getRoomsPending,
    isError: isRoomError,
    error: getRoomError,
    data: rooms,
  } = useQuery({
    queryKey: ["getAllRooms"],
    queryFn: async () => {
      return await fetch(`${URL}/api/v1/room`)
        .then((res) => res.json())
        .then((res) => res["roomsData"] as Room[]);
    },
  });

  if (isRoomError) {
    toast({
      title: "Something went wrong",
      description: getRoomError.message,
    });
  }

  if (getRoomsPending) {
    return (
      <div className={"flex flex-col items-center justify-center h-screen"}>
        <Loading />
      </div>
    );
  }

  if (!rooms || (rooms && rooms.length === 0)) {
    return (
      <div className={"flex flex-col items-center justify-center h-screen"}>
        <h1>Oops, no rooms in this trash application :(</h1>
        <Button asChild className={"child:mx-0.5 my-4"}>
          <Link to={"/room/create-room"}>
            <PlusIcon />
            <h1>Create new room</h1>
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <Layout>
      <div
        className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"}
      >
        {rooms &&
          rooms.map((room, index) => {
            return (
              <section className={""}>
                <RoomCard room={room} key={index} />
              </section>
            );
          })}
      </div>
    </Layout>
  );
};

export default RoomsPage;
