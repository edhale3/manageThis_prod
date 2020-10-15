import React, { Component } from "react";
import Axios from 'axios'
import '../Projects/Projects.scss'

class Projects extends Component {
    constructor(){
        super()
        this.state = {}
        this.onClick = this.onClick.bind(this)
    }

    //upon mounting set the state to the titles of the projects
    componentDidMount = () => {
        this.setState(this.props)
    }

    //on clicking a list item call the parent function projectId 
    //(this.getData on the parent) and send it the project_id for the list item selected
    onClick = (e) => {
        this.props.projectId(e.target.getAttribute("data-key"))
    }

    //create project titles/list items according to this.state.data
    createProjectHeaders = () => {
        return this.state.data.map(item => {
            return <li key={item.key} data-key={item.key} onClick={this.onClick} className ="Project-Title">
                {item.title}
                </li>
        })
    }

    refresh = () => {
        window.location.replace('/account')
    }

    //render
    render(){ 
        return (
            <div className="List-Projects">
                <h4>Open Projects</h4>
                <button onClick={this.refresh}>Refresh</button>
                <ul>
                    {this.state.data ? this.createProjectHeaders() : ''}
                </ul>
            </div>
        )
    }
}

export default Projects