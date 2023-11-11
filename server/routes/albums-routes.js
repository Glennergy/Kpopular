const router = require("express").Router();
const albumController = require("../controllers/albums-controller");

router.route("/:id").get(albumController.getAllAlbums);
router.route("/artists/album").get(albumController.getSingleAlbumDetails);
router.route("/artists").get(albumController.getAllArtistIds);
router.route("/artists/:id").get(albumController.getSingleArtist);
module.exports = router;
