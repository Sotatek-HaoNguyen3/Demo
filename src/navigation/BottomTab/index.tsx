import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StyleSheet } from 'react-native';

import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors } from 'packages/uikit';

import Screens from 'screens';
import { scale } from 'themes/scales';

const Tab = createBottomTabNavigator();

function BottomTab() {
    const colors = useThemeColors();
    const styles = Styles(colors);
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    ...styles.tab,
                    // ...styles.shadow,
                },
                tabBarShowLabel: false,
            }}>
            <Tab.Screen name="Home" component={Screens.Home} />
            <Tab.Screen name="Search" component={Screens.SearchScreen} />
            <Tab.Screen name="Post" component={Screens.PostScreen} />
            <Tab.Screen name="Setting" component={Screens.SettingScreen} />
            <Tab.Screen name="Profile" component={Screens.ProfileScreen} />
        </Tab.Navigator>
    );
}

export default BottomTab;

const Styles = (themeColors: IColors) => {
    return StyleSheet.create({
        tab: {
            height: scale(90),
            backgroundColor: themeColors.background,
            borderTopWidth: 0,
        },
        shadow: {
            shadowColor: themeColors.secondary,
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 5,
        },
    });
};
