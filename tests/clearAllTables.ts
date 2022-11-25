import { Database } from "./config";

export const cleanAllTables = async (tenant = "public") => {
  const tables = ["messages", "contacts", "channels", "users", "customers"];

  for (const table of tables) {
    await Database.raw(`TRUNCATE ${tenant}.${table} CASCADE`);
  }
};
