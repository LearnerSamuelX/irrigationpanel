import React, { Component } from 'react';
import axios from 'axios';

class CitySearch extends Component{
    constructor(props){
        super(props);

        //initilize methods
        this.onChangeCityName = this.onChangeCityName.bind(this)
        this.onChangeCountry = this.onChangeCountry.bind(this)
        this.citySearch = this.citySearch.bind(this)

        //define states
        this.state={
            username:"",
            cityName:"",
            country:"",
            loaded:false
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/weather/loggedin').then((res)=>{
            if(res.data==="Error"){
                console.log('hahaha'+res)
                this.setState({
                    username:"Error",
                    loaded:true
                })
            }else{
                console.log(res.data)
                this.setState({
                    username:res.data.username,
                    loaded:true
                })
            }
        })
    }

    onChangeCityName(e){
        this.setState({
            cityName:e.target.value
        })
    }

    onChangeCountry(e){
        this.setState({
            country:e.target.value
        })
    }

    citySearch(e){
        e.preventDefault();
        const searchCity = {
            cityName:this.state.cityName,
            country:this.state.country
        }

        
        axios.post('http://localhost:5000/weather/loggedin/citySearch',searchCity)
        // .then((res)=>{
        //     console.log(res.data)
        // })

        let path = 'userspanel'
        this.props.history.push(path);

    }

    render(){ 
        if(this.state.username===""&&this.state.loaded===false){
            return(
                <div>
                    <p>Loading Data</p>
                </div>
            )
        }else if(this.state.username==="Error"&&this.state.loaded===true){
            return(
                <div>
                    <h3>Please login into the system first</h3>
                </div>
            )
        }else{
            return(
                <div>
                    <h1>Hello,  {this.state.username}!</h1>
                    
                    <form>
                        <p>Enter your city: </p>    
                        <input type='text'value={this.state.cityName}onChange={this.onChangeCityName}></input>
                        <p>Enter your Country: </p>    
                        <input type='text'value={this.state.country}onChange={this.onChangeCountry}></input>
                        <button onClick={this.citySearch}>Search</button>
                    </form>
                    
                </div>
            )
        }
    }
}

export default CitySearch;