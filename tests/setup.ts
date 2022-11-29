import knex from "knex";
import { cleanAllTables } from "./clearAllTables";
import { config } from "./config";

const getKnex = (config: any, tenant: string) =>
  knex({
    ...config,
    searchPath: [tenant],
  });

const createSchema = ({
  database,
  tenant,
}: {
  database: any;
  tenant: string;
}) => database.raw(`CREATE SCHEMA IF NOT EXISTS "${tenant}"`);

export const migrate = async (config: any, tenant: string) => {
  const database = getKnex(config, tenant);

  await createSchema({ database, tenant });

  await database.migrate.latest({ schemaName: tenant });

  await database.destroy();
};

const initializeIntegrationTest = async () => {
  await migrate(config, "TEST");
};

beforeAll(async () => await initializeIntegrationTest());

afterEach(async () => {
  await cleanAllTables();
});
