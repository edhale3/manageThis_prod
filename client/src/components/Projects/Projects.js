import React, { Component } from "react";
import Axios from 'axios'
import '../Projects/Projects.scss'

class Projects extends Component {
    constructor(){
        super()
        this.state = {}
    }

    componentDidMount = () => {
        this.setState(this.props)
    }

    createProjectHeaders = () => {
        return this.state.titles.map(title => {
            return <p className ="Project-Title">{title}</p>
        })
    }


    render(){
        return (
            <div className="List-Projects">
                <h4>Open Projects</h4>
                {this.state.titles ? this.createProjectHeaders() : ''}
            </div>
        )
    }
}

export default Projects