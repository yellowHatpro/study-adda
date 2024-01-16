import postgres from "postgres";
import { drizzle } from 'drizzle-orm/postgres-js';

if (!process.env["PSQL_URL "]) {
    throw new Error("DB credentials error")
}

const client = postgres(process.env["PSQL_URL "])
export const db = drizzle(client)
