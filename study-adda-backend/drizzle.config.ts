import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();
export default {
  schema: "./db/schema/*",
  out: "./drizzle",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: process.env.PSQL_URL,
  },
} satisfies Config;
