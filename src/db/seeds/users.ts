import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      fullname: "Fauzan Nursalma",
      email: "fauzann@gmail.com",
      phone: "1234567890",
      address: "123 Main St",
      role: "admin",
    },
    {
      fullname: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "0987654321",
      address: "456 Elm St",
      role: "user",
    },
  ]);
}
