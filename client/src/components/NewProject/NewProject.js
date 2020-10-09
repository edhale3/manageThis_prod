import React, { Component } from 'react'
import axios from 'axios'
import '../NewProject/NewProject.scss'

class NewProject extends Component {
    constructor() {
        super()
        this.state = {}
    }

    componentDidMount = () => {
        axios.get("/api/newproject")
        .then(res => {
            if(res.data === false){
                window.location.replace('/signin')
            } 
        })
        .catch(err=> {
            console.error(err)
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let newData = this.state
        axios.post("/api/newproject", newData)
        .then(res => {
            window.location.replace('/account')

        })
        .catch(err => {
            console.error(err)
        })
    }

    textAreaCounter = () => {
        if(this.state.description){
            return this.state.description.length < 3001 ? 
            3000 - this.state.description.length + "/3000" : "0/3000"
        } return "3000/3000"

    }

    render() {
        return ( 
        <div className='Project-Page'>
            <div className='Project-Div'>
                <form className='Project-Form' onSubmit={this.onSubmit}>
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
                    <p>{this.textAreaCounter()}</p>
                    <br/>
                    <button onClick={this.handleSubmit}>Submit</button>
                    <br />
                </form>
            </div>
        </div>
        )
    }
}


export default NewProject