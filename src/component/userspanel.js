import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Link,Switch, BrowserRouter} from "react-router-dom" ;
import axios from 'axios';

import MainMenu from "../component/userpanel/mainmenu"
import Radar from "../component/userpanel/radar"
import Analog from "../component/userpanel/analog"

import '../stylessheet/userspanel.css'

//Any state we need in here? 
//Let it just be a new navigation page, and put the states in the child branch pages
class UsersPanel extends Component{
    constructor(props){
        super(props)

        this.state = {
            weatherdata:"",
            loaded:false
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/weather/loggedin/citySearch').then((res)=>{
            // console.log(res.data)
            this.setState({
                weatherdata:res.data, //T, humidity, windspeed, wind-direction
                loaded:true
            })
        })
    }

    render(){
        if(this.state.loaded===false&&this.state.weatherdata===""){
            return(
                <div>
                    <h3>Loading data</h3>
                </div>
            )
        }else if(this.state.loaded===true&&this.state.weatherdata==='Error'){
            return(
                <div>
                    <h3>Please Log into the System</h3>
                </div>
            )
        }else{
            return(
                <div id='container'>
                    <div className='location'>
                        <h3>Location: {this.state.weatherdata.name},{this.state.weatherdata.sys.country}</h3>
                    </div>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path = '/userspanel'>
                                <MainMenu datasource={this.state.weatherdata}/>
                            </Route>
                            <Route path = '/userspanel/radar'>
                                <Radar datasource={this.state.weatherdata} />
                            </Route>
                            <Route path = '/userspanel/analog'>
                                <Analog datasource={this.state.weatherdata} />
                            </Route>
                            {/* in the component  */}
                        </Switch>
                    </BrowserRouter>
                </div>
            )
        }
    }
}

export default UsersPanel