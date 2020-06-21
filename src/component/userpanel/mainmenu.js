import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Link,Switch, BrowserRouter} from "react-router-dom" ;
import axios from 'axios';

class MainMenu extends Component{

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