
import React from 'react';
import { Form } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import * as db from '../datastore.js';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            class_year: "",
            goals: "",
            profile: null,
            email: "",
            password: ""
        }
    }
    
    onSubmit = () => {
        db.newAccount(this.state.email, this.state.password).then(() => {
            db.postData(this.state.name, this.state.class_year, this.state.goals, this.state.profile);
        });
        // console.log(this.state.profile);
        // console.log(this.state.profile.name);
    }

    renderForm = () => {
        return(
            <div>
                 <Form>
                    <Form.Group className="question" value={this.state.name} onChange={(event) => this.setState({name: event.target.value})}>
                        <Form.Label>What is your name?</Form.Label>
                        <Form.Control type="name" placeholder="John Doe" />
                    </Form.Group>
                    <Form.Group className="question" value={this.state.email} onChange={(event) => this.setState({email: event.target.value})}>
                        <Form.Label>What is your email?</Form.Label>
                        <Form.Control type="email" placeholder="test1234@demo.com" />
                    </Form.Group>
                    <Form.Group className="question" value={this.state.password} onChange={(event) => this.setState({password: event.target.value})}>
                        <Form.Label>Choose a password:</Form.Label>
                        <Form.Control type="password" placeholder="password" />
                    </Form.Group>
                    <Form.Group className="question" value={this.state.class_year} onChange={(event) => this.setState({class_year: event.target.value})}>
                        <Form.Label>What is your class year?</Form.Label>
                        <Form.Select name="year" id="gender" default="2025">
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="question" value={this.state.goals} onChange={(event) => this.setState({goals: event.target.value})}>
                        <Form.Label>What are your goals for this year?</Form.Label>
                        <Form.Control type="goals" as="textarea" rows={3} placeholder="Enter text...." />
                    </Form.Group>
                </Form>
                <div>
                    <h5>Chose a Profile Picture</h5>
                    <input type="file" onChange={(event) => this.setState({profile: event.target.files[0]})} />
                </div>
                {/* <Form.Group controlId="formFileLg" className="question" value={this.state.profile} onChange={(event) => this.setState({profile: event.target.value})}>
                        <Form.Label>Choose a profile picture: </Form.Label>
                        <Form.Control type="file" size="lg" />
                    </Form.Group> */}
                <div>
                <NavLink to={"/"}>
                    <button id="signUptoPortal" onClick={this.onSubmit}>Click Here To Submit</button>
                </NavLink>
                </div>
            </div>
        );
    }

    render(){
        return(
            <div id="login">
                <h2>Welcome to Your MoodBoard! Please Complete the Following Questions to Create a Profile!</h2>
                <div id="questions">
                    {this.renderForm()}
                </div>
                <iframe src="https://giphy.com/embed/pc86ys6vJWdAzu1f2b" title="Waving Glove" width="400" height="400" class="giphy-embed" allowFullScreen></iframe><p></p>
            </div>
        )
    }
}

export default withRouter(Login);