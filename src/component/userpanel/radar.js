import React, { Component } from 'react';

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
    let radar_range = 50  //unit in km
    let x_point = this.state.cityCoordinates[0]
    let y_point = this.state.cityCoordinates[1]

    let angle = this.state.winddirection
    let x_d = 0
    let y_d = 0
    let increment=0.00899321

    if(angle>270||angle<360){
        angle = 360-angle
        x_d=radar_range*Math.sin(Math.PI/180*angle)
        y_d=radar_range*Math.cos(Math.PI/180*angle)

        let x_new = x_point - x_d*increment
        let y_new = y_point + y_d*increment

        console.log(x_new,y_new) 
        //make a 20km x 20km square orginated from here
        // 4 points needed
        let x_1 = x_new - 10*increment
        let y_1 = y_new + 10*increment
        
        let x_2 = x_new + 10*increment
        let y_2 = y_new + 10*increment

        let x_3 = x_new
        let y_3 = y_new - 10*increment

        // let x_4 = x_new + 10*increment
        // let y_4 = y_new - 10*increment

        //top 1 2 bottom 3 4 from left --> right
        console.log(x_1,y_1)
        console.log(x_2,y_2)
        console.log(x_3,y_3)


    }else if(angle>180||angle<270){
        console.log('angle 2')
    }else{
        console.log('other angle')
    }
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