
import React, { Component } from 'react';
import {
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
					  title="Sign In"
				/>
			</View>
		)
	}
}

