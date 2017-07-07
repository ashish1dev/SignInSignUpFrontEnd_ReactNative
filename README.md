# demo by ectolus
This is a React Native App which contain login and signup screen with local, google and facebook authentication. Once login user will see his current location on the map.

##How to use the App.

    

 - `git clone https://AdityaJangid@bitbucket.org/ectolus/signinsignupfrontend_reactnative.git`
 - `cd signinsignupfrontend_rectnative`
 
 Now install all the other third party library dependencies by running the command
 
 - `npm install`

Sometimes an error come on Build on that case run the following command.

  - `cd android && ./gradlew clean `

then run the React Native server by typing

  - `react-native start `

Now you can install the app in your emulator.

- ` react-native run-android`

You can generate a signed apk of the app by following the next steps.
First you need to run this command inside the root directory of your project.

- `react-native bundle --assets-dest ./android/app/src/main/res/ --entry-file ./index.android.js --bundle-output ./android/app/src/main/assets/index.android.bundle --platform android --dev false`

Now open the android directory of the project in the android studio. 

- click on Build in the top bar.
- Then click on Generate Signed APK.

Then follow the directions in android studio. By default the android studio generated the release apk in /android/app directory by name app-release.apk.
