{/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */}
import React, { Component } from 'react';
import {
AsyncStorage,
	Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
const { width, height } = Dimensions.get("window");

const background = require("./login1_bg.png");
const mark = require("./login1_mark.png");
const lockIcon = require("./login1_lock.png");
const personIcon = require("./login1_person.png");

export default class LoginScreen extends Component {
    	constructor(props){
		super(props)
		this.state = {
				username: '',
				password: '',
		}
	}
static navigationOptions = {
    title: 'Welcome',
  };

	setName = (value) => {
		AsyncStorage.setItem('username', value);
		this.setState({ 'username': value });
	}

	setPassword = (value) => {
		AsyncStorage.setItem('password', value);
		this.setState({ 'password': value });
	}


/* checkCredentials() {
 *         console.log("hello popup");
 *          fetch("http://192.168.0.101:3001/login", {method: "POST", headers body: JSON.stringify({username: "admin", password: "admin",})})
 *         .then((response) => response.json())
 *         .then((responseData) => {
 *             [> console.log("you are into fetch"); <]
 *             Alert.alert(
 *                 "POST Response",
 *                 "Response Body -> " + (responseData.status)
 *             )
 *             console.log("responseData", responseData);
 *         }).catch((error) => {
 *         console.error(error);
 *       });
 *     }
 *  */



	checkCredentials = () => {
fetch('http://192.168.0.101:3001/login', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
			username: this.state.username,
			password: this.state.password,
  })
}).then((response) => response.json())
		.then((responseData) => {
			/* console.log("you are into fetch"); */
			Alert.alert(
				"POST Response",
				"Response Body -> " + (responseData.status)
			)
			console.log("responseData", responseData);
		}).catch((error) => {
		console.error(error);
	  });
	}

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image source={background} style={styles.background} resizeMode="cover">
          <View style={styles.markWrap}>
            <Image source={mark} style={styles.mark} resizeMode="contain" />
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                placeholder="Username" 
				onChangeText = {this.setName}
                placeholderTextColor="#FFF"
                style={styles.input} 
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                placeholderTextColor="#FFF"
                placeholder="Password" 
				onChangeText = {this.setPassword}
                style={styles.input} 
                secureTextEntry 
              />
            </View>
            <TouchableOpacity activeOpacity={.5}>
              <View>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5} onPress={this.checkCredentials}>
              <View style={styles.button} >
                <Text style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Don not have an account?</Text>
              <TouchableOpacity activeOpacity={.5} >
                <View>
					<Button
						  onPress={() => navigate('signUp')}
						  title="Sign Up"
						/>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width,
    height,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#FF3366",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
  }
});
