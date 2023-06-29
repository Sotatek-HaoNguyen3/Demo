import { ColorModeOptions } from 'packages/core';
import base from 'packages/uikit/theme/base';

const config: ColorModeOptions = {
    useSystemColorMode: false,
    initialColorMode: 'light',
};

export const theme = {
    ...base,
    config,
};

export type Theme = typeof theme;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICustomTheme{}

export interface ITheme extends ICustomTheme, Omit<Theme, keyof ICustomTheme> {}

export * from './types';
