import { commonColors } from './commonColors';
import { darkColors } from './darkColors';
import { lightColors } from './lightColors';

import { theme as baseTheme } from 'packages/uikit/theme';

export const customColors = {
    commonColors,
    darkColors,
    lightColors,
};

const myColors = {
    ...baseTheme.colors,
    ...customColors,
};

const myTheme = {
    ...baseTheme,
    colors: myColors,
};

const myThemeColors = {
    ...baseTheme.colors,
    ...commonColors,
    ...darkColors,
};

export type MyThemeType = typeof myTheme;
export type MyColorsType = typeof myThemeColors;
