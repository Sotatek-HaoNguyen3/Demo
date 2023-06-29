import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import SettingProvider from 'contexts/SettingProvider';
import 'packages/localization';
import { BaseProvider, IBaseConfig } from 'packages/core';
import RootStacks from 'stacks';
import store, { persistor } from 'stores';
import { commonColors, darkColors, lightColors } from 'themes/colors';

const config: IBaseConfig = {
    dependencies: {
        'liner-gradient': require('react-native-linear-gradient').default,
    },
};
function App() {
    const colorModes = {
        commonColors,
        darkColors,
        lightColors,
    };
    return (
        <BaseProvider config={config} colorModes={colorModes}>
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
