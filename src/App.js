import React, { useState } from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn";
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
      .then((response) => displayFaceBox(calculateFaceLocation(response)))
      .catch((err) => {
        console.log("Clarifai Error:", err);
      });
  };

  return (
    <div className="app">
      <Particles params={particlesOptions} className="particles" />
      <Navigation />
      {route === "signIn" ? (
        <SignIn />
      ) : (
        <>
          <Logo />
          <Rank />
          <ImageLinkForm
            onButtonSubmit={onSubmit}
            onInputChange={onInputChange}
          />
          <FaceRecognition imgSrc={imgUrl} box={box} />
        </>
      )}
    </div>
  );
}
