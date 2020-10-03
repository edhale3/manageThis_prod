import React, { Component } from 'react';
import axios from 'axios';
import '../SignIn/SignIn.scss'
import SignInForm from '../Forms/SignInForm'
import AboutContact from '../Buttons/AboutContact';

class SignIn extends Component {
    constructor(){
        super();
        this.state = {isLoggedIn: false}
    }

    componentDidMount = async () => {
        let response = await axios.get("/signin")
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

    logout = () => {
        axios.get("/logout")
        .then(res => {
            this.setState({isLoggedIn: false})
        })
        .catch( err => {throw err})
    }

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
            <div className="authenticatedLogic">
                {newData}
                <p>This is here</p>
                <AboutContact/>
            </div>
        )
    }
}

export default SignIn