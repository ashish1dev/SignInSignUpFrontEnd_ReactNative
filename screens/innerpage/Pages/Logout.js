
import React, { Component } from 'react';
import {
  Text,
	Button,
  View
} from 'react-native';
import LoginScreen from '../../login/index'
import { DrawerNavigator } from 'react-navigation';
export default class Logout extends Component {
	static navigationOptions = {
		drawerLabel: 'logout',
		title: "logout screen"
	}
	render(){
	const { navigate } = this.props.navigation;
		return (
			<View>
				<LoginScreen navigation={ this.props.navigation }  />
			</View>
		)
	}
}
