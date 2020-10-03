// import Axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './Navigation.scss'

class Navigation extends Component {
    constructor(){
        super()
        this.state = {}
    }

    onClick = (e) => {
        this.setState({redirect: e.target.name})
    }

    render(){
        if(this.state.redirect){
            return <Redirect to= {`/${this.state.redirect}`} />
        }
        return (
            <div className="Nav-Buttons">
                <button name="Home" onClick={this.onClick}>Home</button>
                <button name="Signin" onClick={this.onClick}>Signin</button>
                <button name="Signup" onClick={this.onClick}>Signup</button>
            </div>
        )
    }
}

export default Navigation