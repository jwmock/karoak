require('normalize.css/normalize.css')
require('styles/Visualizer.css')

import React from 'react'


class Visualizer extends React.Component {

	componentDidMount(){
		
	}

  render() {
    const data = this.props.data
    const numBars = this.props.numBars

    const batchSize = Math.floor(data.length / numBars)

    let downSampledData = []
    for(let i=0; i<numBars; i++){
      let sum=0
      for(let j=0; j<batchSize; j++){
        const index = i*batchSize + j
        sum += data[index]
        if(index == data.length){
          break
        }
      }
      const newValue = sum / batchSize
      downSampledData.push(newValue)
    }

    let i=0
    const fadeSize = Math.floor(numBars * 0.2)
    const bars = downSampledData.map((value)=>{
      let opacity = 1
      if(i <= fadeSize){
        opacity = i/fadeSize
      }else if(numBars-i <= fadeSize){
        opacity = (numBars-i)/fadeSize
      }

      const height = Math.round((value / 255) * 100)
      const heightString = height + "%"
      
      i++

      return(
        <span className="visualizer-bar" style={{height: heightString, opacity: opacity}}>&nbsp;</span>
      )
    })

    return (
      <div className="visualizer-container">
      {bars}
      </div>
    );
  }
}

Visualizer.defaultProps = {
}

export default Visualizer;
