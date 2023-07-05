import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import SettingProvider from 'contexts/SettingProvider';
import { BaseProvider, ColorMode, IBaseConfig, StorageManager } from 'packages/core';
import 'packages/localization';
import RootStacks from 'stacks';
import store, { persistor } from 'stores';
import { customColors } from 'themes/colors';

const config: IBaseConfig = {
    dependencies: {
        'liner-gradient': require('react-native-linear-gradient').default,
    },
};

// TODO: need wrap logic to file
const colorModeManager: StorageManager = {
    get: async () => {
        try {
            const val = await AsyncStorage.getItem('@color-mode');
            return val === 'dark' ? 'dark' : 'light';
        } catch (e) {
            return 'light';
        }
    },
    set: async (value: ColorMode) => {
        try {
            await AsyncStorage.setItem('@color-mode', value);
        } catch (e) {
            console.log(e);
        }
    },
};

function App() {
    return (
        <BaseProvider config={config} colorModes={customColors} colorModeManager={colorModeManager}>
            <SettingProvider>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <RootStacks />
                    </PersistGate>
                </Provider>
            </SettingProvider>
        </BaseProvider>
    );
}

export default App;
