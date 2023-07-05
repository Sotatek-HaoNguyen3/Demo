import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import SettingProvider from 'contexts/SettingProvider';
import { BaseProvider, ColorMode, IBaseConfig, StorageManager } from 'packages/core';
import 'packages/localization';
import { BaseProvider, IBaseConfig } from 'packages/core';
import { Loading } from 'packages/uikit/components';
import Drawer, { globalDrawerRef } from 'packages/uikit/components/Drawer';
import GestureRecognizer from 'packages/uikit/components/Drawer/GestureRecognizer';
import { globalLoadingRef } from 'packages/uikit/components/Loading';
import { onSwipeRight } from 'packages/utils/gestureHandle';
import { Toast } from 'packages/uikit/components';
import RootStacks from 'stacks';
import store, { persistor } from 'stores';
import { customColors, MyColorsType, MyThemeType } from 'themes/colors';
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
const MENU_TEST = [{ name: 'Home' }, { name: 'Profile' }, { name: 'Notification' }, { name: 'Setting' }];

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
                <GestureRecognizer onSwipeRight={(state) => onSwipeRight(state)} style={{ flex: 1 }}>
                    <Provider store={store}>
                        <Drawer showMenu showAvatar ref={globalDrawerRef} menuData={MENU_TEST} />
                        <PersistGate loading={null} persistor={persistor}>
                            <RootStacks />
                        </PersistGate>
                        <Loading ref={globalLoadingRef} />
                        <Toast />
                    </Provider>
                </GestureRecognizer>
            </SettingProvider>
        </BaseProvider>
    );
}

export default App;
