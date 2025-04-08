import { useQuery } from "@tanstack/react-query";
import { roomApi } from "@/api/room";
import { USER_NO_ROOM_JOINED } from "@/lib/utils";

export const useRooms = () => {
  const {
    isPending: isJoinedRoomsPending,
    isError: isJoinedRoomsError,
    error: joinedRoomsError,
    data: joinedRoomsData,
  } = useQuery({
    queryKey: ["getAllRooms"],
    queryFn: roomApi.getJoinedRooms,
  });

  const {
    isPending: isRoomsPending,
    isError: isRoomsError,
    error: roomsError,
    data: roomsData,
  } = useQuery({
    queryKey: ["getRoomsDetails"],
    queryFn: roomApi.getRoomsDetails,
    enabled: !!joinedRoomsData?.roomIds,
  });

  const joinedRooms = roomsData?.filter(
    (room) => room.id === joinedRoomsData?.roomIds?.room_id
  );

  return {
    isJoinedRoomsPending,
    isJoinedRoomsError,
    joinedRoomsError,
    isRoomsPending,
    isRoomsError,
    roomsError,
    joinedRooms,
    isLoading: isJoinedRoomsPending || (isRoomsPending && !isJoinedRoomsError),
    hasError: isJoinedRoomsError || isRoomsError,
    noRoomsError: joinedRoomsError?.message === USER_NO_ROOM_JOINED,
  };
};
