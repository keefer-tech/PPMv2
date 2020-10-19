
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


module.exports = { 
  setOptions,
  generateRandomString
}