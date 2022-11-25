import type { Knex } from "knex";

const {
  DATABASE_HOST = "127.0.0.1",
  DATABASE_PORT = "5432",
  DATABASE_USERNAME = "postgres",
  DATABASE_PASSWORD = "postgres",
  DATABASE_NAME = "postgres",
} = process.env;

const migrations = {
  tableName: "migrations",
  directory: "./src/database/migrations",
  extension: "ts",
};

const seeds = {
  directory: "./src/database/seeds",
  stub: "./src/database/seeds/seed.stub",
};

const config: { [key: string]: Knex.Config } = {
  default: {
    client: "pg",
    connection: {
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
