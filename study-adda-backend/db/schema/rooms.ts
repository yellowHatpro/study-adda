import {pgTable, serial, varchar} from "drizzle-orm/pg-core";
import {roomCategories} from "./room_categories";

export const rooms = pgTable(
    'rooms', {
        id: serial('id').primaryKey(),
        name: varchar('name', {length: 256}),
    }
)

//Keeping Room to Category Relation, as I want rooms to belong to >=1 categories
//Also I want categories to show rooms of such types

export const roomsToRoomCategories = pgTable(
    'rooms_to_rooms_categories', {
        roomId: serial('room_id').notNull().references(()=>rooms.id),
        categoryId: serial('category_id').notNull().references(()=>roomCategories.id)
    }
)