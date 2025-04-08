import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { PlusIcon } from "lucide-react";
import Loading from "@/components/loading.tsx";
import { Link } from "react-router-dom";
import { RoomCard } from "@/components/room-card.tsx";
import { useRooms } from "@/hooks/useRooms";

export const Home = () => {
  const { isLoading, hasError, noRoomsError, joinedRooms, roomsError } =
    useRooms();

  if (isLoading) {
    return (
      <Layout>
        <div className={"w-full h-full flex justify-center"}>
          <Loading />
        </div>
      </Layout>
    );
  }

  if (hasError) {
    return (
      <Layout>
        <div
          className={
            "w-full h-screen flex flex-col items-center justify-center"
          }
        >
          {noRoomsError ? (
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
          ) : roomsError ? (
            <>
              <h1>Issue with Rooms </h1>
            </>
          ) : (
            <h1>Network Issue</h1>
          )}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section
        className={"grid p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}
      >
        {joinedRooms?.map((room, index) => (
          <RoomCard key={index} room={room} isJoined={true} />
        ))}
      </section>
    </Layout>
  );
};
