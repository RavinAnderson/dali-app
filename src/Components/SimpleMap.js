import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, StandaloneSearchBox } from '@react-google-maps/api';

class SimpleMap extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            center: {
                lat: 0,
                lng: 0,
            },
            loading: false,
            mapAPILoaded: false,
            mapInstance: false,
            mapInstance: null,
            description: '',
            mapApi: null,
            defaultZoom: 12,
            infoFlag: false,
            id: 3,
            places: []
        };
    }

    componentWillMount = () => {
        this.getGeoLocation();
    }

    getGeoLocation(){
        return navigator.geolocation.getCurrentPosition(this.success, this.error, {timeout: 5000});
    }

    success = (position) => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        this.setState({center: currentPosition});
    }

    error = () => {
        const currentPosition = {
            lat: 47.6062,
            lng: -122.3321
        };
        this.setState({center: currentPosition});
    }

    onLoad = (ref) => {
        this.searchBox = ref;
    }

    onMapLoad = (ref) => {
        this.map = ref;
    }

    onPlacesChanged = () => {
        const newCenter = {
            lat: this.searchBox.getPlaces()[0].geometry.location.lat(),
            lng: this.searchBox.getPlaces()[0].geometry.location.lng()
        };
        this.setState({center: newCenter});
        this.forceUpdate();
    }

    render() {
        let infoWindow;
        if(this.state.infoFlag){
            infoWindow = 
            <InfoWindow
                onLoad={this.onLoad}
                onCloseClick={() => this.setState({infoFlag: false})}
                position={this.state.myIndoWindow?.position}>
                <div style={{backgroundColor: '#264653', opacity: 1, padding: 3, color: 'white', decoration: 'none'}}>
                <p><b>{this.state.myIndoWindow?.name}</b></p>
                <p>{<p><img src={this.state.myInfoWinodw?.imgSrc} alt="attraction" /></p>}</p>
                <p><a href={this.state.myIndoWindow?.imgSrc}>Learn More</a></p>
                <p>{this.state.myIndoWindow?.address}</p>
                </div>
            </InfoWindow>;
        }
        else{
            infoWindow = null;
        }
        return (
            <div className="demo-app">
                <div className="demo-app-main">
                    <div className="containerStyle">
                        <LoadScript googleMapsApiKey="AIzaSyDsPHZkuzQTjiWulaK_1H5Z_CPS3VaLjGE" language="en" libraries={["places"]}>
                            <GoogleMap mapContainerStyle={containerStyle} center={this.state.center} zoom={this.state.defaultZoom}
                                onClick={this.onClickChange} onLoad={this.onMapLoad} >
                                <StandaloneSearchBox onLoad={this.onLoad} onPlacesChanged={this.onPlacesChanged}>
                                    <input type="text" placeholder="Search..."
                                    style={{
                                        boxSizing: 'border-box',
                                        border: '1px solid transparent',
                                        width: '400px',
                                        height: '45px',
                                        padding: '0 12px',
                                        borderRadius: '3px',
                                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                                        fontSize: '14px',
                                        outline: 'none',
                                        textOverflow: 'ellipses',
                                        position: 'absolute',
                                        left: "50%",
                                        marginLeft: "20em",
                                        marginTop: "2em"
                                    }}/>
                                </StandaloneSearchBox>
                                {this.state.places.map((myPlace) => {
                                    return <Marker label={labels[myPlace.id - 1]} key={myPlace.id} position={myPlace.position} onClick={() => this.updatePlace(myPlace)} />
                                })}
                                {infoWindow}
                            </GoogleMap>
                        </LoadScript>
                    </div>
                </div>
            </div>
        );
    }


    updatePlace = (newLoc) => {
        this.setState({myInfoWindow: newLoc, infoFlag: true});
    }

    onClickChange= (locPosition) => {
        this.setState(state => ({
            center: {
                ...state.center,
                lat: locPosition.lat,
                lng: locPosition.lng
            },
            defaultZoom: 16,
            infoFlag: state.infoFlag,
            places: state.places
        }))
    };
}

const containerStyle = {
    height: '70vh',
    width: '100%',
};

const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default SimpleMap;