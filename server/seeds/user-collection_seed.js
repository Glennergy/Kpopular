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
      album_name: "5-STAR",
      artist_name: "Stray Kids",
      image_url:
        "https://i.scdn.co/image/ab67616d0000b273e27ba26bc14a563bf3d09882",
    },
  ]);
};
