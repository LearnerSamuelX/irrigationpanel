import React, { Component } from 'react';
import axios from 'axios';

class WeatherPanel extends Component{
    constructor(props){
        super(props);
        //initilize method


        //define states
        this.state={
            username:""
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/weather/loggedin').then((res)=>{
            // console.log(res.data)
            this.setState({
                username:res.data.username
            })
        })
        //load OpenWeather API
    }

    render(){ 
        if(this.state.username===""){
            return(
                <div>
                    <h1>Empty Username</h1>
                </div>
            )
        }else{
            return(
                <div>
                    <h1>User Name Filled, and the name is {this.state.username}</h1>
                </div>
            )
        }
    }
}

export default WeatherPanel;