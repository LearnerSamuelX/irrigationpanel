import React, { Component } from 'react';

class Radar extends Component{
    //initialize methods here

    //define states here


    
    render(){
        return(
            <div className='radar-page'>
                <h1>Weather Radar</h1>
                <p>City Name: </p>
                <p>City Coordinates: </p>
                <p>Wind Direction: </p>
                <p>Selected Cities: Write a query, setup the range, greater or less than the chosen city's coordinates</p> 
            </div>
        )
    }
}

export default Radar