import React, { Component } from "react";
import Axios from 'axios'
import '../DisplayProject/DisplayProject.scss'

class DisplayProject extends Component {
    constructor(){
        super()
        this.state = null
    }

    componentDidMount = () => {
        console.log("I just wanted to know if this works")
    }

    render(){ 
        console.log(this.props)
        return (
            <div className="Single-Project">
                <h2>{this.props.currentData.title}</h2>
                <h3>Status: {this.props.currentData.project_status}</h3>
                <p>Description: {this.props.currentData.description}</p>
            </div>
        )
    }
}

export default DisplayProject