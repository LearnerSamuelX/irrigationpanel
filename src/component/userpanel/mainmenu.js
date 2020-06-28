import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Link,Switch, BrowserRouter} from "react-router-dom" ;

class MainMenu extends Component{
    constructor(props){
        super(props)
    

        this.state={
            cityname:"",
            countryname:"",
        }
    
    }

    render(){
        return(
            <div id='container'>
                <h1>Main Menu</h1>
                <Link to="/userspanel/radar">
                        <button>Radar</button>
                </Link>
                <Link to="/userspanel/analog">
                        <button>Analog</button>
                </Link>
            </div>
        )
    }
}

export default MainMenu;