import { createClient } from "@libsql/client";
import { LibSQLDatabase, drizzle } from "drizzle-orm/libsql";

if (!process.env.SQLITE_DATABASE_PATH) {
  throw new Error("SQLITE_DATABASE_PATH must be set.");
}

const client = createClient({
  url: process.env.SQLITE_DATABASE_PATH,
});

export const db: LibSQLDatabase = drizzle(client);