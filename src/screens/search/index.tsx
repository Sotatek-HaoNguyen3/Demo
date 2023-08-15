import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SearchScreen = () => {
    const styles = Styles();
    return (
        <View style={styles.container}>
            <Text>Search</Text>
        </View>
    );
};

export default SearchScreen;

const Styles = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
};
