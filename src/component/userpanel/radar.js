import React, { Component } from 'react';
import axios from 'axios';

class Radar extends Component{
    constructor(props){
        super(props)
        //initialize methods here

        //define states here
        this.state = {
            cityname:this.props.datasource.name,
            cityCoordinates:[this.props.datasource.coord.lon, this.props.datasource.coord.lat],
            winddirection:this.props.datasource.wind.deg,
        }
}

componentDidMount(){
    axios.get('http://localhost:5000/weather/radar')
}

    
    render(){
        return(
            <div className='radar-page'>
                <h1>Weather Radar</h1>
                <p>City Name: {this.state.cityname}</p>
                <p>City Coordinates:Lon: {this.state.cityCoordinates[0]}, Lat: {this.state.cityCoordinates[1]}</p>
                <p>Wind Direction: {this.state.winddirection}˚ </p>
                <p>Selected Cities: * Write a query, setup the range, greater or less than the chosen city's coordinates *</p> 
            </div>
        )
    }
}

export default Radar