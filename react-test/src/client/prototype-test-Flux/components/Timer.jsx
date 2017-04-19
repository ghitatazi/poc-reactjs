
import React, { Component } from 'react';
import { timerStyle } from '../constants/css-styles/main';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elapsed: 0
        }
        this.tick = this.tick.bind(this);
        this.timer = "";
    }

    tick() {
        //function called every 50ms. It updates the elapsed counter.
        //Calling setState causes the component to be re-rendered
        this.setState({
            elapsed: new Date() - this.props.start
        });
    }

    componentDidMount() {
        //called when component has been rendered on the page.
        this.timer = setInterval(this.tick, 50);
    }

    componentWillUnmount() {
        //called immediately before the component is removed from the page
        //and destroyed => we can the interval here
        clearInterval(this.timer)
    }

    render() {
        var elapsed = Math.round(this.state.elapsed / 100);
        var seconds = (elapsed/10).toFixed(1);
        return(
            <p style={timerStyle}>You are on this page since <b>{seconds}</b> seconds.</p>
        );
    }
}

export default Timer;
