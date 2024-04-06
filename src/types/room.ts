export interface Room {
    id?: number,
    name?: string,
    // description?: string,
    // category?: string[],
}

export type RoomState = {
    rooms?: Room[],
}
