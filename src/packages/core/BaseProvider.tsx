import React from 'react';
import { Platform } from 'react-native';
import {
    initialWindowMetrics as defaultInitialWindowMetrics,
    Metrics,
    SafeAreaProvider,
} from 'react-native-safe-area-context';

import { IColorModeProviderProps } from './color-mode';

import { BaseConfigProvider, defaultConfig, IBaseConfig } from 'packages/core/BaseContext';
import { theme as defaultTheme, ITheme } from 'packages/uikit/theme';

// For SSR to work, we need to pass initial insets as 0 values on web.

// https://github.com/th3rdwave/react-native-safe-area-context/issues/132
const defaultInitialWindowMetricsBasedOnPlatform: Metrics | null = Platform.select({
    web: {
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
    },
    default: defaultInitialWindowMetrics,
});

export interface IBaseProvider {
    theme?: ITheme;
    colorModeManager?: IColorModeProviderProps['colorModeManager'];
    children?: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialWindowMetrics?: any;
    config?: IBaseConfig;
    // isSSR?: boolean; // TODO: last apply
    // disableContrastText?: boolean; // TODO: last apply
}

const BaseProvider = (props: IBaseProvider) => {
    const {
        children,
        colorModeManager,
        config = defaultConfig,
        theme: propsTheme = defaultTheme,
        initialWindowMetrics,
    } = props;
    const theme = config?.theme ?? propsTheme;

    const newTheme = React.useMemo(() => {
        // if (config.enableRem) {
        //     return platformSpecificSpaceUnits(theme);
        // }
        return theme;
    }, [theme, config.enableRem]);

    // TODO: last apply
    // const windowWidth = useWindowDimensions()?.width;

    // const currentBreakpoint = React.useMemo(
    //     () => getClosestBreakpoint(newTheme.breakpoints, windowWidth),
    //     [windowWidth, newTheme.breakpoints]
    // );

    // 1. theme
    // 2. language
    // 3. custom

    return (
        <BaseConfigProvider config={config} theme={newTheme}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics ?? defaultInitialWindowMetricsBasedOnPlatform}>
                {children}
            </SafeAreaProvider>
        </BaseConfigProvider>
    );
};

export { BaseProvider };
