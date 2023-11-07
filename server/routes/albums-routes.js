const router = require("express").Router();
const albumController = require("../controllers/albums-controller");

router.route("/artists").get(albumController.getAllArtistIds);
module.exports = router;
