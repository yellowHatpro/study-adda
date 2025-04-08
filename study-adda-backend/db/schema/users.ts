import { date, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { rooms } from "./rooms";

export const ROLE_ENUM = pgEnum("role", ["admin", "user"]);
export const ROOM_ROLE_ENUM = pgEnum("room_role", ["guru", "student"]);
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  title: varchar("title", { length: 256 }),
  dob: date("dob"),
  email: varchar("email", { length: 256 }),
  role: ROLE_ENUM("role"),
});

export const usersToRooms = pgTable("users_to_rooms", {
  user_id: serial("user_id")
    .notNull()
    .references(() => users.id),
  room_id: serial("room_id")
    .notNull()
    .references(() => rooms.id),
  room_role: ROOM_ROLE_ENUM("room_role").default("student"),
});
