import knex from "knex";
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
  await migrate(config, "public");
};

beforeAll(() => initializeIntegrationTest());
