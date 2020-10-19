require("dotenv").config();


const getAuthToken = async () => {
  // a 64bit encoded "client_id:client_secret"
  const encodedSecret = process.env.ENCODED_SECRET

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic " + encodedSecret);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  try {
    let raw = await fetch(
      "https://accounts.spotify.com/api/token",
      requestOptions
    );
    let res = await raw.json();
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

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + auth.access_token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    let raw = await fetch(endpointUrl, requestOptions);
    if (!raw.ok) {
      return {
        error: "No Playlist",
        msg: `Could not locate playlist for user: ${userId}.`,
      };
    }
    let res = await raw.json();

    let playlistEndpoint;
    for (playlist of res.items) {
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
  var myHeaders = new Headers();

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + auth.access_token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  let allItems = [];
  while (true) {
    try {
      let raw = await fetch(endpointUrl, requestOptions);
      if (!raw.ok) {
        return {
          error: "Lost Playlist",
          msg: `Located playlist for user: ${userId}, but something went wrong.`,
        };
      }
      let res = await raw.json();
      endpointUrl = res.next;
      let newItems = res.items;
      allItems = allItems.concat(newItems);
      if (res.next === null) {
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
  console.log(userId);
  let endpointUrl = `https://api.spotify.com/v1/users/${userId}`;
  let auth = await getAuthToken();
  console.log('displayName');
  console.log(auth);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + auth.access_token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    let raw = await fetch(endpointUrl, requestOptions);
    if (!raw.ok) {
      return { error: "No User", msg: `Could not locate user: ${userId}.` };
    }
    let res = await raw.json();

    return res.display_name;
  } catch (e) {
    console.error(e);
  }
};

// this processes the data down to a useable object
const processApiData = async (userId) => {

  try {
    console.log('here');
    let displayName = await getDisplayName(userId);
    console.log('here2');
    let playlistUrl = await getPlaylistId(userId);
    console.log('here3');
    let playlistItems = await getPlaylistItems(playlistUrl);

    console.log(`displayName: ${displayName}`);
    console.log(`playlistUrl: ${playlistUrl}`);
    console.log(`playlistItems: ${playlistItems}`);

    for (let res of [displayName, playlistUrl, playlistItems]) {
      if (res.hasOwnProperty("error")) {
        console.log({ res });
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
    console.log({ tracks });
    return tracks;
  } catch (e) {
    return { error: "No Tracks", msg: `Error: Did not receive track data from at least 1 user. Please ensure all User ID's are correct and that the 'publicLiked' playlists contain track data.` };
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

module.exports = getAllData