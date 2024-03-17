export interface Room {
    roomId?: number,
    name?: string,
    // description?: string,
    // category?: string[],
}

export type RoomState = {
    rooms?: Room[],
}
