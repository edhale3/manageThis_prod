import React, { Component } from "react";
import Axios from 'axios'
import '../Projects/Projects.scss'

class Projects extends Component {
    constructor(){
        super()
        this.state = {}
    }

    getProjects = (req,res) => {
        Axios.get("/api/projects")
        .then(res => {
            if(res.data === false){
                window.location.replace("/signin")
            } 
            console.log(res)
        })
        .catch(err => {
            throw err
        })
    }

    render(){
        return (
            <div className="List-Projects">
                Open Projects
                {this.getProjects()}    
            </div>
        )
    }
}

export default Projects