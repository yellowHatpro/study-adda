import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import dotenv from "dotenv";
import * as schema from "./index";
dotenv.config();

if (!process.env.PSQL_URL) {
    throw new Error("DB credentials error");
}
const client = postgres(
    process.env.NODE === "development"
        ? process.env.PSQL_URL_DEV
        : process.env.PSQL_URL_PROD,
);
export const db = drizzle(client, {
    schema: schema,
});
