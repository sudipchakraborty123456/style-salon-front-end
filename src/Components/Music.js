import React from "react"
class Music extends React.Component {
   audio = new Audio("http://streaming.tdiradio.com:8000/house.mp3")
constructor(){
  super()
    this.state = {
      play: false
    }
    
  
  }
 
    componentDidMount() {
      
      this.audio.addEventListener('ended', () => this.setState({ play: false }));
    }
    
    componentWillUnmount() {
      this.audio.removeEventListener('ended', () => this.setState({ play: false }));  
    }
  
    togglePlay = () => {
      this.setState({ play: !this.state.play }, () => {
        this.state.play ? this.audio.play() : this.audio.pause();
      });
    }
  
    render() {
      return (
        <div>
          <button onClick={this.togglePlay}>{this.state.play ? 'Pause' : 'Play'}</button>
        </div>
      );
    }
  }
  
  export default Music;