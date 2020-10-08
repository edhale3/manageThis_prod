import React, { Component } from "react";
import Axios from 'axios'
import '../DisplayProject/DisplayProject.scss'

class DisplayProject extends Component {
    constructor(){
        super()
        this.state = null
    }


    render(){ 
        console.log(this.props)

        return (
            <div className="Single-Project">
                <h2>Single Project</h2>
                {this.state ? "heck yeah" : "heck no"}
            </div>
        )
    }
}

export default DisplayProject