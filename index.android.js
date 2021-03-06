{/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */}


import React, { Component } from 'react'; import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginScreen from "./screens/login/index";
import SignupScreen from "./screens/signup/index";
import innerPage from "./screens/innerpage/index";



export default class screens extends Component {
	render() {
		return (
			<View style={styles.container}>
				<LoginScreen />
			</View>
		);
	}
}

const Home = StackNavigator({
	login: { screen: LoginScreen },
	innerpage: { screen: innerPage,
	headerMode: 'none',
    header: null,
    navigationOptions: {
        header: null
    } },
	signUp: { screen: SignupScreen },
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('screens', () => Home);
