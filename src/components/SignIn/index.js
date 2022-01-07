import React, { useState } from "react";
import axios from "axios";

function SignIn({ onRouteChange, loadUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitSignIn = () => {
    axios
      .post("https://radiant-journey-70800.herokuapp.com/signin", {
        email,
        password,
      })
      .then(response => response.data)
      .then(user => {
        if (user ) {
          loadUser(user)
          onRouteChange("home");
        }
      });
  };
  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80 ">
        <div className="measure tc">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign in</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              className="f6 link dim black db pointer"
              onClick={() => onRouteChange("register")}
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
}

export default SignIn;
