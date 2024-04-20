import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import dotenv from "dotenv";
import * as schema from "./index";
import * as process from "process";
dotenv.config();

if (!process.env.PSQL_URL) {
  console.log(process.env.NODE_ENV);
}
const client = postgres(process.env.PSQL_URL);
export const db = drizzle(client, {
  schema: schema,
});
