import {pgTable, serial} from "drizzle-orm/pg-core";
import {users} from "./users";
import {varchar} from "drizzle-orm/pg-core";

export const accounts = pgTable('accounts', {
    id: serial('id').primaryKey(),
    userId: serial('user_id').notNull().references(()=>users.id),
    password: varchar('password',{length: 256}),
})