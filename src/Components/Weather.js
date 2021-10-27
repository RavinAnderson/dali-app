import React from 'react';
import axios from 'axios';

class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            location: {
                lat: 0,
                lng: 0
            },
            temperature: ""
        };
    }

    componentWillMount = () => {
        if(navigator.geolocation){
            return navigator.geolocation.getCurrentPosition(this.getPosSuccess);
        }
    }

    getPosSuccess = (pos) => {
        console.log(pos);
        var currentLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        };
        this.setState({location: currentLocation}, () => this.getTemperature());
    }
    
    getTemperature = () => {
        return new Promise((resolve, reject) => {
            axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + this.state.location.lat + '&lon=' + this.state.location.lng + '&units=imperial' + '&appid=' + '13019c6cef3bcf4165d65606b990971d')
              .then((response) => {
                console.log(response.data.current.temp);
                this.setState({temperature: response.data.current.temp});
              })
              .catch((error) => {
                reject(error);
              });
          });
    }

    render(){
        return(
            <div id="weather">
                <h5> Current Temperature: {this.state.temperature} °F </h5>
            </div>
        )
    }
}

export default Weather;