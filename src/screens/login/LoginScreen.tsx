import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { HybridContext } from 'packages/core/hybrid-overlay';
import { useTheme } from 'packages/hooks';
import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors } from 'packages/uikit/theme';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';

const LoginScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const { colorMode } = useContext(HybridContext);
    const { toggleColorMode, mode } = colorMode;

    return (
        <View style={[styles.container, mode === 'dark' ? { backgroundColor: 'green' } : { backgroundColor: 'blue' }]}>
            <View style={styles.content}>
                <View>
                    <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                </View>
                <View>
                    <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
                </View>

                <TouchableOpacity onPress={toggleColorMode}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            paddingTop: Sizes.statusBarHeight,
        },
        content: {
            marginHorizontal: scale(15),
            backgroundColor: themeColors.transparent,
        },
    });
};
