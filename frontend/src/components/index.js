import React from "react";

export default function index() {
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
                  <a href="" className="button is-rounded is-primary">
                    Login
                  </a>
                  <a href="" className="button is-rounded is-outlined">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="container has-text-centred">
                <h1 className="title">Basic visualizations of your music</h1>
                <div className="buttons are-large is-centered">
                  <a href="" className="button is-rounded is-dark">
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
