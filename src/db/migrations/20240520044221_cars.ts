import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
    table.uuid("id").primary();
    table.string("plate").notNullable();
    table.string("manufacture").notNullable();
    table.string("model").notNullable();
    table.text("image").notNullable();
    table.integer("rentPerDay").notNullable();
    table.integer("capacity").notNullable();
    table.text("description").notNullable();
    table.string("transmission").notNullable();
    table.boolean("available").notNullable();
    table.string("type").notNullable();
    table.integer("year").notNullable();
    table.string("image_public_id").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("cars");
}
