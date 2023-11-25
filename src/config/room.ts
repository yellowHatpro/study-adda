import {RoomItemWithChildren} from "@/types/nav.ts";

interface RoomConfig {
    sidebarNav: RoomItemWithChildren[]
}

export const roomConfig: RoomConfig = {
    sidebarNav: [
        {
            title: "Teacher",
            items: [],
            people: []
        },
        {
            title: "Student",
            items: [],
            people: []
        },
        {
            title: "Room Settings",
            items: [],
        }
    ]
}
