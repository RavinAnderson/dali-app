import React from 'react';
import { withRouter } from 'react-router-dom';
import Weather from '../Components/Weather';
import SimpleMap from '../Components/SimpleMap';
import * as db from '../datastore.js';

class Portal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            class_year: "",
            goals: "",
            profile: "",
        };
    }

    componentDidMount = () => {
        this.renderInfo();
    }

    renderInfo = () => {
        return db.getData().then((info) => {
            this.setState({
                name: info.name,
                class_year: info.class_year,
                goals: info.goals,
                profile: info.profile
            })
        })
    }

    render(){
        return(
            <div id="portal">
                <div id="portalName">
                    Hello {this.state.name}. Get ready to conquer the day! <Weather />
                </div>
                <div id="portalYear">
                    <h4>Give it up for the class of {this.state.class_year}!!!!</h4>
                </div>
                <div id="pic_goals">
                    <div id="portalPic">
                        <h3>You're looking mad cute right now!</h3>
                        <img id="image" src="https://pbs.twimg.com/profile_images/1282407651842957312/R85lpY71.jpg" alt="profile_pic" />
                    </div>
                    <div id="portalGoals">
                        <h3>Are you sleying your current goals?</h3>
                        {this.state.goals}
                    </div>
                </div>
                <div id="mapComponent">
                    <h3>Feel free to explore the area around where you live.</h3>
                    <h4>Type a location of a place and then click the option to take you there, if you want to search for a new place, delete the contents of the searchbox and start typing again!</h4>
                    <div id="map">
                        <SimpleMap />
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Portal);