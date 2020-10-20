require("dotenv").config();
const axios = require("axios");
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const getAuthToken = async () => {
  // a 64bit encoded "client_id:client_secret"
  const encodedSecret = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );

  try {
    let res = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization: `Basic ${encodedSecret}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: "grant_type=client_credentials",
    });

    return res;
  } catch (e) {
    console.error(e);
  }
};

// takes a user id and playlist name and returns the playlist id
// optional: limit and offset if target playlist is deeper in list
const getPlaylistId = async (
  userId,
  playlistName = "publicLiked",
  limit = 50,
  offset = 0
) => {
  let endpointUrl = `https://api.spotify.com/v1/users/${userId}/playlists?limit=${limit}&offset=${offset}`;
  let auth = await getAuthToken();

  try {
    let res = await axios({
      method: "get",
      url: endpointUrl,
      headers: {
        Authorization: `Bearer ${auth.data.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    let playlistEndpoint;
    for (playlist of res.data.items) {
      playlist.name === playlistName
        ? (playlistEndpoint = playlist.tracks.href)
        : "";
    }
    return playlistEndpoint;
  } catch (e) {
    console.error(e);
  }
};

// This functions gets all the tracks from a playlist and returns them in a array
const getPlaylistItems = async (endpointUrl) => {
  if (endpointUrl.hasOwnProperty("error")) {
    return endpointUrl;
  }
  let auth = await getAuthToken();

  let allItems = [];
  while (true) {
    try {
      let res = await axios({
        method: "get",
        url: endpointUrl,
        headers: {
          Authorization: `Bearer ${auth.data.access_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      endpointUrl = res.data.next;
      let newItems = res.data.items;
      allItems = allItems.concat(newItems);
      if (res.data.next === null) {
        break;
      }
    } catch (e) {
      // console.error({ e });
      break;
    }
  }
  return allItems;
};

const getDisplayName = async (userId) => {
  console.log("getting display name for:", userId);
  let endpointUrl = `https://api.spotify.com/v1/users/${userId}`;
  let auth = await getAuthToken();
  try {
    let res = await axios({
      method: "get",
      url: endpointUrl,
      headers: {
        Authorization: `Bearer ${auth.data.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return res.data.display_name;
  } catch (e) {
    console.error(e);
  }
};

// this processes the data down to a useable object
const processApiData = async (userId) => {
  try {
    let displayName = await getDisplayName(userId);
    let playlistUrl = await getPlaylistId(userId);
    let playlistItems = await getPlaylistItems(playlistUrl);

    for (let res of [displayName, playlistUrl, playlistItems]) {
      if (res.hasOwnProperty("error")) {
        // console.log({ res });
        return res;
      }
    }

    let tracks = [];

    playlistItems.forEach((t) => {
      track = {
        name: t.track.name,
        artist: t.track.artists[0].name,
        album: t.track.album.name,
        release_date: t.track.album.release_date,
        popularity: t.track.popularity,
        link: t.track.external_urls.spotify,
        id: t.track.id,
        from_user: t.added_by.id,
        username: displayName,
      };
      tracks.push(track);
    });
    // console.log({ tracks });
    return tracks;
  } catch (e) {
    return {
      error: "No Tracks",
      msg: `Error: Did not receive track data from at least 1 user. Please ensure all User ID's are correct and that the 'publicLiked' playlists contain track data.`,
    };
  }
};

const getAllData = async (userArray) => {
  let apiCalls = [];
  try {
    userArray.forEach((user) => {
      apiCalls.push(processApiData(user));
    });
    const userDataArray = await Promise.all(apiCalls);
    for (let res of userDataArray) {
      if (res.hasOwnProperty("error")) {
        return res;
      }
    }
    return userDataArray;
  } catch (e) {
    console.error(e);
  }
};

module.exports = getAllData;
