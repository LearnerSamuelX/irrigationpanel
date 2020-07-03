import React, { Component } from 'react';
import axios from 'axios';

class Logincomponent extends Component{
    constructor(props){
        super(props);
        //initialize method here methods here
        this.onChangeUsername_JSX = this.onChangeUsername.bind(this);
        this.onChangePassword_JSX= this.onChangePassword.bind(this);
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

        onSubmit(e){
            e.preventDefault();
            if(this.state.username===""||this.state.password===""){
                alert('Please fill in the required info to log in')
            }else{
                let user_info = {
                    username_2:this.state.username,
                    password_2:this.state.password
                }
                axios.post('http://localhost:5000/weather/loggedin',user_info).then((res)=>{
                    console.log(res.data)
                })
                
                let path ='userspanel'
                this.props.history.push(path);
            }

        }

    render(){
        return(
            <div>
                <form id='login-container'>
                    <label>Username:</label>
                    <input type='text'value={this.state.username} onChange={this.onChangeUsername_JSX}></input>
                    <label>Password:</label>
                    <input type='password'value={this.state.password} onChange={this.onChangePassword_JSX}></input>
                    <button onClick={this.onSubmit}>Login</button>
                </form>
            </div>
        )
    }
}

export default Logincomponent;