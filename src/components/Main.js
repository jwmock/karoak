require('normalize.css/normalize.css')
require('styles/App.css')
import Particles from 'react-particles-js';
import Footer from './Footer.jsx'
import Logo from './Logo.jsx'
import Contact from './Contact.jsx'

import ReactAudioPlayer from 'react-audio-player'

import ReactPlayer from 'react-player'
import Player from './Player.jsx'

import React from 'react'



class AppComponent extends React.Component {
        
  componentDidMount(){

  }

  render() {
  	const videos = [{
	      'src': '../videos/smoke.mp4',
	      'type': 'mp4'
	    }]

	    // <div className="shim"/>
	    //     
    return (
      <div>
        <div className="container">
        	<div className="box">
		        <Logo/>
	      		<ReactPlayer className="smoke" ref="backgroundPlayer" url='../videos/smoke.mp4' playing loop volume={0}/>
	        </div>
	        <Player/>
	        <Footer/>
        </div>
      </div>
    );
  }

}

AppComponent.defaultProps = {
}

export default AppComponent;
