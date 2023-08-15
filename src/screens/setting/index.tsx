import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SettingScreen = () => {
    const styles = Styles();
    return (
        <View style={styles.container}>
            <Text>Setting</Text>
        </View>
    );
};

export default SettingScreen;

const Styles = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
};
