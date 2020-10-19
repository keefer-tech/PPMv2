const express = require("express");
const router = express.Router();
const querystring = require("querystring");
const request = require("request");
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI =
  process.env.REDIRECT_URI || "http://localhost:5000/callback";
const STATE_KEY = "spotify_auth_state";

const generateRandomString = function (length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get("/login", function (req, res) {
  console.log("ping!");

  let state = generateRandomString(16);
  res.cookie(STATE_KEY, state);

  // your application requests authorization
  let scope = "user-read-private user-read-email";
  // res.header('Access-Control-Allow-Origin', '*');
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state,
      })
  );
});

router.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[STATE_KEY] : null;

  // res.header('Access-Control-Allow-Origin', '*');

  if (state === null || state !== storedState) {
    // res.redirect('/#' +
    //   querystring.stringify({
    //     error: 'state_mismatch'
    //   }));
    res.send({
      error: "state_mismatch",
    });
  } else {
    res.clearCookie(STATE_KEY);
    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token,
          refresh_token = body.refresh_token;

        let options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, (error, response, body) => {
          console.log(body);
          personalData = body;

          // res.send({
          //   access_token,
          //   refresh_token,
          //   user: body,
          // });
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          "http://localhost:3000?" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        // res.redirect('/#' +
        //   querystring.stringify({
        //     error: 'invalid_token'
        //   }));

        res.send({
          error: "invalid_token",
        });
      }
    });
  }
});

router.get("/refresh_token", function (req, res) {
  // requesting access token from refresh token
  let refresh_token = req.query.refresh_token;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

module.exports = {
  router,
  // getMyInfo
};
