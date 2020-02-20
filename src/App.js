import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
//import Particles from 'react-particles-js';
import ParticleParm from './components/ParticleOptions/particleParm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Registration from './components/Registration/Registration';


const initialState = {
  input: '',
  imgURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: "",
    email: "",
    entries: 0,
    joined: ''

  }
}


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imgURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: "",
        email: "",
        entries: 0,
        joined: ''

      }
    }
  }

  loadUser = (user) =>{
    console.log(user);
    this.setState({user:{
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    }})
    console.log("testing: " + this.state.user.id + " "
    + this.state.user.name + " "
    + this.state.user.email + " "
    + this.state.user.entries + " "
    + this.state.user.joined + " ")
  } 
  // componentDidMount(){
  //   fetch('http://localhost:3100/')
  //   .then(res => res.json())
  //   .then(console.log);
  // }

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

  onButtonSubmit = () => {
    this.setState({imgURL: this.state.input});
        fetch('http://localhost:3100/imageurl', {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                input: this.state.input
            })
        })
        .then(response => response.json())
        .then(response => {
          if(response){   
            fetch('http://localhost:3100/image', {
              method: "put",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                  id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
          }
            this.drawFaceBox(this.imageFaceBox(response))
        })
        .catch(err => console.log(err))
  }
  
  

  onRouteChange = (route) =>{
    if(route === "signin"){
      this.setState(initialState);
    }else if(route === "home"){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render(){
    return (
      <div className="App">
      <ParticleParm />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        { this.state.route === 'home'
          ?<div> 
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={this.state.box} iURL={this.state.imgURL} />
          </div>
          :( this.state.route === "signin"
          ?<SignIn onRouteChange= { this.onRouteChange } loadUser={this.loadUser} />
          :<Registration onRouteChange={this.onRouteChange} loadUser={this.loadUser} />)
        }
        
      </div>
    );
  }
}

export default App;
