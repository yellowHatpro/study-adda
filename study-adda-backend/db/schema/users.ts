import {date, pgEnum, pgTable, serial, varchar} from 'drizzle-orm/pg-core';

export const ROLE_ENUM = pgEnum('role',['admin','user'])
export const users = pgTable(
    'users', {
        id: serial('id').primaryKey(),
        name: varchar('name', {length: 256}),
        title: varchar('title', {length: 256}),
        dob: date('date'),
        email: varchar('email', {length: 256}),
        password: varchar('password',{length: 256}),
        role: ROLE_ENUM('user')
    }
)