import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import FaceRecognition from "./components/FaceRecognition";
import Particles from "react-particles-js";

import Clarifai from "clarifai";

const particlesOptions = {
  particles: {
    number: {
      value: 160,
      denisty: {
        enable: true,
        value_area: 800,
      },
    },
    move: {
      enable: true,
      speed: 1,
    },
  },
};

export default function App() {
  const app = new Clarifai.App({ apiKey: "cfd21d3c89df48d4b833b00e324d431e" });

  const [input, setInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signIn");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: "",
  });

  useEffect(() => {
    setImgUrl("");
  }, []);

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log('height:',height,' . widht: ',width);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = (e) => {
    setImgUrl(input);
    app.models
      .predict("a403429f2ddf4b49b307e318f00e528b", input)
      .then((response) => {
        if (response) {
          axios
            .put("https://radiant-journey-70800.herokuapp.com/image", {
              id: user.id,
            })
            .then((response) => response.data)
            .then((entries) => {
              if (entries) {
                setUser({ ...user, entries });
              }
            })
            .catch(err => console.log(err))
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => {
        console.log("Clarifai Error:", err);
      });
  };

  const onRouteChange = (routeName) => {
    setRoute(routeName);
    routeName === "home" ? setIsSignedIn(true) : setIsSignedIn(false);
    if (routeName === "signIn") {
      setImgUrl("");
    }
  };

  return (
    <div className="app">
      <Particles params={particlesOptions} className="particles" />
      <Navigation
        onRouteChange={(route) => onRouteChange(route)}
        isSignedIn={isSignedIn}
      />
      {route === "home" ? (
        <>
          <Logo />
          <Rank rank={user.entries} name={user.name} />
          <ImageLinkForm
            onButtonSubmit={onSubmit}
            onInputChange={onInputChange}
          />
          <FaceRecognition imgSrc={imgUrl} box={box} />
        </>
      ) : route === "signIn" ? (
        <SignIn
          loadUser={(user) => setUser(user)}
          onRouteChange={(route) => onRouteChange(route)}
        />
      ) : (
        <Register
          loadUser={(user) => setUser(user)}
          onRouteChange={(route) => onRouteChange(route)}
        />
      )}
    </div>
  );
}
