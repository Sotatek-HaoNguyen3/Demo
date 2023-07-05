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

type MyThemeType = typeof myTheme;
type MyColorsType = typeof myThemeColors;

// NOTE: The module name in package.json
declare module 'demo-react-native' {
    interface ICustomTheme extends MyThemeType {}
    interface ICustomColors extends MyColorsType {}
}
