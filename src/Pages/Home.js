import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap'; 

function Home(){
    return(
        <div id="choices">
            <h1>Welcome to my DALI Application App</h1>
            <h2>Please Login or Sign Up Below</h2>
            <div id="buttons">
                <NavLink to={"/login"}>
                    <Button id="loginButton">Login</Button>
                </NavLink>
                <NavLink to={"/signUp"}>
                    <Button id="signUpButton">Sign Up</Button>
                </NavLink>
            </div>
            <iframe src="https://giphy.com/embed/Yxx759KNBlL7zVPj05" id="halloween" width="720" height="405" allowFullScreen></iframe>
        </div>
    );
}

export default withRouter(Home);