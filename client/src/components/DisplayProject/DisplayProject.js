import React, { Component } from "react";
import Axios from 'axios'
import '../DisplayProject/DisplayProject.scss'
import NewProject from "../NewProject/NewProject";
import { indexOf } from "lodash";

class DisplayProject extends Component {
    constructor(){
        super()
        this.state = {
            comments: [],
            editToggle: false,
            title:'',
            project_status:'',
            description: '',
            project_id: ''
        }
        this.toggleEdit = this.toggleEdit.bind(this)
    }

    //upon mounting get comments for the matching project_id
    componentDidMount = () => {
        Axios.get(`/api/getcomments/${this.props.currentData.project_id}`)
        .then(res=> {
            this.setState({
                comments: res.data,
                editToggle: false,
                title:this.props.currentData.title,
                project_status:this.props.currentData.project_status,
                description: this.props.currentData.description,
                project_id: this.props.currentData.project_id
            })
        })
        .catch (err => {
            throw err
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let newData = {
            title: this.state.title,
            project_status: this.state.project_status,
            description: this.state.description,
            project_id: this.state.project_id
        }
        Axios.patch(`/api/updateproject/${this.state.project_id}`, newData)
        .then(res => {
            this.setState({
                title:newData.title,
                project_status:newData.project_status,
                description:newData.description
            })
            console.log("this is the current state (displayproject): ", this.state)
            // this.props.data(newData.project_id)
            this.toggleEdit()
        })
        .catch(err => {
            console.error(err)
        })
    }

    //toggle edit functionality
    toggleEdit = () => {
        this.setState({editToggle:!this.state.editToggle})
    }

    //first remove the comment from the current state and then remove comment from the database
    deleteComment = (e) => {
        let commentIndex = e.target.getAttribute("data-index")
        let commentKey = e.target.getAttribute("data-key")
        const tempArr = [...this.state.comments]
        tempArr.splice(commentIndex,1)
        this.setState({
            comments:tempArr
        })
        Axios.delete(`/api/deletecomment/${commentKey}`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            throw err
        })

    }

    //dynamically create paragraph elements of the comments (titles for now)
    displayComments = () => {
        return this.state.comments.map(comment => {
            // console.log(this.state.comments.indexOf(comment))
            return (
                <div data-key={this.state.comments.indexOf(comment)}>
                    <p>-{comment.comment_body}
                        <button onClick={this.deleteComment} data-key={comment.comment_id} data-index={this.state.comments.indexOf(comment)} style={{
                            backgroundColor:'red', 
                            color:'white', 
                            height:'min-content', 
                            width:'min-content'
                        }}>Delete
                        </button>
                    </p>
                </div>
            )
        })
    }

    deleteProject = (e) => {
        e.preventDefault()
        console.log(this.state.project_id)
        let answer = prompt("Are you sure you want to do this? (y/n)")
        if(answer == 'y'){
            Axios.delete(`/api/deleteproject/${this.state.project_id}`)
            .then(res => {
                console.log(res)
                if(res.data == "Success"){
                    window.location.replace('/account')
                } else {
                    console.log("got here. maybe didn't work.")
                }
    
            })
            .catch(err => {
                throw err
            })
        } else {
            console.log("do nothing")
        }
    }

    //render comp
    render(){ 
        if(this.state && this.state.editToggle){
            return(
                <div className='Edit-Div'>
                    <form className='Edit-Form' onSubmit={this.onSubmit}>
                        <br /><label>Title of Project</label><br />
                        <input
                            type="text"
                            name="title"
                            onChange={this.onChange}
                            value={this.state.title}
                        /><br />
                        <label>Project Status</label><br />
                        <input
                            type="text"
                            name="project_status"
                            value={this.state.project_status}
                            onChange={this.onChange}
                        /><br />
                        <label>Description of Project</label><br />
                        <textarea
                            type="textarea"
                            className="Description"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}
                            onKeyUp={this.textAreaCounter}
                        /><br />
                        {/* <p>{this.textAreaCounter()}</p> */}
                        <br/>
                        <button onClick={this.handleSubmit}>Update</button>
                        <button onClick={this.toggleEdit}>Cancel</button>
                        <button onClick={this.deleteProject} style={{backgroundColor: 'red', color:'white'}}>Delete</button>
                        <br />
                    </form>
                </div>
                // <NewProject/>
            )
        }
        console.log("render this")
        return (
            
            <div className="Full-Project">
                <div className="Single-Project">
                    <button onClick={this.toggleEdit}>Edit Post</button>
                    {/* <h2>{this.props.currentData.title}</h2> */}
                    <h2>{this.state.title}</h2>
                    <h3>Status: {this.state.project_status}</h3>
                    <p>Description: {this.state.description}</p>
                    {this.state.comments ? this.displayComments() : null}
                </div>
            </div>
        )
    }
}

export default DisplayProject