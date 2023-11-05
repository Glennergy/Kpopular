/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("artists").del();
  await knex("artists").insert([
    {
      id: 1,
      artist_spotifyid: "2dIgFjalVxs4ThymZ67YCE",
      artist_name: "Stray Kids",
    },
    {
      id: 2,
      artist_spotifyid: "7nqOGRxlXj7N2JYbgNEjYH",
      artist_name: "Seventeen",
    },
    {
      id: 3,
      artist_spotifyid: "4SpbR6yFEvexJuaBpgAU5p",
      artist_name: "LE SSERAFIM",
    },
  ]);
};
