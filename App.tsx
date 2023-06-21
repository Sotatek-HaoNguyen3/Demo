import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import SettingProvider from 'contexts/SettingProvider';
import 'packages/localization';
import RootStacks from 'stacks';
import store, { persistor } from 'stores';

function App() {
    return (
        <SettingProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <RootStacks />
                </PersistGate>
            </Provider>
        </SettingProvider>
    );
}

export default App;
