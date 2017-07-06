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
  mapRegion: {
        latitude:       26,
        longitude:      77,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      },
  lastLat: 26,
  lastLong: 77,
}

componentDidMount() {
this.setPosition();

	
    this.watchID = navigator.geolocation.watchPosition((position) => {
			console.log("console log inside watcher", position);
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


/* setPosition(){
 *         navigator.geolocation.getCurrentPosition((position) => {
 *         this.setState({
 *             [> position: position <]
 *             lastLat: position.coords.latitude,
 *             lastLong: position.coords.longitude
 *         });
 *     }, (error) => {
 *         alert(error)
 *     }, {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000});
 *     } */



setPosition(){
		navigator.geolocation.getCurrentPosition((position) => {
			console.log("console log inside set position", position);

let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
		this.setState({
			/* position: position */
			mapRegion: region,
			lastLat: region.latitude,
			lastLong: region.longitude
		});
	}, (error) => {
		alert(error)
	}, {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000});
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
          onRegionChange={this.onRegionChange.bind(this)}>
		{/*   <MapView.Marker
         *     coordinate={{
         *       latitude: (this.state.lastLat ) ,
         *       longitude: (this.state.lastLong ),
         *     }}>
         *     <View>
         *       <Text style={{color: '#000'}}>
         *         { this.state.lastLong } / { this.state.lastLat }
         *       </Text>
         *     </View>
         *   </MapView.Marker>
         * </MapView> */}
		{	/* <MapView.Marker coordinate={this.state.mapRegion} /> */}
  <MapView.Marker
            coordinate={{
              latitude: this.state.lastLat ,
              longitude: this.state.lastLong ,
            }}
           
          /> 
          </MapView> 
<View style={styles.bubble}>
          <Text style={{ textAlign: 'center'}}>
            {`${this.state.lastLat.toPrecision(7)}, ${this.state.lastLong.toPrecision(7)}`}
          </Text>
        </View>
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
bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
});


