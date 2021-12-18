import React, { Component } from 'react';
import "./App.css"
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from 'react-particles-js';
import  Clarifai from "clarifai";

const app = new Clarifai.App({apiKey: 'cfd21d3c89df48d4b833b00e324d431e'});


const particlesOptions = {
  particles : {
    number : {
      value : 160,
      denisty : {
        enable : true,
        value_area : 800
      }
    },
    move: {
      enable : true,
      speed : 1
    }
  }
}

export default class App extends Component {
  state = {
    input : "",
  }

  onInputChange = (e) => {
    console.log(e.target.value)
  }

  onSubmit = () => {
    
  }
   
  render() {
    return (
      <div className="app">
        <Particles params={particlesOptions} className="particles"/>
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm onButtonSubmit={this.onSubmit}  onInputChange={this.onInputChange}/>
      </div>
    )
  }
}

