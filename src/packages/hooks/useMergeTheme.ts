import { useMemo } from 'react';

import { IBaseProvider } from 'packages/core';
import { defaultConfig } from 'packages/core/BaseContext';
import { theme as defaultTheme } from 'packages/uikit/theme';
import { baseCommonColors, baseDarkColors, baseLightColors } from 'packages/uikit/theme/colors';
function useMergeTheme(props: IBaseProvider) {
    const {
        config = defaultConfig,
        theme: propsTheme = defaultTheme,
        colorModes = {
            commonColors: {},
            darkColors: {},
            lightColors: {},
        },
    } = props;
    const theme = config?.theme ?? propsTheme;
    const baseColor = {
        darkColors: baseDarkColors,
        lightColors: baseLightColors,
        commonColors: baseCommonColors,
    };
    const newTheme = useMemo(() => {
        const colors = Object.assign(theme.colors, baseColor, colorModes);
        return {
            ...theme,
            colors,
        };
    }, [theme, colorModes]);
    return newTheme;
}

export default useMergeTheme;
