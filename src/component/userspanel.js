import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Link,Switch, BrowserRouter} from "react-router-dom" ;
import axios from 'axios';

import MainMenu from "../component/userpanel/mainmenu"
import Radar from "../component/userpanel/radar"
import Analog from "../component/userpanel/analog"

//Any state we need in here? 
//Let it just be a new navigation page, and put the states in the child branch pages
class UsersPanel extends Component{
    constructor(props){
        super(props)

        this.state = {
            username:"",
            cityname:""
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/weather/loggedin/citySearch').then((res)=>{
            this.setState({
                cityname:res.data
            })
        })
    }

    render(){
        if(this.state.cityname===""){
            return(
                <div>
                    <p>Please Login into the System First</p>
                </div>
            )
        }else{
            return(
                <div id='container'>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path = '/userspanel'component={MainMenu} />
                            <Route path = '/userspanel/radar'component={Radar} />
                            <Route path = '/userspanel/analog'component={Analog} />
                        </Switch>
                    </BrowserRouter>
                </div>
            )
        }
    }
}

export default UsersPanel