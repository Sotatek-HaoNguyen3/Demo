import { theme as baseTheme } from 'packages/uikit/theme';
import { commonColors, darkColors, lightColors } from 'themes/colors';

export const myColors = {
    ...commonColors,
    darkColors,
    lightColors,
};

const myThemeColors = {
    ...baseTheme.colors,
    ...commonColors,
    ...darkColors,
};

export type MyThemeType = typeof myColors;
export type MyColorsType = typeof myThemeColors;
