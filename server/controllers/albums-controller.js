const knex = require("knex")(require("../knexfile"));
const axios = require("axios");
const qs = require("qs");

const client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const auth_token = Buffer.from(`${client_id}:${client_secret}`).toString(
  "base64"
);

const getAuth = async () => {
  try {
    //make post request to SPOTIFY API for access token, sending relavent info
    const token_url = "https://accounts.spotify.com/api/token";
    const data = qs.stringify({ grant_type: "client_credentials" });

    const response = await axios.post(token_url, data, {
      headers: {
        Authorization: `Basic ${auth_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    //return access token
    return response.data.access_token;
    //console.log(response.data.access_token);
  } catch (error) {
    //on fail, log the error in console
    console.log(error);
  }
};

//Get All Artist Spotify IDs

const getAllAlbums = async (req, res) => {
  const token = await getAuth();

  axios
    .get(
      `https://api.spotify.com/v1/artists/2dIgFjalVxs4ThymZ67YCE/albums?include_groups=album%2Csingle&market=us`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      res.json(response.data.items);
    })
    .catch((error) => {
      res.json(error);
    });
};

const getAllArtistIds = (req, res) => {
  const artists = knex("artists").then((data) => {
    console.log(data);
    res.status(200).json(data);
  });
};

const getSingleArtist = (req, res) => {
  const artist = knex("artists")
    .where({ id: req.params.id })
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    });
};

module.exports = {
  getSingleArtist,
  getAllArtistIds,
  getAllAlbums,
};
