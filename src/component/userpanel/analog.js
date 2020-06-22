import React, { Component } from 'react';
import axios from 'axios';

class Analog extends Component {
    constructor(props){
        super(props)
        //initialize the methods

        //define the states here
        this.state = {
            cityname:"",

            temperature:0,
            windspeed:0.0,
            winddirection:"",
        }
    }

    componentDidMount(){
        //get request to load city name first
        //get request to load weather data from the OpenWeatherMap
    }


    render(){
        if(this.state.cityname===""){
            return(
                <div>Please log into the system first</div>
            )
        }
    }
}

export default Analog