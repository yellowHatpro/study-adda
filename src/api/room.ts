import {
  URL,
  LOCAL_STORAGE_ACCESS_TOKEN,
  NETWORK_ISSUE,
  USER_NO_ROOM_JOINED,
} from "@/lib/utils";
import { Room } from "@/types/room";

export const roomApi = {
  getJoinedRooms: async () => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
    const response = await fetch(`${URL}/api/v1/user/rooms-joined`, {
      headers: { authorization: `Bearer ${accessToken ? accessToken : ""}` },
    });
    const responseJson = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized - Please login again");
      }
      if (response.status === 404) {
        throw new Error(USER_NO_ROOM_JOINED);
      }
      throw new Error(responseJson.message || NETWORK_ISSUE);
    }
    return responseJson;
  },

  getRoomsDetails: async () => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
    const response = await fetch(`${URL}/api/v1/room`, {
      headers: { authorization: `Bearer ${accessToken ? accessToken : ""}` },
    });
    const responseJson = await response.json();

    if (!response.ok) {
      throw new Error(responseJson.message || NETWORK_ISSUE);
    }
    return responseJson.roomsData as Room[];
  },
};
