import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
//import Particles from 'react-particles-js';
import ParticleParm from './components/ParticleOptions/particleParm';
import Clarifai from 'clarifai'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
  apiKey: 'c52816cbe4d14993aadb6fd54b00e1c1'
 });

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imgURL: 'TEST',
      box: {},


    }
  }

  imageFaceBox = (data) =>{
    const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const inputImage = document.getElementById("input-image");
    const width = Number(inputImage.width);
    const height = Number(inputImage.height);
    console.log(`${width}  ${height}`);
    return{
      leftCol: faceBox.left_col * width,
      topRow: faceBox.top_row * height,
      rightCol: width - (faceBox.right_col * width),
      bottomRow: height - (faceBox.bottom_row * height)
    }
  }

  drawFaceBox = (box) => {
    console.log(box)
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{
    this.setState({imgURL: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.drawFaceBox(this.imageFaceBox(response)))
    .catch(err => console.log(err))
  }

  render(){
    return (
      <div className="App">
      <ParticleParm />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition box={this.state.box} iURL={this.state.imgURL} />
      </div>
    );
  }
}

export default App;
