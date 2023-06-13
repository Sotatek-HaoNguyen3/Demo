import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootParamList } from './types';

import Screens from 'screens';

function RootStacks() {
    const Stack = createNativeStackNavigator<RootParamList>();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Screens.Login} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStacks;
