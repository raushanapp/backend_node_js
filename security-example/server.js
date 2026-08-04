const fs = require("fs");
const path = require("path");
const https = require("https");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const cookieSession = require("cookie-session");

const { googleAuthConfig } = require("./config");

const PORT = 3000;

const AUTH_OPTIONS = {
  clientID: googleAuthConfig.CLIENT_ID,
  clientSecret: googleAuthConfig.CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  // TODO: Implement verification logic
  console.log("Google Profile:", profile);
  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieve the session from the cookie
passport.deserializeUser((id, done) => {
  // User.findById(id)
  //   .then((user) => {
  //     done(null, user);
  //   })
  //   .catch((err) => {
  //     done(err, null);
  //   }); // req.user
  done(null, id);
});

//  define the Express app
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(helmet());

app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [googleAuthConfig.COOKIE_KEY_1, googleAuthConfig.COOKIE_KEY_2],
  }),
);

app.use((req, res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => {
      cb();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

function checkLoggedIn(req, res, next) {
  console.log("Current user is", req.user);
  // req.user
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).send({ error: "You must be logged in" });
  }
  next();
}

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res) => {},
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true,
  }),
  (req, res) => {
    console.log("Google callback received");
  },
);

app.get("/auth/logout", (req, res, next) => {
  // Remove req.user and clears any logged in sessions
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      res.redirect("/");
    }
  });
});

app.get("/secret", checkLoggedIn, (req, res) => {
  return res.status(200).send("Your personal secret value is 45!");
});

app.get("/failure", (req, res) => {
  return res.status(401).send("Authentication failed");
});

app.get("/*path", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app,
  )
  .listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
  });
