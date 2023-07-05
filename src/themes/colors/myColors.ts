import { theme as baseTheme } from 'packages/uikit/theme';
import { commonColors, darkColors, lightColors } from 'themes/colors';

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
