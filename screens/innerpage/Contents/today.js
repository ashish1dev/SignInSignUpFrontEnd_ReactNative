import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
TextInput,
  Text,
  StatusBar,
  View
} from 'react-native';
import MapView from 'react-native-maps'




export default class TodayView extends Component {
	state = {
  mapRegion: null,
  lastLat: null,
  lastLong: null,
}

componentDidMount() {
this.setPosition();

	
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
      this.onRegionChange(region, region.latitude, region.longitude);
    });
  }


setPosition(){
		navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
            position: position
        });
    }, (error) => {
        alert(error)
    }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
	}


onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

 componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

 render() {
    return (
      <View style={{flex: 1}}>
        <MapView
		style={styles.map}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          onRegionChange={this.onRegionChange.bind(this)}>
          <MapView.Marker
            coordinate={{
              latitude: (this.state.lastLat + 0.00050) || -36.82339,
              longitude: (this.state.lastLong + 0.00050) || -73.03569,
            }}>
            <View>
              <Text style={{color: '#000'}}>
                { this.state.lastLong } / { this.state.lastLat }
              </Text>
            </View>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    backgroundColor: '#455A64',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});


