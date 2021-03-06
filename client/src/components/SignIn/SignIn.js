import React, { Component } from 'react';
import axios from 'axios';
import '../SignIn/SignIn.scss'
import SignInForm from '../Forms/SignInForm'
import AboutContact from '../Buttons/AboutContact';
import Navigation from '../Buttons/Navigation';

class SignIn extends Component {
    constructor(){
        super();
        this.state = {isLoggedIn: false}
    }

    //check if signed in already. if so set the login state to true
    componentDidMount = async () => {
        let response = await axios.get("/api/signin")
            .then(res => {
                return res.data
            })
            .catch(err => {
                throw err
            })
        if(response){   
            this.setState({
                isLoggedIn: true
            })
        } 
    }

    //call logout function on the backend 
    logout = () => {
        axios.get("/api/logout")
        .then(res => {
            this.setState({isLoggedIn: false})
        })
        .catch( err => {throw err})
    }

    //render
    render() {
        const isLoggedIn = this.state.isLoggedIn
        let newData;
        if(isLoggedIn){
            newData = <div className="Signin-Page">
                <p className="Congrats-Message">Congratulations you're already logged in</p>
                <button onClick={this.logout}>Logout</button>
            </div>
        } else {
            newData = <SignInForm />
        }
        return (
            <div>
                <Navigation/>
                {newData}
                <AboutContact/>
            </div>
        )
    }
}

export default SignIn