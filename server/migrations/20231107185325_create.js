exports.up = function (knex) {
  return knex.schema
    .createTable("user", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable();
      table.string("user_spotifyid").notNullable();
      table.string("full_name", 75).notNullable();
      table.string("avatar_url").notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("usercollection", (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.string("spotify_id", 75).notNullable();
      table.string("album_name").notNullable();
      table.string("artist_name").notNullable();
      table.string("image_url").notNullable();
      table.timestamp("date_added").defaultTo(knex.fn.now());
      table
        .foreign("user_id")
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })

    .createTable("artists", (table) => {
      table.increments("id").primary();
      table.string("artist_spotifyid").notNullable();
      table.string("artist_name", 75).notNullable();
      table.string("image_url").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("usercollection")
    .dropTable("user")
    .dropTable("artists");
};
