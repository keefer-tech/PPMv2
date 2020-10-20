const UserModel = require("../models/user.model");
const GuestModel = require("../models/guest.model");

function addOrUpdateUser(user) {
  const newUser = new UserModel(user);

  //TODO this exist call is redundant, I should just fetch the user and see if it is true or not

  UserModel.exists({ username: user.username }, async (err, res) => {
    if (err) {
      // log the error
      console.log(`Error while checking if user exists on DB. Error: ${error}`);
    } else {
      if (res) {
        // user exists
        try {
          await UserModel.findOneAndUpdate({ username: user.username }, user, {
            new: true,
          });
          console.log("user found and tokens updated");
        } catch (error) {
          console.log(`Error while updating tokens for user. Error: ${error}`);
        }
      } else {
        // user doesn't exist
        try {
          await newUser.save();
          console.log("user not found and added to DB");
        } catch (error) {
          console.log(`Error while adding new user to DB. Error: ${error}`);
        }
      }
    }
  });
}

async function getUserFromDb(username) {
  try {
    let user = await UserModel.findOne({ username });
    return user;
  } catch (error) {
    console.log(`Error in getUserFromDb: ${error}`);
  }
}

async function getPlaylistFromGuestDb(playlistName) {
  try {
    let playlist = await GuestModel.findOne({ playlistName });
    return playlist;
  } catch (error) {
    console.log(`Error in getPlaylistFromDb: ${error}`);
  }
}

async function checkIfPlaylistNameExists(playlistName) {
  try {
    let playlist = await GuestModel.findOne({ playlistName });
    if (playlist) return true
    return false
  } catch (error) {
    console.log(`Error in checkIfPlaylistNameExists: ${error}`);
  }
}

async function savePlaylistToGuestDb(obj) {
  const newGuestPlaylist = new GuestModel(obj);

  try {
    await newGuestPlaylist.save();
    console.log("added playlist to Guest DB");
  } catch (error) {
    console.log(`Error while adding new Playlist to Guest DB. Error: ${error}`);
  }
}

module.exports = {
  addOrUpdateUser,
  getUserFromDb,
  getPlaylistFromGuestDb,
  checkIfPlaylistNameExists,
  savePlaylistToGuestDb,
};
