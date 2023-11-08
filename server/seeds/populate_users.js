/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("user").del();
  await knex("user").insert([
    {
      username: "test1",
      user_spotifyid: "asdf971r91hsdjfw",
      full_name: "Kim Burly",
      avatar_url: "N/A",
    },
  ]);
};
