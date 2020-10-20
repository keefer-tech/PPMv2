const request = require("request");
const querystring = require("querystring");
const axios = require('axios')
const faker = require('faker')

require("dotenv").config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const { getUserFromDb, addOrUpdateUser } = require('./utils.model')
const { getBarChartOptions, getBarChartData, 
        getLineChartOptions, getLineChartData,
        getRadarChartOptions, getRadarChartData,
        getPieChartOptions, getPieChartData
      } = require('./utils.chart')




function setOptions(url, access_token) {
  return {
    url: url,
    headers: { Authorization: "Bearer " + access_token },
    json: true,
  };
}


function generateRandomString(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};



async function refreshAccessToken(username) {

  let user = await getUserFromDb(username)
  let refresh_token = user.refreshToken
  let url = "https://accounts.spotify.com/api/token"
  const auth = Buffer
          .from(`${CLIENT_ID}:${CLIENT_SECRET}`)
          .toString('base64')

  const params = 'grant_type=refresh_token&refresh_token=' + refresh_token
          + '&client_id=' + CLIENT_ID
          + '&client_secret=' + CLIENT_SECRET

  try {
    let resp = await axios.post(url, params,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }
    )
    // update the local user object to then send to the DB
    user.accessToken = resp.data.access_token
    try {
      await addOrUpdateUser(user)
      return resp.data.access_token
    } catch (err) {
      console.log(`Error updating user in refreshAccessToken: ${err}`)
    }
    
  } catch (error) {
    console.log(`Error in refreshAccessToken: ${error}`)
  }

}



function generatePlaylistName() {
  // get random playlist name from faker
  let playlistName = `ppm-${faker.vehicle.color()}-${faker.random.word()}-${faker.vehicle.model()} `
  console.log(playlistName);
}



function sortPlaylistsIntoChartData(data) {
  
  let chartData = {
    pie: {
      type: "pie",
      data: getPieChartData(data),
      options: getPieChartOptions(),
    },
    bar: {
      type: "bar",
      data: getBarChartData(data),
      options: getBarChartOptions(),
    },
    line: {
      type: "line",
      data: getLineChartData(data),
      options: getLineChartOptions(),
    },
    radar: {
      type: "radar",
      data: getRadarChartData(data),
      options: getRadarChartOptions(),
    },
  };

  return chartData
}






module.exports = { 
  setOptions,
  generateRandomString,
  refreshAccessToken,
  generatePlaylistName,
  sortPlaylistsIntoChartData
}

