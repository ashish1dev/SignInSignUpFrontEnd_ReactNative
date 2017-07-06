{/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */}
import React, { Component } from 'react';
import {
  AppRegistry,
	Linking,
	Platform,
  StyleSheet,
  Text,
	Button,
  View,
	Alert,
  Image,
  TextInput,
	AsyncStorage,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
import { StackNavigator } from 'react-navigation';
const background = require("./signup_bg.png");
const backIcon = require("./back.png");
const personIcon = require("./signup_person.png");
const lockIcon = require("./signup_lock.png");
const emailIcon = require("./signup_email.png");
const birthdayIcon = require("./signup_birthday.png");




export default class SignupView extends Component {


	constructor(props){
		super(props)
		this.state = {
				username: '',
				password: '',
				email: '',
				user: undefined, // user has not logged in yet
		}
	}


//Set up Linking
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
  loginWithFacebook = () => this.openURL('http://192.168.43.114:3001/auth/facebook');

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
    title: 'hello',
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

	setEmail = (value) => {
		AsyncStorage.setItem('email', value);
		this.setState({ 'email': value });
	}

	joinUs = () => {
		fetch('http://192.168.43.114:3001/signUp', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
				email: this.state.email,
			})
		}).then((response) => response.json())
		.then((responseData) => {
			/* console.log("you are into fetch"); */
			if (responseData.error == true)
			{
			Alert.alert(
				"POST Response",
				"Response Body -> " + (responseData.message)
			)}
			if (responseData.error == false)
			{
			Alert.alert(
				"POST Response",
				"Response Body -> " + (responseData.message)
			)}	
		})
	}





  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image 
          source={background} 
          style={[styles.container, styles.bg]}
          resizeMode="cover"
        >
          <View style={styles.headerContainer}>
            <View style={styles.headerIconView}>
              <TouchableOpacity style={styles.headerBackButtonView}>
                <Image 
                  source={backIcon} 
                  style={styles.backButtonIcon} 
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
	          </View>

          <View style={styles.inputsContainer}>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image 
                  source={personIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="username"
				onChangeText = {this.setName}
				placeholderTextColor="#FFF"
                underlineColorAndroid='transparent' 
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image 
                  source={emailIcon} 
                  style={styles.inputIcon} 
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="Email"
				onChangeText = {this.setEmail}
                placeholderTextColor="#FFF" 
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image 
                  source={lockIcon} 
                  style={styles.inputIcon} 
                  resizeMode="contain"
                />
              </View>
              <TextInput
                secureTextEntry={true}
                style={[styles.input, styles.whiteFont]}
                placeholder="Password"
				onChangeText = {this.setPassword}
                placeholderTextColor="#FFF" 
              />
            </View>

                      </View>

          <View style={styles.footerContainer}>

            <TouchableOpacity onPress={this.joinUs}>
              <View style={styles.signup}>
                <Text style={styles.whiteFont}>Join</Text>
              </View>
            </TouchableOpacity>
<View style={styles.signupWrap}>
              <Text style={styles.accountText}>Already have an account?</Text>
              <TouchableOpacity activeOpacity={.5} >
                <View style={styles.button2} >
					<Text style={styles.buttonText}
						  onPress={() => navigate('login')}
						>Sign In </Text>
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


let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    paddingTop: 30,
    width: null,
    height: null
  },
  headerContainer: {
    flex: -1,
  },
signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputsContainer: {
    flex: 2,
    marginTop: 40,
  },
  footerContainer: {
    flex: 1
  },
  headerIconView: {
    marginLeft: 10,
    backgroundColor: 'transparent'
  },
  headerBackButtonView: {
    width: 25,
    height: 25,
  },
  backButtonIcon: {
    width: 25,
    height: 25
  },
  headerTitleView: {
    backgroundColor: 'transparent',
    marginTop: 25,
    marginLeft: 25,
  },
  titleViewText: {
    fontSize: 40,
    color: '#fff',
  },
  inputs: {
    paddingVertical: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent',
    flexDirection: 'row',
    height: 75,
  },
  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    width: 30,
    height: 30,
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
  signup: {
    backgroundColor: '#FF3366',
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#FFF'
  },
	buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
	buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 2,
    marginBottom: 5,
  },
button2: {
    backgroundColor: "#FF3366",
    paddingVertical: 20,
	paddingHorizontal: 40,
    justifyContent: "center",
    marginTop: 20,
	height: 50,
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
    marginBottom: 10,
  },
 accountText: {
    color: "#D8D8D8",
	 paddingHorizontal: 20,
	 marginTop: 20,
	 fontSize: 20
  },



})
