import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").nullable().defaultTo(null);
    table.timestamp("deleted_at").nullable().defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
