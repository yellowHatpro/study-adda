import {create} from "zustand";
import {RoomState} from "@/types/room.ts";

const roomStore = create<RoomState>(()=>({
    roomState: {rooms: []}
}))

export default roomStore
