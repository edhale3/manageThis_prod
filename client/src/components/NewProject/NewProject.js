import React, { Component } from 'react'
import axios from 'axios'

class NewProject extends Component {
    constructor() {
        super()
        this.state = {}
    }

    componentDidMount = () => {
        axios.get("/newproject")
        .then(res => {
            console.log(res)
        })
        .catch(err=> {
            console.error(err)
        })
    }

    onChange = (e) => {
        console.log(e.target)
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let newData = this.state
        axios.post("/newproject", newData)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.error(err)
        })
    }

    render() {
        return ( 
        <div className='project-page'>
            <div className='project-div'>
                <form className='project-form' onSubmit={this.onSubmit}>
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
                    <input
                        type="text"
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange}
                    /><br />

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