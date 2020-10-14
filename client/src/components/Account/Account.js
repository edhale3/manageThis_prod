import Axios from 'axios';
import React, { Component } from 'react';
import '../Account/Account.scss'
import DisplayProject from '../DisplayProject/DisplayProject';
import Projects from '../Projects/Projects'
import CreateComment from '../Comments/CreateComment'
import { find } from 'lodash';


class Account extends Component {
    constructor(){
        super()
        this.state = {}
    }

    componentDidMount = () => {
        Axios.get("/api/account")
        .then(res => {
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
             return {title: item.title, key:item.project_id}
         })
    }

    getNewProject = () => {
        window.location.replace("/newproject")
    }

    getData = (id) => {
        this.setState(prevState => ({
            data: prevState.data,
            currentId: null
        }))
        setTimeout(()=> {
            this.setState(prevState => ({
                data: prevState.data,
                currentId: id
            }))
        }, 100)
    }

    sendData = () => {
        let newData = this.state.data.find(item => {
            if(item.project_id == this.state.currentId){
                return item
            }
        })
        return (
            <div ref="displays">
                <DisplayProject  ref="display-project" currentData={newData}/>
                <CreateComment project_id={newData.project_id} data={this.getData}/>
            </div>

        )
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
                        Welcome, {this.state.data ? this.state.data[0].first_name : "User"}
                    </div>
                    <button onClick={this.getNewProject} className="New-Project">New Project</button>
                </div>
                <Projects data={this.getTitles()} projectId={this.getData}/>
                 {this.state.currentId ? this.sendData() : null}
            </div>
        )
    }
}

export default Account;