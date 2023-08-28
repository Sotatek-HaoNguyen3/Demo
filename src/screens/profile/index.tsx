import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors } from 'packages/uikit';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileScreen = () => {
    const colors = useThemeColors();
    const styles = myStyles(colors);

    return (
        <View style={styles.container}>
            <Text>Profile</Text>
        </View>
    );
};

export default ProfileScreen;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
};
