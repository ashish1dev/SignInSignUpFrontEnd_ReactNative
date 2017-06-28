

import React, { Component } from 'react';
import {
	AppRegistry,
  Text,
	Button,
  View
} from 'react-native';

import { StackNavigator } from 'react-navigation';

export default class innerPage extends Component {

static navigationOptions = {
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
		title: "logout screen"
	}
	render(){
		return (
			<Text> logout </Text>
			
		)
	}
}



const MainScreenNavigator = DrawerNavigator({
    Recent: {
        screen: innerpage
    },
    All: {
        screen: Logout
    },
});









AppRegistry.registerComponent('screens', () => MainScreenNavigator);

