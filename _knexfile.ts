import type { Knex } from "knex";

const { DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME } =
  process.env;

const migrations = {
  tableName: "migrations",
  directory: "./src/infra/database/migrations",
  extension: "ts",
};

const seeds = {
  directory: "./src/infra/database/seeds",
  stub: "./src/infra/database/seeds/seed.stub",
};

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  default: {
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
    migrations,
    seeds,
    debug: false,
  },
  test: {
    client: "pg",
    connection: {
      host: DATABASE_HOST,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
    },
    migrations,
    debug: false,
  },
};

module.exports = config;
