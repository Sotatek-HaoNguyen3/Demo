import React from 'react';

import { IColorModeProviderProps } from './color-mode';
import { HybridProvider } from './hybrid-overlay';

import { BaseConfigProvider, defaultConfig, IBaseConfig } from 'packages/core/BaseContext';
import useMergeTheme from 'packages/hooks/useMergeTheme';
import { theme as defaultTheme, IColorModes, ITheme } from 'packages/uikit/theme';
export interface IBaseProvider {
    theme?: ITheme;
    colorModeManager?: IColorModeProviderProps['colorModeManager'];
    children?: React.ReactNode;
    config?: IBaseConfig;
    colorModes?: IColorModes;
}

const BaseProvider = (props: IBaseProvider) => {
    const { children, colorModeManager, config = defaultConfig, theme: propsTheme = defaultTheme } = props;
    const theme = config?.theme ?? propsTheme;
    const newTheme = useMergeTheme(props);
    // SOLID

    return (
        <BaseConfigProvider config={config} theme={newTheme}>
            <HybridProvider colorModeManager={colorModeManager} options={theme.config}>
                {children}
            </HybridProvider>
        </BaseConfigProvider>
    );
};

export { BaseProvider };
