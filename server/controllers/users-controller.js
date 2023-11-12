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
  } catch (error) {
    //on fail, log the error in console
    console.log(error);
  }
};

const AddAlbumToUserCollection = (req, res) => {
  if (req.user === undefined)
    return res.status(401).json({ message: "Not Logged In" });
  if (!req.body.spotify_id || !req.body.artist) {
    return res.status(400).json({ message: "Missing Album Id or Artist Name" });
  }
  knex("usercollection")
    .select("id")
    .where({
      user_id: req.user.id,
      spotify_id: req.body.spotify_id.id,
    })
    .then((user) => {
      if (user.length) {
        // If user is found, pass the user object to serialize function
        res.status(400).json({ message: "album already in user's collection" });
      } else {
        knex("usercollection")
          .insert({
            user_id: req.user.id,
            spotify_id: req.body.spotify_id.id,
            album_name: req.body.album_name.name,
            artist_name: req.body.artist.artist,
            image_url: req.body.image_url.image,
          })
          .then((collectionID) => {
            res.status(201).json({ newCollectionId: collectionID });
          })
          .catch(() => {
            res
              .status(500)
              .json({ message: "Error Adding Album to Collection" });
          });
      }
    });
};

const ViewAlbumsbyUser = async (req, res) => {
  if (req.user === undefined)
    return res.status(401).json({ message: "Not Logged In" });
  knex("usercollection")
    .where({ user_id: req.user.id })
    .then((albumCollection) => {
      if (albumCollection === 0) {
        return res.status(404).json({
          message: `No Albums under that User`,
        });
      }
      res.status(200).json(albumCollection);
    });
};

const RemoveAlbumFromCollection = async (req, res) => {
  if (req.user === undefined)
    return res.status(401).json({ message: "Not Logged In" });
  if (!req.body.spotify_id || !req.body.artist) {
    return res.status(400).json({ message: "Missing Album Id or Artist Name" });
  }
  knex("usercollection")
    .select("id")
    .where({
      user_id: req.user.id,
      spotify_id: req.body.spotify_id.id,
    })
    .then((user) => {
      if (!user.length) {
        // If user is found, pass the user object to serialize function
        console.log("album found in collection");
        res.status(400).json({ message: "album is not in user's collection" });
      } else {
        knex("usercollection")
          .where({
            user_id: req.user.id,
            spotify_id: req.body.spotify_id.id,
          })
          .delete()
          .then((collectionID) => {
            res.status(201).json({ newCollectionId: collectionID });
          })
          .catch(() => {
            res
              .status(500)
              .json({ message: "Error Deleting Album from Collection" });
          });
      }
    });
};

module.exports = {
  AddAlbumToUserCollection,
  ViewAlbumsbyUser,
};
