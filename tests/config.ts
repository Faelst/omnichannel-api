import knex, { Knex } from "knex";

const {
  DATABASE_HOST = "127.0.0.1",
  DATABASE_USERNAME = "postgres",
  DATABASE_PASSWORD = "postgres",
  DATABASE_NAME = "postgres",
} = process.env;

const config = {
  client: "pg",
  connection: {
    host: DATABASE_HOST,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
  },
  migrations: {
    tableName: "migrations",
    directory: "./src/database/migrations",
    extension: "ts",
    stub: "./src/database/migrations/migration.stub",
  },
  debug: false,
};

const Database: Knex = knex(config);

export { Database, config };
