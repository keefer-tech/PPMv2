import React, { useState } from "react";
import MainTitle from "../components/Headers/MainTitle";
import HeroButton from "../components/Buttons/HeroButton";
import axios from "axios";

export default function Index() {
  const [accessToken, setAccessToken] = useState()

  async function getPlaylists() {

    let access_token = "BQDBxhyH2vmqR8iKkWAwwbkosHJRayoVBiMYaJD-Vz5eluQL1G71AtC6c9jbB-eF_FqcmXUNLDaTGL7YOak_Z_Q3OWZ7yeOkimCJd3efdvWjtmKjBQos-QxE9A5p2K94JjgDsK9fs8pi0XbmJZloRMN3XKDnQ7vZk6QZmWPgNlZFl9KV7MRQ&refresh_token=AQDwHm8DcEa-MsdXKa6NnN_jBwo6Y1nWWTQEtC1uOQ5ou8rpZiNw0QVGdXyTXDHPIVyzJxitb-6ckSr2C0QDVzi4_g09ugaAMlh2DQ_yDk0hCpdqIA5sCkoEhprwXGHKAmc"
    let username = "simo_sultan"

    try {
      let res = await axios.get(`http://localhost:5000/compare/${username}/${access_token}`)
      console.log(res.data);
    } catch (error) {
      console.error(error)
    }
  }

  async function getFriendPlaylist() {

    let access_token = "BQDBxhyH2vmqR8iKkWAwwbkosHJRayoVBiMYaJD-Vz5eluQL1G71AtC6c9jbB-eF_FqcmXUNLDaTGL7YOak_Z_Q3OWZ7yeOkimCJd3efdvWjtmKjBQos-QxE9A5p2K94JjgDsK9fs8pi0XbmJZloRMN3XKDnQ7vZk6QZmWPgNlZFl9KV7MRQ&refresh_token=AQDwHm8DcEa-MsdXKa6NnN_jBwo6Y1nWWTQEtC1uOQ5ou8rpZiNw0QVGdXyTXDHPIVyzJxitb-6ckSr2C0QDVzi4_g09ugaAMlh2DQ_yDk0hCpdqIA5sCkoEhprwXGHKAmc"
    // let username = "22nllj3rpfhvzlgt5hin5aqra" // phil
    let username = "12179586444" // keefer
    // let username = "tylerhall12" // tyler
    // let username = "1231189291" // simon

    try {
      let res = await axios.get(`http://localhost:5000/friend/${username}/${access_token}`)
      console.log(res.data);
    } catch (error) {
      console.error(error)
    }
  }

  // async function getRefreshToken() {

  //   let access_token = "BQCCQVVOhpL53Ax6YlmUAJBPq1HMJqEfIPf2-xT0lj02jcq6asA-WWK46_1iDCp7lEDNFUCNDdBZoBz1kYLLL5W4OJu3UyUThs_syyQpdktfdH-ag_C1yCw1sjt5PNo_KXgHv3-INt0kfXRK2sZNfDmLcsGLMb049SjNNXV71YA4TTVy4uof"
  //   let refresh_token = "refresh_token=AQCvu4TGuqznBuiu9LKMmrJ0iBn_pK1o65gsdndzNTlEG4doZbsLah8rIAfiqDKJ_vRWhwPN7pPnCV2v9d8gcAesLghOYIf4hv0C13BFuG6yV71QRBePzz-icIbrVjkIaO4"

  //   try {
  //     let res = await axios.get(`http://localhost:5000/refresh_token?${refresh_token}}`)
  //     console.log(res);
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // access_token=BQD1odfDwJ0n9mxuddO47A0V5Rg0oEj0P3tWQEFJqj4l5nd8f1hS7cXkgixHrwjNKbt1WKVcMMB9h78rwhCRKmUYqBp--_cFU1V9TABXBtLmfdCENqXbN-dT7TpSSynT-BKu3p92m3wzt_V59L-1BMuWKD3kG83gnBVGDhqTqrFctZ329utF
  // refresh_token=AQCw7UoQ2OWi3Wz06KIicV3pVL92lwAbBYWZ4ZvY4waCr3T3we9RW7KWQ9w8ARWlzzWAcJiCrVtSSPYaR9mjigTsE0b36BCDKtJUtXqfQnwUVhl2tzAXjkUPJUya7o6loZk

  return (
    <div>
      <section>
        <MainTitle />
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="container has-text-centered">
                <h1 className="title">Cool analytics with your music!</h1>
                <div className="buttons are-large is-centered">
                  <HeroButton
                    href={"http://localhost:5000/login"}
                    colour={"primary"}
                    name={"Log in"}
                  />
                  <HeroButton href={""} colour={"outlined"} name={"Sign up"} />

                  {/* <button href="http://localhost:5000/refresh_token?refresh_token=AQCw7UoQ2OWi3Wz06KIicV3pVL92lwAbBYWZ4ZvY4waCr3T3we9RW7KWQ9w8ARWlzzWAcJiCrVtSSPYaR9mjigTsE0b36BCDKtJUtXqfQnwUVhl2tzAXjkUPJUya7o6loZk">get new access token</button> */}
                  {/* <button onClick={getRefreshToken}>get new access token</button> */}
                  <button onClick={getPlaylists}>get my playlists</button>
                  <button onClick={getFriendPlaylist}>get friends playlist</button>

                </div>
              </div>
            </div>
            <div className="column">
              <div className="container has-text-centred">
                <h1 className="title">Basic visualizations of your music</h1>
                <div className="buttons are-large is-centered">
                  <HeroButton href={"/guest"} colour={"dark"} name={"Guest"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}