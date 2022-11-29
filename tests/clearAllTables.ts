import { Database } from "./config";

export const cleanAllTables = async (tenant = "public") => {
  const tables = ["messages", "contacts"];

  for (const table of tables) {
    await Database.raw(`TRUNCATE ${tenant}.${table} CASCADE`);
  }
};
