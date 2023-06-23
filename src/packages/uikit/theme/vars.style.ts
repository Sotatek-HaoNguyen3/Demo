import { darkColors, lightColors } from './colors';

import { ColorModeOptions } from 'packages/core';

const config: ColorModeOptions = {
    useSystemColorMode: false,
    initialColorMode: 'light',
    // accessibleColors: false,
};

export const tokens = {
    colors: {
        light: lightColors,
        dark: darkColors,
    },
};

export type Tokens = typeof tokens;
