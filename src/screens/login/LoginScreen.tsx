import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { AppBar, EmptyListView, ListView } from 'packages/uikit/components';

import { globalDrawer } from 'packages/uikit/components/Drawer';
import { scale } from 'themes/scales';
import { globalLoading } from 'packages/uikit/components/Loading';

const LoginScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [themeMode, setThemeMode] = useState('light'); // Set the default theme mode
    const renderItem = (item) => {
        return <Text style={{ color: 'black' }}>{item.item.name}</Text>;
    };

    const renderEmpty = () => <EmptyListView />;

    const getApi = () => {
        globalLoading.show();
        setTimeout(() => {
            globalLoading.hide();
        }, 1000);
    };

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
                <TouchableOpacity>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => globalDrawer.open()}>
                    <Text>Drawer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getApi()}>
                    <Text>Loading</Text>
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
