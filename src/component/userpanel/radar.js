import React, { Component,createRef} from 'react';
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
            cityPool:[],
            borderLine:[],

            //new algorithm testing states
            zoneData:[]
        }
}

initMap(){
    return new window.google.maps.Map(this.googleMap.current,{
        zoom: 7.5,
        center:{ lat: this.state.cityCoordinates[1], lng:this.state.cityCoordinates[0] }, //reposition the centre
      disableDefaultUI: true,
    })
}

targetedCityMarker(){
    new window.google.maps.Marker({
        position: { lat: this.state.cityCoordinates[1], lng:this.state.cityCoordinates[0] },
        map:this.map_1
    })
}

cityPoolPolyLine(){
    let citypool_coordinates=[]
    this.state.cityPool.map((i)=>{
        citypool_coordinates.push(i.location)
        return citypool_coordinates
    })

    console.log(this.state.borderLine)   //coordinates for creating border line
    console.log(citypool_coordinates)    //coordinates of the cities in the city pool

    new window.google.maps.Polyline({
        path: this.state.borderLine,
        geodesic: true,
        strokeColor: "#2AA181",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map:this.map_1
      });
}

componentDidMount(){
    axios.get('http://localhost:5000/weather/radar').then((res)=>{
        console.log(res.data)
        this.setState({
            cityPool:res.data
        })
    })

    setTimeout(()=>{
        axios.get('http://localhost:5000/weather/radar_2').then((res)=>{
            this.setState({
                borderLine:res.data
            })

        console.log(this.state.cityCoordinates)
        console.log(this.state.borderLine)
        })
    },13000)

    // const MapCode = document.createElement('script')
    // MapCode.src =`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=&v=weekly`
    // window.document.body.appendChild(MapCode)
    

    // MapCode.addEventListener('load', ()=>{
    //     this.map_1 = this.initMap()
    //     this.targetedCity = this.targetedCityMarker()
    //     setTimeout(()=>{
    //         this.predicting_region = this.cityPoolPolyLine()
    //     },17000)
    // })

}
    
    render(){
        return(
            <div className='radar-page'>
                <h1>Weather Radar</h1>
                <p>City Name: {this.state.cityname}</p>
                <p>City Coordinates:Lon: {this.state.cityCoordinates[0]}, Lat: {this.state.cityCoordinates[1]}</p>
                <p>Wind Direction: {this.state.winddirection}˚ </p>
                <p>Selected Cities: * Write a query, setup the range, greater or less than the chosen city's coordinates *</p>
                <div id='predictiveZones'>
                    <p>Zone Data: {this.state.zoneData}</p>
                </div>
                <div id="google-map" ref={this.googleMap} style={{ width: '500px', height: '400px' }} />
            </div>
        )
    }
}

export default Radar