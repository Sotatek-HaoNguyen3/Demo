import { ITheme } from 'packages/uikit/theme';
import { createContext } from 'packages/utils/createContext';

export interface IBaseConfig {
    theme?: ITheme;
    suppressColorAccessibilityWarning?: boolean;
    dependencies?: {
        'liner-gradient': unknown;
    };
    enableRem?: boolean; // TODO: last apply
    // strictMode?: boolean; // TODO: last apply
    // disableContrastText?: boolean; // TODO: last apply
}

export const defaultConfig: IBaseConfig = {
    // strictMode: 'off'
}

export const [BaseConfigProvider, useBaseConfig] = createContext<{
    config: IBaseConfig;
    // currentBreakpoint: number;// TODO: last apply
    // isSSR?: boolean;// TODO: last apply
    theme?: ITheme;
    // disableContrastText?: boolean;// TODO: last apply
}>('BaseConfigProvider');
