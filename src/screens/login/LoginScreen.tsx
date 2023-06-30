import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';
import { Toast } from 'components/Toast/Toast';

const LoginScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const showToastTop = () => {
        Toast.show(
            {
                text1: 'allo',
                text2: 'bllo',
                type: 'success',
                props: {
                    text1: 'allll',
                    text1Style: styles.text1,
                },
            }
        )
    }

    const showToastBottom = () => {
        Toast.show(
            {
                text1: 'allo',
                type: 'base',
                position: 'bottom',
            }
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View>
                    <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                </View>
                <View>
                    <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
                </View>

                <TouchableOpacity onPress={showToastTop} style={styles.btn}>
                    <Text>Toast base Top</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showToastBottom}  style={styles.btn}>
                    <Text>Toast base Bottom</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Sizes.statusBarHeight,
    },
    content: {
        marginHorizontal: scale(15),
    },
    btn:{
        height: scale(50),
        width: scale(340),
        marginTop: scale(40),
        alignItems: 'center',
        borderColor:'black',
        borderWidth: scale(1),
        justifyContent: 'center',
        borderRadius: scale(5),
    },
    text1:{
        fontSize: scale(30),
    },
});
