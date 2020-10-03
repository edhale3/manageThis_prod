import React, { Component } from 'react';
import '../Buttons/AboutContact.scss'

class AboutContact extends Component {
    constructor(){
        super()
        this.state = {
          data:null,
          search: null
        }
    }

    render () {
        return (
            <div>
                <div className= "Extra-Buttons">
                    <a href="/About" className="About">About</a>
                    <a href="/Contact" className="Contact">Contact</a>
                </div>
            </div>
        )
    }
}
 
export default AboutContact;