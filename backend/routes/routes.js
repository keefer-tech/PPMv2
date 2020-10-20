const express = require("express");
const router = express.Router();
const request = require("request");
const querystring = require("querystring");
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI =
  process.env.REDIRECT_URI || "http://localhost:5000/callback";
const STATE_KEY = "spotify_auth_state";

const { filterByCommonArtists } = require("../utils/utils.chart")
const getAllData = require("../utils/utils.guest");

const {
  setOptions,
  generateRandomString,
  refreshAccessToken,
  generatePlaylistName,
  sortPlaylistsIntoChartData,
} = require("../utils/utils");

const {
  addOrUpdateUser,
  checkIfPlaylistNameExists,
  savePlaylistToGuestDb,
  getPlaylistFromGuestDb,
} = require("../utils/utils.model");

// LOG THE USER INTO THEIR SPOTIFY ACCOUNT

router.get("/login", function (req, res) {
  let state = generateRandomString(16);
  res.cookie(STATE_KEY, state);

  // your application requests authorization
  let scope =
    "user-read-private user-read-email playlist-read-private playlist-read-collaborative user-follow-read";
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
    res.redirect(
      "http://localhost:3000?" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
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
          Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
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
            refreshToken: refresh_token,
          };

          // ADD USER TO DATABASE
          await addOrUpdateUser(user);

          // we can also pass the token to the browser to make requests from there
          res.redirect(`http://localhost:3000/user`);
        });
      } else {
        res.redirect(
          "http://localhost:3000?" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

// GET DATA FOR USER

// GET FIRST 50 PLAYLISTS FROM AUTHORIZED USER

router.post("/compare", async (req, res) => {
  // get the username and access token from the params

  let { username } = req.body;
  let access_token = await refreshAccessToken(username);
  let limit = 50;
  let offset = 0;

  // get the first 50 playlists from the user
  let playListUrl = `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`;
  let playListOptions = setOptions(playListUrl, access_token);
  let playlists = [];

  // use the access token to access the Spotify Web API
  request.get(playListOptions, (error, response, body) => {
    // get the wanted data out of the body sent back from spotify

    playlists = body.items.map((e) => ({
      name: e.name,
      id: e.id,
      link: e.href,
      public: e.public,
      trackLink: e.tracks.href,
    }));

    // send the current user playlists to the DB
    res.send(playlists);
  });
});

// GET PUBLIC PLAYLISTS OF A FRIEND

router.post("/friend/playlist", async (req, res) => {
  // get the username and access token from the params
  // let { username, access_token } = req.params

  let { username, friend_username } = req.body;
  let access_token = await refreshAccessToken(username);
  let limit = 50;
  let offset = 0;

  // send the friends username to the DB

  // get the first 50 playlists from the user
  let playListUrl = `https://api.spotify.com/v1/users/${friend_username}/playlists?limit=${limit}&offset=${offset}`;
  let playListOptions = setOptions(playListUrl, access_token);
  let friendPlaylists = [];

  // use the access token to access the Spotify Web API
  request.get(playListOptions, (error, response, body) => {
    // console.log(response);
    // get the wanted data out of the body sent back from spotify

    friendPlaylists = body.items.map((e) => ({
      name: e.name,
      id: e.id,
      link: e.href,
      public: e.public,
      trackLink: e.tracks.href,
    }));
    // send the friends playlists to the DB

    res.send(friendPlaylists);
  });
});

// GET ALL SONGS FROM MULTIPLE PLAYLISTS

router.post("/user/friend/compare", async (req, res) => {
  // this will be an array of playlist ID strings
  let { playlistArray, username } = req.body;

  // get random playlist name from faker
  // generate playlist name
  let playlistName = await generatePlaylistName();

  // redirect to playlist page and show loading on FE
  // res.redirect(`http://localhost:3000/user/friend/compare/${playlistName}`)
  // res.send({ redirect: `/user/friend/compare/${playlistName}` });
  
  // make api calls to get data
  // this will take some time
  let filteredTracks = await getPlaylistItems(playlistArray, username);

  // send the data back to front end, I hope this works
  res.send(filteredTracks);
});

// GUEST ACCOUNT ROUTES

// GET publicLiked PLAYLISTS TO ANALYSE

router.post("/guest/analyse", async (req, res) => {
  // get the username and access token from the params

  let userArray = req.body.users;

  // get all the tracks from the 2 publicLiked playlists
  let data = await getAllData(userArray);

  // generate playlist name
  let playlistName = await generatePlaylistName();

  // check if playlistName exists
  let bool = await checkIfPlaylistNameExists(playlistName);

  // if the name does exist then generate a new one
  // I'm not doing a loop here because I can't be bothered for now
  // but need one in future
  if (bool) {
    playlistName = await generatePlaylistName();
  }
  console.log(`playlistName: ${playlistName}`);

  // create object to save to DB
  let objectToSaveToGuestDb = {
    playlistName: playlistName,
    data: data,
    users: userArray.length,
  };

  // save object to DB
  await savePlaylistToGuestDb(objectToSaveToGuestDb);

  res.send({ redirect: `/guest/${playlistName}` });
});

router.get("/data/:playlistName", async (req, res) => {
  let { playlistName } = req.params;

  let playlist = await getPlaylistFromGuestDb(playlistName);
  let playlistData = playlist.data
  let filteredData = filterByCommonArtists(playlistData)
  let chartData = await sortPlaylistsIntoChartData(filteredData);

  res.send({filteredData, chartData});
});

module.exports = {
  router,
};
