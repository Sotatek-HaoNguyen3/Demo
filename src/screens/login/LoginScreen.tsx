import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { AppBar, EmptyListView, ListView } from 'packages/uikit/components';

import { globalDrawer } from 'packages/uikit/components/Drawer';
import { scale } from 'themes/scales';

const LoginScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [themeMode, setThemeMode] = useState('light'); // Set the default theme mode
    const renderItem = (item) => {
        return <Text style={{ color: 'black' }}>{item.item.name}</Text>;
    };

    const renderEmpty = () => <EmptyListView />;

    return (
        <View style={styles.container}>
            <AppBar title={'Login'} hideLeft />
            <View style={styles.content}>
                <View>
                    <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                </View>
                <View>
                    <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
                </View>
                <ListView data={[]} renderItem={renderItem} listEmpty={renderEmpty} />
                <TouchableOpacity onPress={() => globalDrawer.open()}>
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
    },
    content: {
        marginHorizontal: scale(15),
    },
});
