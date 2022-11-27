import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("customers", (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("document").notNullable();
    table.string("phone").notNullable();

    table.string("zip_code").notNullable();
    table.string("address").notNullable();
    table.integer("number").notNullable();
    table.string("complement").nullable().defaultTo(null);
    table.string("neighborhood").notNullable();
    table.string("city").notNullable();
    table.string("state").notNullable();
    table.string("country").notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").nullable().defaultTo(null);
    table.timestamp("deleted_at").nullable().defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("customers");
}
