import {migrate} from "drizzle-orm/postgres-js/migrator";
import {drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";

const migrationClient = postgres(process.env.PSQL_URL,{max: 1})

migrate(drizzle(migrationClient), {migrationsFolder: "drizzle"})
    .then(()=>migrationClient.end())
