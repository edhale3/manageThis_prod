import React, {Component} from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom"

class SignInForm extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password:'',
            redirect: null
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let signInData = this.state
        axios.post('/signin', signInData).then(res => {
            if(res.status !== 200){
                throw new Error()
            } else {
                this.setState({ redirect: `${res.data[0].id}`})
            }
        })
        .catch((err)=> {
            throw err
        })
    }

    render(){
        if(this.state.redirect){
            return <Redirect to={{ pathname:`/Account`}}/>
        }
        return(
            <div className='Signin-Page'>
                <div className='Signin-Data'>
                    <form className='Signin-Form' onSubmit={this.onSubmit}>
                        <br />
                        <label>Email:</label><br />
                        <input
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                        /><br />
                        <label>Password:</label><br />
                        <input 
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />< br />
                        {this.state.errors ? "ERROR" : ""}
                        <br/>
                        <button className="Signin-Submit"onClick={this.handleSubmit}>SignIn</button>
                        <br />
                    </form>
                </div>
            </div>
        )
    }
}


export default SignInForm