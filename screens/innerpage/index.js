

import React, { Component } from 'react';
import {
  Text,
	Button,
  View
} from 'react-native';

import { DrawerNavigator } from 'react-navigation';
import { StackNavigator } from 'react-navigation';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LoginScreen from "../login/index";
class innerPage extends Component {

	static navigationOptions = {
		drawerLabel: 'Home',
		title: 'maps',
	};
	render() {
	const { navigate } = this.props.navigation;
		return(
			<View>
				<Text> Welcome user</Text>
				<Button
					  onPress={() => navigate('login')}
					  title="Sing in"
				/>
			</View>
		)
	}
}


class Logout extends Component {
	static navigationOptions = {
		drawerLabel: 'logout',
		title: "logout screen"
	}
	render(){
	const { navigate } = this.props.navigation;
		return (
			<View>
				<LoginScreen navigation={ navigate }  />
			</View>
		)
	}
}

export default  MyApp = DrawerNavigator({
	Home: { screen: innerPage },
	logout: { screen: Logout },
});


