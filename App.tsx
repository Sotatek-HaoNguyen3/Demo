import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import SettingProvider from 'contexts/SettingProvider';
import 'packages/localization';
import { BaseProvider, IBaseConfig } from 'packages/core';
import { Loading } from 'packages/uikit/components';
import Drawer, { globalDrawerRef } from 'packages/uikit/components/Drawer';
import GestureRecognizer from 'packages/uikit/components/Drawer/GestureRecognizer';
import { globalLoadingRef } from 'packages/uikit/components/Loading';
import { onSwipeRight } from 'packages/utils/gestureHandle';
import RootStacks from 'stacks';
import store, { persistor } from 'stores';

const config: IBaseConfig = {
    dependencies: {
        'liner-gradient': require('react-native-linear-gradient').default,
    },
};
const MENU_TEST = [{ name: 'Home' }, { name: 'Profile' }, { name: 'Notification' }, { name: 'Setting' }];
function App() {
    return (
        <BaseProvider config={config}>
            <SettingProvider>
                <GestureRecognizer onSwipeRight={(state) => onSwipeRight(state)} style={{ flex: 1 }}>
                    <Provider store={store}>
                        <Drawer showMenu showAvatar ref={globalDrawerRef} menuData={MENU_TEST} />
                        <PersistGate loading={null} persistor={persistor}>
                            <RootStacks />
                        </PersistGate>
                        <Loading ref={globalLoadingRef} />
                    </Provider>
                </GestureRecognizer>
            </SettingProvider>
        </BaseProvider>
    );
}

export default App;
