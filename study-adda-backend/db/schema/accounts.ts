import {pgTable, serial, timestamp, varchar} from "drizzle-orm/pg-core";
import {users} from "./users";

export const accounts = pgTable('accounts', {
    id: serial('id').primaryKey(),
    userId: serial('user_id').notNull().references(()=>users.id),
    password: varchar('password',{length: 256}).notNull(),
})