import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootParamList } from './types';

import Screens from 'screens';
import { navigationRef } from 'utils/navigationUtils';

const Stack = createNativeStackNavigator<RootParamList>();

function RootStacks() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Screens.Login} />
                <Stack.Screen name="Home" component={Screens.Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStacks;
