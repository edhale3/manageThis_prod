import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import '../Header/Header.scss'
import axios from 'axios'

class Header extends Component {
    constructor(){
        super()
        this.state = {
            isLoggedIn: false
        }
    }

    // callLanding = async () => {
    //     const response = await fetch('/landing');
    //     console.log("New response", response)
    //     const body = await response.json();
    //     if(response.status !== 200){
    //         throw Error(response.status, body.message)
    //     }
    //     console.log("The new bod:", body)
    //     return body
    // }

    componentDidMount = () => {
        axios.get("/")
        .then( res => {
            if(res.data == true ){
                this.setState({isLoggedIn: true})
            }
        })
        .catch(err=> {
            throw err
        })
    }

    action = () => {
        if(this.state.isLoggedIn){
            axios.get("/logout")
            .then(res => {
                this.setState({ isLoggedIn: false})
                window.location.pathname = "/SignIn"
            })
            .catch( err => {throw err})
        } else {
            window.location.pathname = "/Signin"
        }

    }
    
    
    render (){

        return (
        <div className='Nav'>
            <Navbar className ="Navbar" expand="lg">
                <Navbar.Brand bsPrefix="Brand" href="/">ManageThis</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link style={ {color: "black"} }href="/">Home</Nav.Link>
                        <Nav.Link style={ {color: "black"} }href="/About">About</Nav.Link>
                        <Nav.Link style={ {color: "black"} }href="/Contact">Contact</Nav.Link>
                        <Nav.Link style={ {color: "black"} } id='SignUp' href="/Signup">Sign Up</Nav.Link>
                        <Nav.Link style={ {color: "black"} } id="SignIn" href="/SignIn">Sign In</Nav.Link>
                        <Nav.Link style= { {color: "blue"}} id="Action" onClick={this.action}>{this.state.isLoggedIn ? "Logout" : "Login"}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>

    )}
}


export default Header