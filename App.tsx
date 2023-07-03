import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import SettingProvider from 'contexts/SettingProvider';
import 'packages/localization';
import AppBar from 'packages/components/AppBar';
import Drawer, { globalDrawerRef } from 'packages/components/Drawer';
import GestureRecognizer from 'packages/components/Drawer/GestureRecognizer';
import { BaseProvider, IBaseConfig } from 'packages/core';
import { onSwipeRight } from 'packages/utils/gestureHandle';
import RootStacks from 'stacks';
import store, { persistor } from 'stores';

const config: IBaseConfig = {
    dependencies: {
        'liner-gradient': require('react-native-linear-gradient').default,
    },
};
function App() {
    return (
        <BaseProvider config={config}>
            <SettingProvider>
                <GestureRecognizer onSwipeRight={(state) => onSwipeRight(state)} style={{ flex: 1 }} >
                <Provider store={store}>
                    <Drawer showAvatar ref={globalDrawerRef} />
                    <PersistGate loading={null} persistor={persistor}>
                        <RootStacks />
                    </PersistGate>
                </Provider>
                </GestureRecognizer>
            </SettingProvider>
        </BaseProvider>
    );
}

export default App;
