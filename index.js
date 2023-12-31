/**
 * @format
 */

import { AppRegistry, LogBox, Platform, StatusBar, Text, TextInput, TouchableOpacity } from 'react-native';

import App from './App';
import { name as appName } from './app.json';

if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
}

StatusBar.setBarStyle('dark-content');

// @ts-ignore
Text.defaultProps = {};
// @ts-ignore
Text.defaultProps.maxFontSizeMultiplier = 1.0;
// @ts-ignore
Text.defaultProps.allowFontScaling = false;
// @ts-ignore
TextInput.defaultProps = TextInput.defaultProps || {};
// @ts-ignore
TextInput.defaultProps.allowFontScaling = false;
// @ts-ignore
TouchableOpacity.defaultProps = TouchableOpacity.defaultProps || {};
// @ts-ignore
TouchableOpacity.defaultProps.activeOpacity = 0.7;

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'DEPRECATION WARNING',
    'Reanimated 2',
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
    'Require cycle:',
    'ViewPropTypes will be removed from React Native',
    'Error evaluating injectedJavaScript:',
    'You must be registered for remote messages before calling getToken',
]);

AppRegistry.registerComponent(appName, () => App);
