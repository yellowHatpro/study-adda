import { Layout } from "@/components/layout";
import { useQuery } from "@tanstack/react-query";
import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  NETWORK_ISSUE,
  URL,
  USER_NO_ROOM_CREATED,
} from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { PlusIcon } from "lucide-react";
import Loading from "@/components/loading.tsx";
import { Link } from "react-router-dom";
import { RoomCard } from "@/components/room-card.tsx";
import { Room } from "@/types/room.ts";

export const Home = () => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
  
  // Query to get joined rooms
  const { isPending: isJoinedRoomsPending, isError: isJoinedRoomsError, error: joinedRoomsError, data: joinedRoomsData } = useQuery({
    queryKey: ["getAllRooms"],
    queryFn: async () => {
      const response = await fetch(`${URL}/api/v1/user/rooms-joined`, {
        headers: { authorization: `Bearer ${accessToken ? accessToken : ""}` },
      });
      const responseJson = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized - Please login again");
        }
        if (response.status === 404) {
          throw new Error(USER_NO_ROOM_CREATED);
        }
        throw new Error(responseJson.message || NETWORK_ISSUE);
      }
      return responseJson;
    },
  });

  // Query to get room details
  const { isPending: isRoomsPending, isError: isRoomsError, error: roomsError, data: roomsData } = useQuery({
    queryKey: ["getRoomsDetails"],
    queryFn: async () => {
      const response = await fetch(`${URL}/api/v1/room`);
      const responseJson = await response.json();
      
      if (!response.ok) {
        throw new Error(responseJson.message || NETWORK_ISSUE);
      }
      return responseJson.roomsData as Room[];
    },
    enabled: !!joinedRoomsData?.roomIds
  });

  if (isJoinedRoomsPending || isRoomsPending) {
    return (
      <Layout>
        <div className={"w-full h-full flex justify-center"}>
          <Loading />
        </div>
      </Layout>
    );
  }

  if (isJoinedRoomsError) {
    return (
      <Layout>
        <div
          className={
            "w-full h-screen flex flex-col items-center justify-center"
          }
        >
          {joinedRoomsError.message === USER_NO_ROOM_CREATED ? (
            <>
              <h1 className={"p-4"}>Oops! You have not joined any rooms</h1>
              <Button asChild>
                <Link to={"/room"}>
                  <h1>Join rooms</h1>
                </Link>
              </Button>
              <div
                className={
                  "flex flex-row w-[90px] p-4  items-center child:mx-2 justify-center"
                }
              >
                <Separator />
                <p>OR</p>
                <Separator />
              </div>
              <Button asChild className={"child:mx-0.5"}>
                <Link to={"/room/create-room"}>
                  <PlusIcon />
                  <h1>Create new room</h1>
                </Link>
              </Button>
            </>
          ) : (
            <h1>Network Issue</h1>
          )}
        </div>
      </Layout>
    );
  }

  // Filter rooms to only show joined rooms
  const joinedRooms = roomsData?.filter(room => 
    room.id === joinedRoomsData.roomIds.room_id
  );

  return (
    <Layout>
      <section className={"grid p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
        {joinedRooms?.map((room, index) => (
          <RoomCard key={index} room={room} isJoined={true} />
        ))}
      </section>
    </Layout>
  );
};
