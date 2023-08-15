import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileScreen = () => {
    const styles = Styles();
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
        </View>
    );
};

export default ProfileScreen;

const Styles = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
};
