import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';

import RootStacks from 'stacks';
import { store } from 'stores';

function App() {
    return (
        <Provider store={store}>
            <View style={{ flex: 1 }}>
                <RootStacks />
            </View>
        </Provider>
    );
}

export default App;
