import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootParamList } from './types';

import { BottomTab } from 'navigation';
import Screens from 'screens';
import { navigationRef } from 'utils/navigationUtils';

const Stack = createNativeStackNavigator<RootParamList>();

function RootStacks() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Screens.LoginScreen} />
                <Stack.Screen name="Register" component={Screens.RegisterScreen} />
                <Stack.Screen name="Intro" component={Screens.IntroScreen} />
                <Stack.Screen name="Main" component={BottomTab} />
                <Stack.Screen name="Post" component={Screens.PostScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStacks;
