require('normalize.css/normalize.css')
require('styles/App.css')

import React from 'react'
// import { Sparklines, SparklinesLine } from 'react-sparklines';
import Visualizer from './Visualizer.jsx'

class Player extends React.Component {

	componentDidMount(){
	 this.didTogglePlay()
    setInterval(this.updateTimer, 100)	

    document.onkeypress = (e) => {
        e = e || window.event;
        if(e.keyCode == 32){
          this.didTogglePlay()
        }
    };
	}

  updateTimer = () => {
    const player = this.state.player
    this.setState({currentTime:player.currentTime})
  }

  constructor(props) {
    super(props);

    this.state = {
      player: new Audio('../audio/demo.mp3'),
      playing: false,
      currentTime:0,
      currentData: []
    }

    this.configureAnalyser()
  }

  configureAnalyser = () => {
    let ctx = this.getAudioContext()
    let audio = this.state.player

    let audioSrc = ctx.createMediaElementSource(audio);
    let analyser = ctx.createAnalyser();
    // we have to connect the MediaElementSource with the analyser 
    audioSrc.connect(analyser);
    audioSrc.connect(ctx.destination);
    // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
   
    console.log('Analyser:', analyser)
    
    this.renderFrame(analyser);
  }

  renderFrame = (analyser) => {
     requestAnimationFrame(()=>{this.renderFrame(analyser)});

     if( analyser ){
       let frequencyData = new Uint8Array(analyser.frequencyBinCount);
       
       // update data in frequencyData
       analyser.fftSize = 1024
       analyser.smoothingTimeConstant = 0.3
       analyser.getByteFrequencyData(frequencyData);

       const data = Array.from(frequencyData)

       // console.log('data', data)

       // const collapsedData = this.collapseData(data, 100)

       this.setState({currentData: data})
       // render frame based on values in frequencyData
       // console.log(frequencyData.slice(20))
     }
  }

  // collapseData = (data, size) => {
  //   let newData = []
  //   const sampleSize = Math.floor(data.count / size)
  //   console.log('size', data.count)
    
  //   return data
  // }

  getAudioContext = () => {
    var AudioContext = window.AudioContext // Default
    || window.webkitAudioContext // Safari and old versions of Chrome
    || false; 

    if (AudioContext) {
        // Do whatever you want using the Web Audio API
        var ctx = new AudioContext;
        return ctx
        // ...
    } else {
        // Web Audio API is not supported
        // Alert the user
        alert("Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
        return false
    }
  }

  didTogglePlay = () => {
    const playing = this.state.playing
    const player = this.state.player
    if(playing == true){
      player.pause();
    }else{
      player.play(); 
    }
    this.setState({playing: !playing})
  }

  timeString = (time) => {
    const minutes = Math.floor(time/60)
    const seconds = time % 60

    // god this is ugly

    let shim = ""
    if( seconds < 10 ) shim = "0"

    return minutes+":"+shim+seconds
  }

  clickedTrackBar = (e) => {
    // console.log('event', e.nativeEvent.offsetX)
    const player = this.state.player
    const percent = e.nativeEvent.offsetX / this.refs.trackBar.offsetWidth
    const newTime = Math.floor(player.duration * percent)
    player.currentTime = newTime
  }

  render() {
    let buttonClass = "playButton"
    if(this.state.playing == true){
      buttonClass += " pause"
    }

    const percent = (this.state.currentTime / this.state.player.duration)*100
    // debugger
    const style = {width:percent+"%"}
    
    return (
      <div className="player-container">
        <Visualizer boostHighs={true} data={this.state.currentData} numBars={150}/>

        <div className="progress">
          <div className="watch">{this.timeString(Math.round(this.state.currentTime))}</div>
          <div className="bar-container" onClick={this.clickedTrackBar}>
            <div className="bar" ref="trackBar" onClick={this.clickedTrackBar}>
              <div style={style} className="progress-bar">&nbsp;</div>
            </div>
          </div>
          <div className="watch total">{this.timeString(Math.round(this.state.player.duration||0))}</div>
        </div>

        <div className={buttonClass} onClick={this.didTogglePlay}/>
        
      </div>
    );
  }
}

Player.defaultProps = {
}

export default Player;
