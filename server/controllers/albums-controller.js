const knex = require("knex")(require("../knexfile"));
const axios = require("axios");
const qs = require("qs");

const client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const auth_token = Buffer.from(`${client_id}:${client_secret}`).toString(
  "base64"
);

// Function to get token to pass to Spotify API
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
  } catch (error) {
    //on fail, log the error in console
    console.log(error);
  }
};

//Get All Albums for a certain Artist

const getAllAlbums = async (req, res) => {
  const token = await getAuth();

  axios
    .get(
      `https://api.spotify.com/v1/artists/${req.params.id}/albums?include_groups=album%2Csingle&market=US&limit=50`,
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

// Gets the Details for a Single Album ID
const getSingleAlbumDetails = async (req, res) => {
  const token = await getAuth();
  axios
    .get(`https://api.spotify.com/v1/albums/${req.params.spotifyid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data.tracks.items);
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
};

// Get all Artist Spotify IDs
const getAllArtistIds = (req, res) => {
  const artists = knex("artists").then((data) => {
    console.log(data);
    res.status(200).json(data);
  });
};

// Get a Single Artist Spotify ID from SQL
const getSingleArtist = (req, res) => {
  const artist = knex("artists")
    .where({ id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    });
};

module.exports = {
  getSingleArtist,
  getSingleAlbumDetails,
  getAllArtistIds,
  getAllAlbums,
};
