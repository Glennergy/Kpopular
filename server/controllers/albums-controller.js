const knex = require("knex")(require("../knexfile"));

//Get All Artist Spotify IDs

const getAllArtistIds = (req, res) => {
  const artists = knex("artists").then((data) => {
    console.log(data);
    res.status(200).json(data);
  });
};

module.exports = {
  getAllArtistIds,
};
