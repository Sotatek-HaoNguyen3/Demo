
import React from 'react';

import { View } from 'react-native';
import { Provider } from 'react-redux';

import SettingProvider from 'contexts/SettingProvider';

import RootStacks from 'stacks';
import { store } from 'stores';



function App() {
    return (
        <SettingProvider>
            <Provider store={store}>
                <View style={{ flex: 1 }}>
                    <RootStacks />
                </View>
            </Provider>
        </SettingProvider>
    );
}

export default App;
