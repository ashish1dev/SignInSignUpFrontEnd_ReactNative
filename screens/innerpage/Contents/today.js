import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View
} from 'react-native';
import MapView from 'react-native-maps'

export default class TodayView extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <View style= { styles.container }>
		<MapView 
		style ={ styles.map	}
		initialRegin = {{
			latitude: 39.749632,
			longitude: -105.000363,
			latiduteDelta: 0.0222,
			longitudeDelta: 0.0201,
		}}
		/>
        </View>
    );
  }
};

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
