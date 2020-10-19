import React from "react";
import MainTitle from "../components/Headers/MainTitle";
import HeroButton from "../components/Buttons/HeroButton";
import axios from 'axios'

export default function Index() {

  async function getPlaylists() {

    try {
      let res = await axios({
        method: "post",
        url: "http://localhost:5000/compare",
        headers: {},
        data: {
          username: "1231189291",
          friend_username: "1231189291",
          simon: "1231189291",
          tyler: "tylerhall12",
          keefer: "12179586444",
          phil: "22nllj3rpfhvzlgt5hin5aqra",
        },
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getFriendPlaylist() {

    try {
      let res = await axios({
        method: "post",
        url: "http://localhost:5000/friend/playlist",
        headers: {},
        data: {
          username: "1231189291",
          friend_username: "1231189291",
          simon: "1231189291",
          tyler: "tylerhall12",
          keefer: "12179586444",
          phil: "22nllj3rpfhvzlgt5hin5aqra",
        },
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }

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

                  <button onClick={getPlaylists}>get my plalists</button>
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
