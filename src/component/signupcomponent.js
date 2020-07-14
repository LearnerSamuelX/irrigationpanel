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
            }else if(this.state.username===""||this.state.password===""||this.state.password_2===""){
                alert("Missing information")
            }else{
                let user_info = {
                    username:this.state.username,
                    password:this.state.password,
                }
                axios.all([
                    axios.post('http://localhost:5000/weather/usercreated',user_info),
                    axios.get('http://localhost:5000/weather/loggedin')
                ]).then(res=>{
                    console.log(res[0].data)
                })

                let path ='citySearch'
                this.props.history.push(path);
            }
        }    
    
    render(){
        return(
            <div id='login-container'>
                <form id='form-container'>
                    <div id='username'>
                        <label>Username:</label>
                        <input type='text'value={this.state.username} onChange={this.onChangeUsername}></input>
                    </div>
                    <div id='password'>
                        <label>Password:</label>
                        <input id='input-1'type='password'value={this.state.password} onChange={this.onChangePassword}></input>
                        <label>Confirm Password:</label>
                        <input type='password'value={this.state.password_2} onChange={this.onChangePassword_2}></input>
                    </div>
                    <button onClick={this.onSubmit}>Sign Up</button>
                </form>
            </div>
        )
    }
}

export default Signupcomponent;