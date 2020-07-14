import React, { Component } from 'react';
import { BrowserRouter as Router,Link} from "react-router-dom" ;
import '../../stylessheet/mainmenu.css'

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
            <div id='main-container'>
                <h2>Main Menu</h2>
                <div id='link-container'>
                    <Link to="/userspanel/radar">
                            <button>Radar</button>
                    </Link>
                    <Link to="/userspanel/analog">
                            <button>Analog</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default MainMenu;