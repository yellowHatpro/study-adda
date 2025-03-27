import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";
import * as schema from "./index";
import * as process from "process";
dotenv.config();
export const db = drizzle(process.env.DATABASE_URL, {schema});