import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { HybridContext } from 'packages/core/hybrid-overlay';
import { useTheme } from 'packages/hooks';
import { useThemeColors } from 'packages/hooks/useTheme';
import { Toast } from 'packages/uikit/components';
import { globalLoading } from 'packages/uikit/components/Loading';
import { IColors } from 'packages/uikit/theme';
import { scale } from 'themes/scales';

const LoginScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const { colorMode } = useContext(HybridContext);
    const { toggleColorMode } = colorMode;

    const showToastTop = () => {
        Toast.show({
            text1: 'allo',
            text2: 'bllo',
            type: 'success',
            props: {
                text1: 'allll',
                text1Style: styles.text1,
            },
        });
    };

    const showToastBottom = () => {
        Toast.show({
            text1: 'allo',
            type: 'base',
            position: 'bottom',
        });
    };

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
                <TouchableOpacity onPress={showToastBottom} style={styles.btn}>
                    <Text>Toast base Bottom</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleColorMode} style={styles.btn}>
                    <Text>Toggle Color Mode</Text>
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
            paddingTop: Sizes.statusBarHeight,
            backgroundColor: themeColors.backgroundDisabled,
        },
        content: {
            marginHorizontal: scale(15),
        },
        btn: {
            height: scale(50),
            width: scale(340),
            marginTop: scale(40),
            alignItems: 'center',
            borderColor: 'black',
            borderWidth: scale(1),
            justifyContent: 'center',
            borderRadius: scale(5),
        },
        text1: {
            fontSize: scale(30),
        },
    });
};
