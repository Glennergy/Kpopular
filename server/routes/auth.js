const express = require("express");
const router = express.Router();

const passport = require("passport");

require("dotenv").config();

router.get("/spotify", passport.authenticate("spotify"));

router.get(
  "/spotify/callback",
  passport.authenticate("spotify", {
    failureRedirect: `${process.env.CLIENT_URL}/auth-fail`,
  }),
  (_req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get("/profile", (req, res) => {
  if (req.user === undefined)
    return res.status(401).json({ message: "Unauthorized" });
  console.log("USER IS HERE" + req.accessToken);
  res.status(200).json(req.user);
});

router.get("logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      return res.status(500).json({ message: "Error", error: error });
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

router.get("/success-callback", (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ message: "No User logged in" });
  }
});

module.exports = router;
