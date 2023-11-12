const router = require("express").Router();
const albumController = require("../controllers/albums-controller");

router.route("/artists").get(albumController.getAllArtistIds);
router.route("/details/:spotifyid").get(albumController.getSingleAlbumDetails);
router.route("/artists/:id").get(albumController.getSingleArtist);
router.route("/:id").get(albumController.getAllAlbums);
module.exports = router;
