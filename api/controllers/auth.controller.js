const { default: axios } = require("axios");
const mongoose = require("mongoose");
const User = mongoose.model("user");

async function getGoogleUserData(accessToken) {
  // add the access token to the header
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  // make a request to the google api
  const response = await axios.get(
    "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
    { headers }
  );
  let userInfo = response.data;
  console.log(userInfo);
  return userInfo;
}

exports.signIn_google = async (req, res) => {
  const { token } = req.params;
  const userInfo = await getGoogleUserData(token);
  // check if the user exists in the database
  const user = await User.findOne({ email: userInfo.email });
  if (user) {
    // if the user exists, return the user
    res.json(user);
  }
  // if the user does not exist, create a new user
  const newUser = new User({
    name: userInfo.name,
    email: userInfo.email,
    googleId: userInfo.id,
    profilePicture: userInfo.picture,
    provider: "google",
    createdTime: new Date(),
    lastLoginTime: new Date(),
  });

  await newUser.save();
  res.json(newUser);
};
