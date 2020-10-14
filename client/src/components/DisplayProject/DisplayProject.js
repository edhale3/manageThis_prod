import React, { Component } from "react";
import Axios from 'axios'
import '../DisplayProject/DisplayProject.scss'

class DisplayProject extends Component {
    constructor(){
        super()
        this.state = null
    }

    componentDidMount = () => {
        Axios.get(`/api/getcomments/${this.props.currentData.project_id}`)
        .then(res=> {
            console.log(res.data.rows)
            this.setState({
                comments: res.data.rows
            })
        })
        .catch (err => {
            console.error("Throw this error: ", err)
        })
        // this.setState({})
        console.log("this is what i want", this.state)
    }

    displayComments = () => {
        return this.state.comments.map(comment => {
            return (
                <p>-{comment.comment_body}</p>
            )
        })
    }


    render(){ 
        return (
            <div className="Full-Project">
                <div className="Single-Project">
                    <h2>{this.props.currentData.title}</h2>
                    <h3>Status: {this.props.currentData.project_status}</h3>
                    <p>Description: {this.props.currentData.description}</p>
                    {this.state ? this.displayComments() : null}
                </div>
            </div>
        )
    }
}

export default DisplayProject