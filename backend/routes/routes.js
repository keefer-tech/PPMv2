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


const { setOptions, generateRandomString, refreshAccessToken } = require('../utils/utils');
const getAllData = require("../utils/utils.guest");
const { addOrUpdateUser } = require("../utils/utils.model");




// LOG THE USER INTO THEIR SPOTIFY ACCOUNT

router.get("/login", function (req, res) {

  let state = generateRandomString(16);
  res.cookie(STATE_KEY, state);

  // your application requests authorization
  let scope = "user-read-private user-read-email playlist-read-private playlist-read-collaborative user-follow-read";
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

// WHEN AUTHORIZED, REDIRECT BACK TO THE APP WITH THE TOKENS IN THE URL

router.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[STATE_KEY] : null;

  if (state === null || state !== storedState) {
    res.redirect("http://localhost:3000?" +
      querystring.stringify({
        error: 'state_mismatch'
      }));
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
          // "Basic " + new Buffer(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
          "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
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
        request.get(options, async (error, response, body) => {
          console.log(body);

          let user = {
            username: body.id,
            displayName: body.display_name,
            accessToken: access_token,
            refreshToken: refresh_token
          }

          // ADD USER TO DATABASE
          await addOrUpdateUser(user)

          // we can also pass the token to the browser to make requests from there
          res.redirect(`http://localhost:3000/user`)
        });

      } else {
        res.redirect("http://localhost:3000?" +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});



// GET FIRST 50 PLAYLISTS FROM AUTHORIZED USER

router.post('/compare', async (req, res) => {

  // get the username and access token from the params
  let { username } = req.body
  let access_token = await refreshAccessToken(username)
  let limit = 50

  // get the first 50 playlists from the user
  let playListUrl = `https://api.spotify.com/v1/me/playlists?limit=${limit}`
  let playListOptions = setOptions(playListUrl, access_token)
  let playlists = []

  // use the access token to access the Spotify Web API
  request.get(playListOptions, (error, response, body) => {
    // get the wanted data out of the body sent back from spotify
    playlists = body.items.map(e => ({
        name: e.name, 
        link: e.href, 
        public: e.public, 
        trackLink: e.tracks.href
    }))
    res.send(playlists)
  });
})



// GET PUBLIC PLAYLISTS OF A FRIEND

router.post('/friend/playlist', async (req, res) => {

  // get the username and access token from the params
  // let { username, access_token } = req.params
  let { username, friend_username } = req.body
  let access_token = await refreshAccessToken(username)
  let limit = 50

  // get the first 50 playlists from the user
  let playListUrl = `https://api.spotify.com/v1/users/${friend_username}/playlists?limit=${limit}`
  let playListOptions = setOptions(playListUrl, access_token)
  let friendPlaylists = []

  // use the access token to access the Spotify Web API
  request.get(playListOptions, (error, response, body) => {
    // console.log(response);
    // get the wanted data out of the body sent back from spotify
    friendPlaylists = body.items.map(e => ({
        name: e.name, 
        link: e.href, 
        public: e.public, 
        trackLink: e.tracks.href
    }))
    res.send(friendPlaylists)
  });
})


// GET publicLiked PLAYLISTS TO ANALYSE

router.post('/guest/analyse', async (req, res) => {

  // get the username and access token from the params
  let { userArray } = req.body
  let data = await getAllData(userArray)
  res.send(data)

})



module.exports = {
  router
};
