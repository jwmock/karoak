require('normalize.css/normalize.css')
require('styles/App.css')

import React from 'react'

class Player extends React.Component {

	componentDidMount(){
	 this.didTogglePlay()
    setInterval(this.updateTimer, 1000)	
	}

  updateTimer = () => {
    const player = this.state.player
    this.setState({currentTime:Math.round(player.currentTime)})
  }

  constructor(props) {
    super(props);

    this.state = {
      player: new Audio('../audio/demo.mp3'),
      playing: false,
      currentTime:0
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

  render() {
    let buttonClass = "playButton"
    if(this.state.playing == true){
      buttonClass += " pause"
    }

    const percent = Math.round((this.state.currentTime / this.state.player.duration)*100)
    // debugger
    const style = {width:percent+"%"}
    
    return (
      <div>
        <div className="progress">
          <div className="watch">{this.timeString(this.state.currentTime)}</div>
          <div className="bar">
            <div style={style} className="progress-bar">&nbsp;</div>
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
