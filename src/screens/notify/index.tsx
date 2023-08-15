import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const NotifyScreen = () => {
    const styles = Styles();
    return (
        <View style={styles.container}>
            <Text>Noti</Text>
        </View>
    );
};

export default NotifyScreen;

const Styles = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
};
