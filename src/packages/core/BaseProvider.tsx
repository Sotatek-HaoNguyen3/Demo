import merge from 'lodash.merge';
import React, { useState } from 'react';

import { IColorModeProviderProps } from './color-mode';
import { HybridProvider } from './hybrid-overlay';

import { BaseConfigProvider, defaultConfig, IBaseConfig } from 'packages/core/BaseContext';
import { theme as defaultTheme, IColorModes, ITheme } from 'packages/uikit/theme';
import { baseCommonColors, baseDarkColors, baseLightColors } from 'packages/uikit/theme/colors';

export interface IBaseProvider {
    theme?: ITheme;
    colorModeManager?: IColorModeProviderProps['colorModeManager'];
    children?: React.ReactNode;
    config?: IBaseConfig;
    colorModes?: IColorModes;
}
const BaseProvider = (props: IBaseProvider) => {
    const {
        children,
        colorModeManager,
        config = defaultConfig,
        theme: propsTheme = defaultTheme,
        colorModes = {
            commonColors: {},
            darkColors: {},
            lightColors: {},
        },
    } = props;
    const theme = config?.theme ?? propsTheme;
    const baseColor: IColorModes = {
        darkColors: baseDarkColors,
        lightColors: baseLightColors,
        commonColors: baseCommonColors,
    } as const;
    // TODO: suggest types
    const newTheme = React.useMemo(() => {
        const colors = Object.assign(theme.colors, baseColor, colorModes);

        return {
            ...theme,
            colors,
        } as const;
    }, [theme, colorModes]);

    return (
        <BaseConfigProvider config={config} theme={newTheme}>
            <HybridProvider colorModeManager={colorModeManager} options={theme.config}>
                {children}
            </HybridProvider>
        </BaseConfigProvider>
    );
};

export { BaseProvider };
