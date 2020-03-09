import React, { Component } from 'react';
import './Metronome.css';
import click1 from './sounds/click1.wav';
import click2 from './sounds/click2.wav';
import { ReactComponent as PlayIcon } from './img/play.svg'
import { ReactComponent as PlayOnHoverIcon } from './img/playOnHover.svg'
import { ReactComponent as PauseIcon } from './img/pause.svg'
import { ReactComponent as PauseOnHoverIcon } from './img/pauseOnHover.svg'
import Slider from './components/Slider';


class Metronome extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            playing: false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 4,
            isHover: false,
        };
        this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);

        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }

    onMouseEnterHandler() {
        this.setState({
            isHover: true
        });
    }

    onMouseLeaveHandler() {
        this.setState({
            isHover: false
        });
    }

    handleBpmChange = event => {
        const bpm = event.target.value;
      
        if (this.state.playing) {
          // Stop the old timer and start a new one
          clearInterval(this.timer);
          this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
      
          // Set the new BPM, and reset the beat counter
          this.setState({
            count: 0,
            bpm
          });
        } else {
          // Otherwise just update the BPM
          this.setState({ bpm });
        }
    };
    
    startStop = () => {
    if (this.state.playing) {
        // Stop the timer
        clearInterval(this.timer);
        this.setState({
        playing: false
        });
    } else {
        // Start a timer with the current BPM
        this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
        );
        this.setState(
        {
            count: 0,
            playing: true
            // Play a click "immediately" (after setState finishes)
        },
        this.playClick
        );
        }
    };

    playClick = () => {
        const { count, beatsPerMeasure } = this.state;
      
        // The first beat will have a different sound than the others
        if (count % beatsPerMeasure === 0) {
          this.click2.play();
        } else {
          this.click1.play();
        }
      
        // Keep track of which beat we're on
        this.setState(state => ({
          count: (state.count + 1) % state.beatsPerMeasure
        }));
    };

    
    render() {
        const { playing, bpm } = this.state;
        let button;

        if (playing) {
          button = <PauseIcon className="playButton" onClick={this.startStop}/>
        } else {
          button = <PlayIcon className="playButton" onClick={this.startStop}/>
        }

       
        

        return (
          <div id="root">
            
            <div className="bgImg">
              <img className= "heroImg" src={'./assets/img/Metronome-Logo@2x.png'} alt=""></img>
              <div className="metronomeContainer">
                <div className="metronome">
                  <div className="bpm-slider">
                    <div>{bpm} BPM</div>
                    <Slider
                      className="sliderMain"
                      type="range"
                      min="40"
                      max="240"
                      value={bpm}
                      onChange={this.handleBpmChange} />
                    <div className="playButton" onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler} onClick={this.startStop}>
                      {
                        this.state.isHover
                        ? <PlayOnHoverIcon/>
                        : <PlayIcon/>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

export default Metronome;