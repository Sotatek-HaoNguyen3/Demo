import { darkColors, lightColors } from './colors';

import { ColorModeOptions } from 'packages/core';


const config: ColorModeOptions = {
    useSystemColorMode: false,
    initialColorMode: 'light',
    // accessibleColors: false,
}

export const theme = {
    colors: {
        light: lightColors,
        dark: darkColors,
    },
    config,
};
export type Theme = typeof theme;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICustomTheme {}

export interface ITheme extends ICustomTheme, Omit<Theme, keyof ICustomTheme> {}
