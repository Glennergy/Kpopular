/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("usercollection").del();
  await knex("usercollection").insert([
    {
      user_id: "1",
      spotify_id: "3Pel3gWsPxVpZVrciU0Fm6",
      artist_name: "Stray Kids",
    },
  ]);
};
