import 'packages/localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import SettingProvider from 'contexts/SettingProvider';
import { BaseProvider, ColorMode, IBaseConfig, StorageManager } from 'packages/core';
import { extendTheme } from 'packages/core/extendTheme';
import { theme as defaultTheme } from 'packages/uikit';
import { Toast } from 'packages/uikit/components';
import RootStacks from 'stacks';
import store, { persistor } from 'stores';
import { myColors, MyColorsType } from 'themes/colors';

const myTheme = extendTheme({
    colors: myColors,
    fontConfig: {
        Roboto: {
            100: 'Roboto-Light',
            200: 'Roboto-Light',
            300: 'Roboto-Light',
            400: {
                normal: 'Roboto-Regular',
                italic: 'Roboto-Italic',
            },
            500: 'Roboto-Medium',
            600: 'Roboto-Medium',
            700: {
                normal: 'Roboto-Bold',
                italic: 'Roboto-BoldItalic',
            },
            800: 'Roboto-Bold',
            900: 'Roboto-Black',
        },
    },
    fonts: {
        ...defaultTheme.fonts,
        heading: 'Roboto',
        body: 'Roboto',
        mana: 'Roboto',
    },
});

type MyThemeType = typeof myTheme;
// NOTE: The module name in package.json
declare module 'demo-react-native' {
    interface ICustomTheme extends MyThemeType {}
    interface ICustomColors extends MyColorsType {}
}

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
        <BaseProvider config={config} colorModeManager={colorModeManager} theme={myTheme}>
            <SettingProvider>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <RootStacks />
                    </PersistGate>
                    <Toast />
                </Provider>
            </SettingProvider>
        </BaseProvider>
    );
}

export default App;
