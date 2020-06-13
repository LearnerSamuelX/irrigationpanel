import React, { Component } from 'react';

class Logincomponent extends Component{
    // using axios to interact with server because we need to practice how to use state
    constructor(props){
        super(props);
        //initialize method here methods here

        // define states here
        this.state={
            username:"",
            password:"",
        }
    }
    
    render(){
        return(
            <div>
                <form id='login-container'method='POST'action=''>

                </form>
            </div>
        )
    }
}

export default Logincomponent;