import React, { Component,createRef } from 'react';
import axios from 'axios';

require('dotenv').config();

class Radar extends Component{
    constructor(props){
        super(props)
        //initialize methods here
        this.googleMap = React.createRef()

        //define states here
        this.state = {
            cityname:this.props.datasource.name,
            cityCoordinates:[this.props.datasource.coord.lon, this.props.datasource.coord.lat],
            winddirection:this.props.datasource.wind.deg,
        }
}

componentDidMount(){
    axios.get('http://localhost:5000/weather/radar').then((res)=>{
        console.log(res.data)
    })

    console.log(this.state.cityCoordinates)

    const MapCode = document.createElement('script')
    MapCode.src =`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    window.document.body.appendChild(MapCode)

    MapCode.addEventListener('load', ()=>{
        this.createGoogleMap()
    })
}

createGoogleMap = ()=>{
    new window.google.maps.Map(this.googleMap.current,{
        zoom: 8,
        center:{ lat: this.state.cityCoordinates[1], lng:this.state.cityCoordinates[0] },
      disableDefaultUI: true,
    })
}
    
    render(){
        return(
            <div className='radar-page'>
                <h1>Weather Radar</h1>
                <p>City Name: {this.state.cityname}</p>
                <p>City Coordinates:Lon: {this.state.cityCoordinates[0]}, Lat: {this.state.cityCoordinates[1]}</p>
                <p>Wind Direction: {this.state.winddirection}˚ </p>
                <p>Selected Cities: * Write a query, setup the range, greater or less than the chosen city's coordinates *</p>
                <div id="google-map" ref={this.googleMap} style={{ width: '400px', height: '300px' }} />
            </div>
        )
    }
}

export default Radar