import Axios from 'axios';
import React, { Component } from 'react';
import '../Account/Account.scss'



class Account extends Component {
    constructor(){
        super()
        this.state = {}
    }

    componentDidMount = () => {
        Axios.get("/api/account")
        .then(res => {
            console.log("account res ", res)
            if(res.data == false ){
                window.location.replace("/signin")
            }
            this.setState({ data: res.data})
        })
        .catch(err => {
            throw err
        })
    }

    logoutButton = () => {
        Axios.get("logout")
        .then(res => {
            window.location.replace("/signin")
        })
        .catch(err=> {
            throw err
        })
    }

    getData = () => {
        return Object.keys(this.state.data).map(item => {
                    return (<div key={Math.floor(Math.random()*200)}>{this.state.data[item]}</div>)
                })
    }

    getAllProjects = async () => {
        let response = await Axios.get("/api/projects")
        .then(res => {
            return res.data
        })
        .catch( err => {
            throw err
        })

        console.log("this is the response:", response.rows)
        return response.rows.map(row => {
            console.log("this is a row:", row.title)
            return (
                <a>{row.title}</a>
            )
        })
    }

    render(){
        return (
            <div className="Account-Container">
                <div className="Account-Header">
                <div className="Welcome-Header">                    
                    <a onClick={this.logoutButton} className="Logout-Header">Logout</a>
                    Welcome to ManageThis, {this.state.data ? this.state.data.first_name : "User"}
                </div>
                </div>
                <button src="/newproject" className="New-Project">New Project</button>
                {/* <div className="profile">
                    {this.state.data ? this.getData() : "Display nothing"}
                    <button onClick={this.onClick}>This Button</button>
                </div> */}
            </div>
        )
    }
}

export default Account;