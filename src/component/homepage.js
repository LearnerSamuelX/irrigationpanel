import React, { Component } from 'react';
import {Link} from "react-router-dom"

class Homepage extends Component {
    render(){
        return(
            <div id='hompage-container'>
                <h1>Welcome to Irrigation Panel</h1>

                    <Link to="/Login">
                        <button>Login</button>
                    </Link>

                    <Link to="/SignUp">
                        <button>Sign Up</button>
                    </Link>
            </div>
        )
    }
}

export default Homepage;