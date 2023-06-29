import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { EmptyListView, FlatListView } from 'packages/components';

import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';
import { globalDrawer } from 'packages/components/Drawer';

const LoginScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [themeMode, setThemeMode] = useState('light'); // Set the default theme mode
    const renderItem = (item) => {
        return <Text style={{ color: 'black' }}>{item.item.name}</Text>
    }

    const renderEmpty = () => <EmptyListView />

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
                <FlatListView data={[]} renderItem={renderItem} listEmpty={renderEmpty} />
                <TouchableOpacity onPress={() => {globalDrawer.open()}}>
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
