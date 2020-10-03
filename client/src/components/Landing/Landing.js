import React, { Component } from 'react';
// import axios from 'axios'
import '../Landing/Landing.scss'
import { Redirect } from 'react-router-dom'
import AboutContact from '../Buttons/AboutContact'

class Landing extends Component {
    constructor(){
        super()
        this.state = {
          data:null,
          search: null
        }
      }
    

    onClick = (e) => {
        console.log(e.target.name)
        this.setState({ redirect: e.target.name})
    }


    render () {

        console.log("Got here muddafucka ", this.state)
        if(this.state.redirect){
            return <Redirect to={`/${this.state.redirect}`} />
        }

        return (
            <div className="Landing">
                <div className="NewData">
                    <h1>Welcome to ManageThis</h1>
                    <div className="Buttons">
                        <button className="Signup" name="signup" onClick ={this.onClick}>Sign Up</button>
                        <button className="Signin" name="signin"  onClick={this.onClick}>Sign In</button>
                    </div>
                </div>
                {/* <div className= "ExtraButtons">
                    <a href="/About" className="About">About</a>
                    <a href="/Contact" className="Contact">Contact</a>
                </div> */}
                <AboutContact/>
            </div>
        )
    }
}
 
export default Landing;