import React, { Component } from "react";
import Axios from 'axios'
import '../DisplayProject/DisplayProject.scss'

class DisplayProject extends Component {
    constructor(){
        super()
        this.state = {}
    }

    // componentDidMount = () => {
    //     this.setState(this.props)
    // }

    // createProjectHeaders = () => {
    //     return this.state.titles.map(title => {
    //         return <li className ="Project-Title">{title}</li>
    //     })
    // }

    render(){ 
        return (
            <div className="Single-Project">
                <h2>Single Project</h2>
                <ul>
                    {/* {this.state.titles ? this.createProjectHeaders() : ''} */}
                    hell yeah
                </ul>
            </div>
        )
    }
}

export default DisplayProject