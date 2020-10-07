import Axios from 'axios';
import React, { Component } from 'react';
import '../Account/Account.scss'
import Projects from '../Projects/Projects'



class Account extends Component {
    constructor(){
        super()
        this.state = {}
    }

    componentDidMount = () => {
        Axios.get("/api/account")
        .then(res => {
            console.log(res)
            if(res.data === false ){
                window.location.replace("/signin")
            }
            this.setState({ data: res.data})
        })
        .catch(err => {
            throw err
        })
    }

    logoutButton = () => {
        Axios.get("/api/logout")
        .then(res => {
            window.location.replace("/signin")
        })
        .catch(err=> {
            throw err
        })
    }

    getTitles = () => {
         return this.state.data.map(item => {
             return item.title
         })
    }

    // getData = () => {
    //     return Object.keys(this.state.data).map(item => {
    //         return (<div key={Math.floor(Math.random()*200)}>{this.state.data[item]}</div>)
    //     })
    // }

    getNewProject = () => {
        window.location.replace("/newproject")
    }

    render(){
        if(!this.state.data){
            return (
                <div> Loading... </div>
            )
        }
        return (
            <div className="Account-Container">
                <div className="Account-Header">
                    <div className="Welcome-Header">                    
                        <button onClick={this.logoutButton} className="Logout-Header">Logout</button>
                        Welcome to ManageThis, {this.state.data ? this.state.data[0].first_name : "User"}
                    </div>
                </div>
                <button onClick={this.getNewProject} className="New-Project">New Project</button>
                <Projects titles={this.getTitles()}/>
            </div>
        )
    }
}

export default Account;