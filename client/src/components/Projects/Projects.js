import React, { Component } from "react";
import Axios from 'axios'
import '../Projects/Projects.scss'
import DisplayProject from '../DisplayProject/DisplayProject'

class Projects extends Component {
    constructor(){
        super()
        this.state = {}
        this.onClick = this.onClick.bind(this)
    }

    componentDidMount = () => {
        this.setState(this.props)
    }

    onClick = (e) => {
        this.props.projectId(e.target.getAttribute("data-key"))
    }

    createProjectHeaders = () => {
        console.log("this state: ", this.state)
        return this.state.data.map(item => {
            return <li key={item.key} data-key={item.key} onClick={this.onClick} className ="Project-Title">
                {item.title}
                </li>
        })
    }

    render(){ 
        return (
            <div className="List-Projects">
                <h4>Open Projects</h4>
                <ul>
                    {this.state.data ? this.createProjectHeaders() : ''}
                </ul>
            </div>
        )
    }
}

export default Projects