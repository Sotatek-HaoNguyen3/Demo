import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FavouriteScreen = () => {
    const styles = Styles();
    return (
        <View style={styles.container}>
            <Text>Favourite</Text>
        </View>
    );
};

export default FavouriteScreen;

const Styles = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
};
