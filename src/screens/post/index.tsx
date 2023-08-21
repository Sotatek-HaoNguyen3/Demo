import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PostScreen = () => {
    const styles = Styles();
    return (
        <View style={styles.container}>
            <Text>Post</Text>
        </View>
    );
};

export default PostScreen;

const Styles = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
};
