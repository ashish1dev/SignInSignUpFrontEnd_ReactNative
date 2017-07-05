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
Linking,
  TouchableOpacity,
  Platform,
} from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';

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
				user: undefined,
		}
	}


componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  };

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      // Decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string))
    });
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  // Handle Login with Facebook button tap
  loginWithFacebook = () => this.openURL('http://192.168.0.101:3001/auth/facebook');

  // Handle Login with Google button tap
  loginWithGoogle = () => this.openURL('http://192.168.0.101:3001/auth/google');

  // Open URL in a browser
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };




static navigationOptions = {
    title: 'Welcome',
	header: false
  };

	setName = (value) => {
		AsyncStorage.setItem('username', value);
		this.setState({ 'username': value });
	}

	setPassword = (value) => {
		AsyncStorage.setItem('password', value);
		this.setState({ 'password': value });
	}



	checkCredentials = () => {
fetch('http://192.168.43.114:3001/login', {
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
			const { navigate } = this.props.navigation;
			/* console.log("you are into fetch"); */
			if (responseData.status == "Failure")
			{
			Alert.alert(
				"POST Response",
				"Response Body -> " + (responseData.status)
			)}
			if (responseData.status == "Success")
			{
				navigate('innerpage')
			}
			console.log("responseData", responseData);
		}).catch((error) => {
		console.error(error);
	  });
	}


  render() {
    const { navigate } = this.props.navigation;
    const { user } = this.state;

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

<View style={styles.buttons}>
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={this.loginWithFacebook}
            {...iconStyles}
          >
            Login with Facebook
          </Icon.Button>
          <Icon.Button
            name="google"
            backgroundColor="#DD4B39"
            onPress={this.loginWithGoogle}
            {...iconStyles}
          >
            Or with Google
          </Icon.Button>
        </View>


        </Image>

      </View>
    );
  }
}


const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

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
    marginTop: 20,
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
  },
	 content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 100,
  },
});
