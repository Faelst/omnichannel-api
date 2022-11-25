import knex, { Knex } from "knex";

const {
  DATABASE_HOST = "127.0.0.1",
  DATABASE_USERNAME = "postgres",
  DATABASE_PASSWORD = "postgres",
  DATABASE_NAME = "postgres",
} = process.env;

export const config: Knex.Config = {
  client: "pg",
  connection: {
    host: DATABASE_HOST,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
  },
  pool: {
    min: 0,
    max: 10,
  },
  migrations: {
    tableName: "migrations",
    directory: "src/database/migrations",
    extension: "ts",
    stub: "src/database/migrations/migration.stub",
  },
  seeds: {
    directory: "src/database/seeds",
    stub: "src/database/seeds/seed.stub",
  },
  debug: false,
};

export const Database: Knex = knex(config);
