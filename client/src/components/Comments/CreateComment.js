import React, {Component} from 'react'
import Axios from 'axios'
// import '../Comments/CreateCommment.scss'
import '../Comments/CreateComment.scss'

class CreateCommment extends Component {
    constructor (){
        super()
        this.state = {
            comment_title: '',
            comment_body: '',
            project_id: ''
        }
    }

    //upon mounting setup state with added project id from parent component (Account)
    componentDidMount = () => {
        this.setState(prevState => {
            return {
                comment_title: prevState.comment_title,
                comment_body: prevState.comment_body,
                project_id: this.props.project_id
            }
        })
    }

    //change state according to the supplied form values
    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    //submit form data that is stored in state. send to the api
    handleSubmit = (e) => {
        e.preventDefault()
        Axios.post("/api/createcomment", this.state)
        .then(res => {
            console.log(res)
            this.setState({ newComment: res.data})
        })
        .catch(err => {
            console.error(err)
        })

        this.props.data(this.state.project_id)
    }

    //render
    render () {
        return (
            <div className="Add-Comment">
                <h2>Add Comment/Update:</h2>
                <div className='Comment-Div'>
                <form className='Comment-Form' onSubmit={this.onSubmit}>
                    <br /><label>Title of Comment</label><br />
                    <input
                        type="text"
                        name="comment_title"
                        onChange={this.onChange}
                        value={this.state.comment_title}
                    /><br />
                    <label>Comment</label><br />
                    <textarea
                        type="textarea"
                        className="Comment"
                        name="comment_body"
                        value={this.state.comment_body}
                        onChange={this.onChange}
                    /><br />
                    {this.state.newComment ? this.state.newComment : null}
                    <br/>
                    <button onClick={this.handleSubmit}>Submit</button>
                    <br />
                </form>
            </div>
            </div>
        )
    }
}

export default CreateCommment