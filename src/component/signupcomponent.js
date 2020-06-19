import React, { Component } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

class Signupcomponent extends Component{

    // using axios to interact with server because we need to practice how to use state
    constructor(props){
        super(props);
        //initialize method here methods here
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePassword_2 = this.onChangePassword_2.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // define states here
        this.state={
            username:"",
            password:"",
            password_2:"",
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

        onChangePassword_2(e) {
            this.setState({
                password_2:e.target.value
            })
        }

        onSubmit(e) {
            e.preventDefault();
            //validate user input
            if (this.state.password!==this.state.password_2){
                alert("Passwords don't match. Please type again")
            }else{
                let user_info = {
                    username:this.state.username,
                    password:this.state.password,
                }

                axios.post('http://localhost:5000/weather/usercreated',user_info)
                .then((res)=>{console.log(res.data)})
                // .catch((err)=>{console.log(err)})
                let path = 'weatherPanel'
                this.props.history.push(path);

                axios.get('http://localhost:5000/weather/loggedin')
            }
        }    
    
    render(){
        return(
            <div>
                <form id='login-container'>
                    <label>Username:</label>
                    <input type='text'value={this.state.username} onChange={this.onChangeUsername}></input>
                    <label>Password:</label>
                    <input type='password'value={this.state.password} onChange={this.onChangePassword}></input>
                    <label>Confirm Password:</label>
                    <input type='password'value={this.state.password_2} onChange={this.onChangePassword_2}></input>
                    <button onClick={this.onSubmit}>Sign Up</button>
                </form>
            </div>
        )
    }
}

export default Signupcomponent;