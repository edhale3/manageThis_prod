import React, { Component } from 'react';
import axios from 'axios';
import '../SignUp/SignUp.scss'
import AboutContact from '../Buttons/AboutContact';

class SignUp extends Component {
    constructor(){
        super();
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            gender: '',
            password: '',
            error: {}
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }


    handleSubmit = (e) => {
        e.preventDefault()
        let newData = this.state

        axios.post('/signup', newData)
        .then(res => {
            console.log(res.data.errors)
            if(res.data){
                console.log(res.data)
                window.location = "https://manage-this-new.herokuapp.com/signin"
            } else {
                window.location.replace("/signup")
            }
        })
        .catch((err)=> {
            console.log("My error", err)
        })

    }

    render() {
        return (
            <div className='Signup-Page'>
                <div className='Signin-Data'>
                <form className='Signin-Form' onSubmit={this.onSubmit}>
                    <br /><label>First Name:</label><br />
                    <input
                        type="text"
                        name="first_name"
                        onChange={this.onChange}
                        value={this.state.first_name}
                    /><br />
                    <label>Last Name:</label><br />
                    <input
                        type="text"
                        name="last_name"
                        value={this.state.last_name}
                        onChange={this.onChange}
                    /><br />
                    <label>Email:</label><br />
                    <input
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                    /><br />
                    {/* <p>{this.state.error.email ? this.state.error.email : ''}</p> */}
                    <label>Password:</label><br />
                    <input 
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                    />< br />
                    {/* <p>{this.state.error.password ? this.state.error.password : ''}</p> */}
                    <label>Gender:</label><br />
                    <div className='Gender'>
                        {/* <div className="radio">
                            <label className="MaleRadio">
                                Male
                                <input name="gender" type="radio" value="Male" checked={this.state.gender === 'Male'} onChange={this.onChange} />
                            </label>
                        </div>
                        <div className="radio">
                            <label className="FemaleRadio">
                                Female
                                <input name="gender" type="radio" value="Female" onChange={this.onChange} checked={this.state.gender === 'Female'} />
                            </label>
                        </div> */}
                        <select className="Gender-Selector" id="cars">
                            <option>---</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <br/>
                    <button className="Signup-Submit" onClick={this.handleSubmit}>Submit</button>
                    <br />
                </form>
                </div>
                <AboutContact />
            </div>
        )
    }
}

export default SignUp