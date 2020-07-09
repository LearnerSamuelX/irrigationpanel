import React, { Component } from 'react';
import axios from 'axios';
import Dashboard from "./dashboard"
import '../../stylessheet/analog.css'

class Analog extends Component {
    constructor(props){
        super(props)
        //initialize the methods

        //define the states here
        this.state = {
            cityname:"",
            // (T - 273.15) is the actual temperature
            temperature:Math.round(this.props.datasource.main.temp-273.15), //10˚C - 40˚C --> 0˚- 180˚
            humidity:this.props.datasource.main.humidity,
            windspeed:this.props.datasource.wind.speed,  //0km - 50km --> 0˚- 180˚
            winddirection:this.props.datasource.wind.deg,
        }
    }

    render(){
        return(
            <div className='analog-page'>
                <h1 className='page-title'>Analog Weather Dashboard</h1>
                <div className='dashboard-collection'>
                    <div>
                        <Dashboard nominal={this.state.temperature} range={[10,40]} unit={'˚C'} title={'Temperature'}/>
                    </div>
                    <div>
                        <Dashboard nominal={this.state.humidity} range={[10,100]} unit={'%'} title={'Humidity'}/>
                    </div>
                    <div>
                        <Dashboard nominal={Math.round(this.state.windspeed)*3.6} range={[0,50]} unit={'km'} title={'Windspeed'}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Analog