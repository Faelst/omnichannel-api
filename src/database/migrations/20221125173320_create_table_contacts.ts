import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("contacts", (t: Knex.AlterTableBuilder) => {
    t.uuid("id").primary();
    t.string("protocol").notNullable();

    t.uuid("customer_id").notNullable();
    t.foreign("customer_id").references("id").inTable("customers");

    t.uuid("entry_channel_id").notNullable();
    t.foreign("entry_channel_id").references("id").inTable("channels");

    t.boolean("is_finished").notNullable().defaultTo(false);

    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.timestamp("updated_at").nullable().defaultTo(null);
    t.timestamp("deleted_at").nullable().defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("contacts");
}
