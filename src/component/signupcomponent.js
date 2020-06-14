import React, { Component } from 'react';
import axios from 'axios';

class Signupcomponent extends Component{

    // using axios to interact with server because we need to practice how to use state
    constructor(props){
        super(props);
        //initialize method here methods here
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // define states here
        this.state={
            username:"",
            password:"",
        }
    }

        //define methods here
        onChangeUsername(e) {
            this.setState({
                username:e.target.value
            })
        }

        onChangePassword(e) {
            this.setState({
                password:e.target.value
            })
        }

        onSubmit(e) {
            e.preventDefault();
            const user_info = {
                username:this.state.username,
                password:this.state.password,
            }

            console.log(user_info)

            //use axios to send post request in the submit method
            axios.post('http://localhost:3000/weather/usercreated/'+this.props.match.params.id,user_info)
            .then(res => console.log(res.data));

            // window.location = '/';
        }
    
    
    render(){
        return(
            <div>
                <form id='login-container'>
                    <label>Username:</label>
                    <input type='text'value={this.state.username} onChange={this.onChangeUsername}></input>
                    <label>Password:</label>
                    <input type='text'value={this.state.password} onChange={this.onChangePassword}></input>
                    <button onClick={this.onSubmit}>Login</button>
                </form>
            </div>
        )
    }
}

export default Signupcomponent;