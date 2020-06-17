import React, { Component } from 'react';
import axios from 'axios';

class WeatherPanel extends Component{
    constructor(props){
        super(props);
        //initilize method
        this.onChangeCityName = this.onChangeCityName.bind(this)

        //define states
        this.state={
            username:"",
            cityName:""
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/weather/loggedin').then((res)=>{
            // console.log(res.data)
            this.setState({
                username:res.data.username
            })
        })
    }

    onChangeCityName(e){
        this.setState({
            cityName:e.target.value
        })
    }

    citySearch(e){
        e.preventDefault();
        const searchCity = {
            username:this.state.cityName
        }
        axios.get('http://localhost:5000/weather/loggedin/citySearch').then((res)=>{
            console.log(res)
        })
    }

    render(){ 
        if(this.state.username===""){
            return(
                <div>
                    <p>Please Login to the System</p>
                </div>
            )
        }else{
            return(
                <div>
                    <h1>Hello,  {this.state.username}!</h1>
                    
                    <form>
                        <p>Please Enter the Name of Your City: </p>    
                        <input type='text'value={this.state.cityName}onChange={this.onChangeCityName}></input>
                        <button onSubmit={this.citySearch}>Search</button>
                    </form>
                    
                </div>
            )
        }
    }
}

export default WeatherPanel;