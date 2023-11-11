/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("artists").del();
  await knex("artists").insert([
    {
      artist_spotifyid: "2dIgFjalVxs4ThymZ67YCE",
      artist_name: "Stray Kids",
    },
    {
      artist_spotifyid: "7nqOGRxlXj7N2JYbgNEjYH",
      artist_name: "Seventeen",
    },
    {
      artist_spotifyid: "4SpbR6yFEvexJuaBpgAU5p",
      artist_name: "LE SSERAFIM",
    },
    {
      artist_spotifyid: "3Nrfpe0tUJi4K4DXYWgMUX",
      artist_name: "BTS",
    },
    {
      artist_spotifyid: "4Kxlr1PRlDKEB0ekOCyHgX",
      artist_name: "BIGBANG",
    },
    {
      artist_spotifyid: "41MozSoPIsD1dJM0CLPjZF",
      artist_name: "BLACKPINK",
    },
    {
      artist_spotifyid: "5r1tUTxVSgvBHnoDuDODPH",
      artist_name: "IZ*ONE",
    },
  ]);
};
