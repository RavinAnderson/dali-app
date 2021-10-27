
import React from 'react';
import { Form } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import * as db from '../datastore.js';

class ReturnUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }
    
    onSubmit = () => {
        db.signIn(this.state.email, this.state.password);
    }

    renderForm = () => {
        return(
            <div>
                 <Form>
                    <Form.Group className="question2" value={this.state.email} onChange={(event) => this.setState({email: event.target.value})}>
                        <Form.Label>What is your email?</Form.Label>
                        <Form.Control type="email" placeholder="test1234@demo.com" />
                    </Form.Group>
                    <Form.Group className="question2" value={this.state.password} onChange={(event) => this.setState({password: event.target.value})}>
                        <Form.Label>Choose a password:</Form.Label>
                        <Form.Control type="password" placeholder="password" />
                    </Form.Group>
                </Form>
                <NavLink to={"/portal"}>
                    <button id="loginToPortal" onClick={this.onSubmit}>Click Here To Submit</button>
                </NavLink>
            </div>
        );
    }

    render(){
        return(
            <div id="login">
                <h2>Welcome Back to Your MoodBoard! Please Login!</h2>
                <div id="questions">
                    {this.renderForm()}
                </div>
                <iframe src="https://giphy.com/embed/hSL3M5HcV2E0vQfZCE" width="420" height="420" allowFullScreen></iframe>
            </div>
        )
    }
}

export default withRouter(ReturnUser)