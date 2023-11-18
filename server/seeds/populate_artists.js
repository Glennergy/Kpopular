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
      image_url:
        "https://i.scdn.co/image/ab6761610000e5eb0610877c41cb9cc12ad39cc0",
    },
    {
      artist_spotifyid: "7nqOGRxlXj7N2JYbgNEjYH",
      artist_name: "Seventeen",
      image_url:
        "https://i.scdn.co/image/ab6761610000e5eb61916bb9f5c6a1a9ba1c9ab6",
    },
    {
      artist_spotifyid: "4SpbR6yFEvexJuaBpgAU5p",
      artist_name: "LE SSERAFIM",
      image_url:
        "https://i.scdn.co/image/ab6761610000e5eb99752c006407988976248679",
    },
    {
      artist_spotifyid: "3Nrfpe0tUJi4K4DXYWgMUX",
      artist_name: "BTS",
      image_url:
        "https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a",
    },
    {
      artist_spotifyid: "4Kxlr1PRlDKEB0ekOCyHgX",
      artist_name: "BIGBANG",
      image_url:
        "https://i.scdn.co/image/ab6761610000e5eb597a4257d0022e2ac837fa7d",
    },
    {
      artist_spotifyid: "41MozSoPIsD1dJM0CLPjZF",
      artist_name: "BLACKPINK",
      image_url:
        "https://i.scdn.co/image/ab6761610000e5ebc9690bc711d04b3d4fd4b87c",
    },
    {
      artist_spotifyid: "5r1tUTxVSgvBHnoDuDODPH",
      artist_name: "IZ*ONE",
      image_url:
        "https://i.scdn.co/image/ab6761610000e5eba6b0d348c125a072e5284b3e",
    },
    {
      artist_spotifyid: "6RHTUrRF63xao58xh9FXYJ",
      artist_name: "IVE",
      image_url:
        "https://i.scdn.co/image/ab6761610000e5eb0e46f140189de1eba9ab6230",
    },
    {
      artist_spotifyid: "6YVMFz59CuY7ngCxTxjpxE",
      artist_name: "aespa",
      image_url:
        "https://i.scdn.co/image/ab6761610000e5ebbe7e71571cf58f1b9a36f0f7",
    },
    {
      artist_spotifyid: "0ghlgldX5Dd6720Q3qFyQB",
      artist_name: "TOMORROW X TOGETHER",
      image_url:
        "https://i.scdn.co/image/ab6761610000e5eb8b446e5bd3820ac772155b31",
    },
    {
      artist_spotifyid: "7n2Ycct7Beij7Dj7meI4X0",
      artist_name: "TWICE",
      image_url:
        "https://i.scdn.co/image/ab6761610000e5eb8944c8aec8db82f35980b191",
    },
  ]);
};
