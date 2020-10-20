const UserModel = require('../models/user.model');
const GuestModel = require('../models/guest.model');


function addOrUpdateUser(user) {

  const newUser = new UserModel(user)


  //TODO this exist call is redundant, I should just fetch the user and see if it is true or not


  UserModel.exists({username: user.username}, async (err, res) => {
    if (err) {
      // log the error
      console.log(`Error while checking if user exists on DB. Error: ${error}`);
    } else {
      if (res) {
        // user exists
        try {
          await UserModel.findOneAndUpdate({username: user.username}, user, {new:true})
          console.log('user found and tokens updated');
        } catch (error) {
          console.log(`Error while updating tokens for user. Error: ${error}`);
        }
      } else {
        // user doesn't exist
        try {
          await newUser.save()
          console.log('user not found and added to DB');
        } catch (error) {
          console.log(`Error while adding new user to DB. Error: ${error}`);
        }
      }
    }
  })
}


function getUserFromDb(username) {
  try {
    return UserModel.findOne({username})
  } catch (error) {
    console.log(`Error in getUserFromDb: ${error}`);
  }
}




function getPlaylistFromGuestDb(playlistName) {
  try {
    return GuestModel.findOne({playlistName})
  } catch (error) {
    console.log(`Error in getPlaylistFromDb: ${error}`);
  }
}


function checkIfPlaylistNameExists(playlistName) {
  try {
    GuestModel.exists({playlistName}, (err, res) => {
      if (err) {
        console.log(`Error while checking if playlist name exists on DB. Error: ${error}`);
      } else {
        return res // 'res' should be a boolean
      }
    })
  } catch (error) {
    console.log(`Error in checkIfPlaylistNameExists: ${error}`);
  }
}


function savePlaylistToGuestDb(obj) {

  const newGuestPlaylist = new GuestModel(obj)

  try {
    await newGuestPlaylist.save()
    console.log('added playlist to Guest DB');
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
}