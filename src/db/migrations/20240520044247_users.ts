import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    table.increments("id").primary(); // Primary Key dengan auto increment
    table.string("fullname").notNullable();
    table.string("email").notNullable().unique();
    table.string("phone").notNullable();
    table.text("address").notNullable();
    table.string("role").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
