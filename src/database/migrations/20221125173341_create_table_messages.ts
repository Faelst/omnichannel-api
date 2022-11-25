import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("messages", (table) => {
    table.uuid("id").primary();
    table.string("content").notNullable();

    table.uuid("contact_id").notNullable();
    table.foreign("contact_id").references("id").inTable("contacts");

    table.uuid("from_channel_id").notNullable();
    table.foreign("from_channel_id").references("id").inTable("channels");

    table.uuid("customer_id").nullable();
    table.foreign("customer_id").references("id").inTable("customers");

    table.uuid("user_id").nullable();
    table.foreign("user_id").references("id").inTable("users");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").nullable().defaultTo(null);
    table.timestamp("deleted_at").nullable().defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("messages");
}
