import React, { useState } from "react";
import axios from 'axios'






export default function Index() {

  const [tokens, setTokens] = useState([])

  async function spotifyLogin() {
  
    try {
      let res = await axios.get('http://localhost:5000/login')
      setTokens(res)
      console.log(tokens);
    } catch (error) {
      console.error(error)
    }
  }




  return (
    <div>
      <section>
        <div className="level">
          <h1 className="title level-item has-text-centered is-1">
            PARTY PLAYLIST MAKER v2
          </h1>
        </div>
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="container has-text-centered">
                <h1 className="title">Cool analytics with your music!</h1>
                <div className="buttons are-large is-centered">
                  {/* <a href="/login" className="button is-rounded is-primary" onClick={() => spotifyLogin()}> */}
                  <a href="" className="button is-rounded is-primary">
                    Login
                  </a>
                  <button onClick={() => spotifyLogin()}>login</button>
                  <a href="/signup" className="button is-rounded is-outlined">
                    Sign Up
                  </a>
                </div>
                <div>{tokens}</div>
              </div>
            </div>
            <div className="column">
              <div className="container has-text-centred">
                <h1 className="title">Basic visualizations of your music</h1>
                <div className="buttons are-large is-centered">
                  <a href="/guest" className="button is-rounded is-dark">
                    Guest
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
