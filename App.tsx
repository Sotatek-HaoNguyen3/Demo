import 'packages/localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { SafeAreaView, Switch } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { darkTheme, theme, Theme } from './theme';

import SettingProvider from 'contexts/SettingProvider';
import { BaseProvider, ColorMode, IBaseConfig, StorageManager } from 'packages/core';
import { extendTheme } from 'packages/core/extendTheme';
import { theme as defaultTheme } from 'packages/uikit';
import { Toast } from 'packages/uikit/components';
import {
    createBox,
    createRestyleComponent,
    createText,
    createVariant,
    ThemeProvider,
    VariantProps,
} from 'packages/uikit/theme/restyle';
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
            await AsyncStorage.setItem('@color-mode', value ? value : 'light');
        } catch (e) {
            console.log(e);
        }
    },
};

const Box = createBox<Theme>();
const Text = createText<Theme>();

const Card = createRestyleComponent<VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>, Theme>(
    [createVariant({ themeKey: 'cardVariants' })],
    Box
);

function App() {
    const [darkMode, setDarkMode] = React.useState(false);

    const selectedTheme = darkMode ? darkTheme : theme;

    return (
        <ThemeProvider theme={selectedTheme}>
            <Box backgroundColor="background" flex={1}>
                <SafeAreaView style={{ flex: 1 }}>
                    <Box flex={1} paddingHorizontal="m" gap="s">
                        <Text variant="header">Welcome</Text>
                        <Card variant="primary">
                            <Text variant="body">This is a simple example displaying how to use Restyle</Text>
                        </Card>
                        <Card variant="secondary">
                            <Text variant="body">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it to make a type specimen book. It has
                                survived not only five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Text>
                        </Card>
                        <Card variant="primary" flexDirection="row" justifyContent="space-between" alignItems="center">
                            <Text variant="body">Toggle dark mode</Text>
                            <Switch value={darkMode} onValueChange={(value: boolean) => setDarkMode(value)} />
                        </Card>
                    </Box>
                </SafeAreaView>
            </Box>
        </ThemeProvider>
    );
    // return (
    //     <BaseProvider config={config} colorModeManager={colorModeManager} theme={myTheme}>
    //         <SettingProvider>
    //             <Provider store={store}>
    //                 <PersistGate loading={null} persistor={persistor}>
    //                     <RootStacks />
    //                 </PersistGate>
    //                 <Toast />
    //             </Provider>
    //         </SettingProvider>
    //     </BaseProvider>
    // );
}

export default App;
