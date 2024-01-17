import {pgTable, serial, varchar} from "drizzle-orm/pg-core";

export const roomCategories = pgTable(
    'room_categories', {
        id: serial('id').primaryKey(),
        name: varchar('name', {length: 256})
    }
)