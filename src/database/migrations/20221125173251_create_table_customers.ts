import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("customers", (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("document").notNullable();
    table.string("phone").notNullable();

    table.timestamp("zip_code").defaultTo(knex.fn.now());
    table.timestamp("address").defaultTo(knex.fn.now());
    table.timestamp("number").defaultTo(knex.fn.now());
    table.timestamp("complement").defaultTo(knex.fn.now());
    table.timestamp("neighborhood").defaultTo(knex.fn.now());
    table.timestamp("city").defaultTo(knex.fn.now());
    table.timestamp("state").defaultTo(knex.fn.now());
    table.timestamp("country").defaultTo(knex.fn.now());

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").nullable().defaultTo(null);
    table.timestamp("deleted_at").nullable().defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("customers");
}
