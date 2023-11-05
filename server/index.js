const express = require("express");

// Middleware for creating a session id on server and a session cookie on client
const expressSession = require("express-session");

// cors package prevents CORS errors when using client side API calls
const cors = require("cors");

// Add http headers, small layer of security
const helmet = require("helmet");

// Passport library and Github Strategy
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;

// Knex instance
const knex = require("knex")(require("./knexfile.js"));

// Create Express app and also allow for app PORT to be optionally specified by an environment variable
const app = express();
const PORT = process.env.PORT || 5050;

// Require .env files for environment variables (keys and secrets)
require("dotenv").config();

// Enable req.body middleware
app.use(express.json());

// Initialize HTTP Headers middleware
app.use(helmet());

// Enable CORS (with additional config options required for cookies)
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Include express-session middleware (with additional config options required for Passport session)
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.session());

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: process.env.SPOTIFY_CALLBACK_URL,
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      console.log("spotify profile:", profile);
      knex("user")
        .select("id")
        .where({ user_spotifyid: profile.id })
        .then((user) => {
          if (user.length) {
            // If user is found, pass the user object to serialize function
            done(null, user[0]);
          } else {
            // If user isn't found, we create a record
            knex("user")
              .insert({
                user_spotifyid: profile.id,
                username: profile.username,
              })
              .then((userId) => {
                // Pass the user object to serialize function
                done(null, { id: userId[0] });
              })
              .catch((err) => {
                console.log("Error creating a user", err);
              });
          }
        })
        .catch((err) => {
          console.log("Error fetching a user", err);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serializeUser (user object):", user);

  // Store only the user id in session
  done(null, user.id);
});

const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}.`);
});
