import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useTheme } from 'packages/hooks';

import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';
import { HybridContext } from 'packages/core/hybrid-overlay';

const LoginScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { colorMode } = useContext(HybridContext);
    console.log('colorMode', colorMode);
    
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View>
                    <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                </View>
                <View>
                    <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
                </View>

                <TouchableOpacity onPress={colorMode.toggleColorMode}>
                    <Text>Login</Text>
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
});
