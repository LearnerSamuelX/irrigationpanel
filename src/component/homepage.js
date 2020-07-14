import React, { Component } from 'react';
import {Link} from "react-router-dom"
import '../stylessheet/homepage.css'

class Homepage extends Component {
    render(){
        return(
            <div id='homepage-container'>
                <h1>Irrigation Panel</h1>
                    <div id='homepage-button-containter'>
                        <Link to="/Login">
                            <button>Login</button>
                        </Link>

                        <Link to="/SignUp">
                            <button>Sign Up</button>
                        </Link>
                    </div>
            </div>
        )
    }
}

export default Homepage;