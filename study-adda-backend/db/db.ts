import postgres from "postgres";
import { drizzle } from 'drizzle-orm/postgres-js';
import dotenv from "dotenv";
import {migrate} from "drizzle-orm/postgres-js/migrator";
dotenv.config();

if (!process.env.PSQL_URL){
    throw new Error("DB credentials error")
}

const client = postgres(process.env.PSQL_URL )
const migrationClient = postgres(process.env.PSQL_URL,{max: 1})
export const db = drizzle(client)
await migrate(drizzle(migrationClient), {migrationsFolder: "drizzle"})
await migrationClient.end()


