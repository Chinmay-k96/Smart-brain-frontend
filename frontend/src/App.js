import React, { Component } from 'react';
import Particles from 'react-particles-js';
//import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/navigation/navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Registration/Register';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';


const particleOptions = {
      "particles": {
          "number": {
              "value": 120
          },
          "size": {
              "value": 3
          }
      },
      "interactivity": {
          "events": {
              "onhover": {
                  "enable": true,
                  "mode": "repulse"
              }
          }
      }         
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'SignIn',
  isSignedIn: 's',
  user: {
    id:'',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }  
}

class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  loadUser=(data)=> {
      this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }


  calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col*width),
        bottomRow: height - (clarifaiFace.bottom_row*height)
      }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('http://localhost:3001/imageUrl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            input: this.state.input
          }) 
        })
      .then(response=> response.json())
      .then(response => {
        if (response) {
           fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            id: this.state.user.id
          }) 
        }).then(response=> response.json())
           .then(count=> {
            this.setState(Object.assign(this.state.user, {entries: count}))
           })
      }     
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    console.log('changing route to ',route);
    if (route === 'SignIn') {
      this.setState(initialState)
    }
    else if (route === 'register') {
        this.setState({isSignedIn: 'r'})
      }
    else if (route === 'home') {
      this.setState({isSignedIn: 'h'})
      console.log('routing to ',route);
    }  
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
         <Particles className='particles' 
                params={particleOptions} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'SignIn' ?
          <SignIn loadUser={this.loadUser} onRouteChange ={this.onRouteChange}/>         
          :(this.state.route === 'register' ?
            <Register loadUser={this.loadUser} onRouteChange ={this.onRouteChange}/>
            :
          <>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
              />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </>
          )
        }
      </div>
    );
  }
}

export default App;
