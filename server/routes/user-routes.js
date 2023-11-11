const router = require("express").Router();
const userController = require("../controllers/users-controller");

router
  .route("/collection")
  .get(userController.ViewAlbumsbyUser)
  .post(userController.AddAlbumToUserCollection);
module.exports = router;
