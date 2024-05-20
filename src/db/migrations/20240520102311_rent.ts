import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("rent", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.dateTime("start_date").notNullable();
    table.dateTime("end_date").notNullable();
    table.integer("total_price").notNullable();
    table.string("status").defaultTo("pending");
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("users.id");
    table.uuid("car_id").notNullable();
    table.foreign("car_id").references("cars.id");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  // Drop foreign key constraints first
  await knex.schema.alterTable("rent", (table) => {
    table.dropForeign(["user_id"]);
    table.dropForeign(["car_id"]);
  });

  await knex.schema.dropTableIfExists("rent");
}
