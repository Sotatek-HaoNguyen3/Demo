import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Button from 'components/Button';
import ButtonText from 'components/ButtonText';
import ImageBase from 'components/Image';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';
import Switch from 'components/Switch';

const LoginScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [themeMode, setThemeMode] = useState('light'); // Set the default theme mode
    const [switchValue, setSwitch] = useState<boolean>(true);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View>
                    <TextInput
                        placeholder='Email'
                        value={email}
                        onChangeText={setEmail}
                    keyboardType='email-address'
                    />
                </View>
                <View>
                    <TextInput
                        placeholder='Password'
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
                <Button
                        // left={renderLeftSelection()}
                        title={'Login'}
                        // titleStyles={styles.selectionText}
                        onPress={() => console.log('Login')}
                />
               <ButtonText
                 title='Register'
                 onPress={() => console.log('Register')}
               />
               {/* <ImageBase/> */}
               <Switch
                value={switchValue}
                onValueChange={() => setSwitch(!switchValue)}
               />
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
