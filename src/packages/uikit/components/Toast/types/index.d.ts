/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleProp, TextProps, TextStyle, TouchableOpacityProps, ViewProps, ViewStyle } from 'react-native';
export declare type ReactChildren = React.ReactNode;
export declare type ToastType = 'base' | 'success' | 'error' | 'info';
export declare type ToastPosition = 'top' | 'bottom';
export declare type ToastOptions = {
    /**
     * Toast type.
     * Default value: `success`
     */
    type?: ToastType;
    /**
     * Toast position.
     * Default value: `top`
     */
    position?: ToastPosition;
    /**
     * When `true`, the visible Toast automatically hides after a certain number of milliseconds,
     * specified by the `visibilityTime` prop.
     * Default value: `true`
     */
    autoHide?: boolean;
    /**
     * Number of milliseconds after which Toast automatically hides.
     * Has effect only in conjunction with `autoHide` prop set to `true`.
     * Default value: `4000`
     */
    visibilityTime?: number;
    /**
     * Offset from the top of the screen (in px).
     * Has effect only when `position` is `top`
     * Default value: `40`
     */
    topOffset?: number;
    /**
     * Offset from the bottom of the screen (in px)
     * Has effect only when `position` is `bottom`
     * Default value: `40`
     */
    bottomOffset?: number;
    /**
     * Offset from the Keyboard (in px)
     * Has effect only when `position` is `bottom` and Keyboard is visible
     * Default value: `10`
     */
    keyboardOffset?: number;
    /**
     * Called when Toast is shown
     */
    onShow?: () => void;
    /**
     * Called when Toast hides
     */
    onHide?: () => void;
    /**
     * Called on Toast press
     */
    onPress?: () => void;
    /**
     * Any custom props passed to the specified Toast type.
     * Has effect only when there is a custom Toast type (configured via the `config` prop
     * on the Toast instance) that uses the `props` parameter
     */
    props?: BaseToastProps;
};
export declare type ToastData = {
    text1?: string;
    text2?: string;
};
export declare type ToastShowParams = ToastData & ToastOptions;
export declare type ToastHideParams = void;
export declare type BaseToastProps = {
    text1?: string;
    text2?: string;
    onPress?: () => void;
    activeOpacity?: number;
    style?: StyleProp<ViewStyle>;
    touchableContainerProps?: TouchableOpacityProps;
    contentContainerStyle?: StyleProp<ViewStyle>;
    contentContainerProps?: ViewProps;
    text1Style?: StyleProp<TextStyle>;
    text1NumberOfLines?: number;
    text1Props?: TextProps;
    text2Style?: StyleProp<TextStyle>;
    text2NumberOfLines?: number;
    text2Props?: TextProps;
    renderLeadingIcon?: () => React.ReactNode;
    renderTrailingIcon?: () => React.ReactNode;
};
export declare type ToastConfigParams<Props> = {
    position: ToastPosition;
    type: ToastType;
    isVisible: boolean;
    text1?: string;
    text2?: string;
    show: (params: ToastShowParams) => void;
    hide: (params: ToastHideParams) => void;
    onPress: () => void;
    props: Props;
};
export declare type ToastConfig = {
    [key: string]: (params: ToastConfigParams<any>) => React.ReactNode;
};
export declare type ToastRef = {
    show: (params: ToastShowParams) => void;
    hide: (params: ToastHideParams) => void;
};
/**
 * `props` that can be set on the Toast instance.
 * They act as defaults for all Toasts that are shown.
 */
export declare type ToastProps = {
    /**
     * Layout configuration for custom Toast types
     */
    config?: ToastConfig;
    /**
     * Toast type.
     * Default value: `success`
     */
    type?: ToastType;
    /**
     * Toast position.
     * Default value: `top`
     */
    position?: ToastPosition;
    /**
     * Number of milliseconds after which Toast automatically hides.
     * Has effect only in conjunction with `autoHide` prop set to `true`.
     * Default value: `4000`
     */
    visibilityTime?: number;
    /**
     * When `true`, the visible Toast automatically hides after a certain number of milliseconds,
     * specified by the `visibilityTime` prop.
     * Default value: `true`
     */
    autoHide?: boolean;
    /**
     * Offset from the top of the screen (in px).
     * Has effect only when `position` is `top`
     * Default value: `40`
     */
    topOffset?: number;
    /**
     * Offset from the bottom of the screen (in px)
     * Has effect only when `position` is `bottom`
     * Default value: `40`
     */
    bottomOffset?: number;
    /**
     * Offset from the Keyboard (in px)
     * Has effect only when `position` is `bottom` and Keyboard is visible (iOS only)
     * Default value: `10`
     */
    keyboardOffset?: number;
    /**
     * Called when any Toast is shown
     */
    onShow?: () => void;
    /**
     * Called when any Toast hides
     */
    onHide?: () => void;
    /**
     * Called on any Toast press
     */
    onPress?: () => void;
};

export declare function Toast(props: ToastProps): JSX.Element;

export declare type ToastUIProps = {
    isVisible: boolean;
    options: Required<ToastOptions>;
    data: ToastData;
    show: (params: ToastShowParams) => void;
    hide: (params: ToastHideParams) => void;
    config?: ToastConfig;
};
export declare function ToastUI(props: ToastUIProps): JSX.Element;

export declare const DEFAULT_DATA: ToastData;
export declare const DEFAULT_OPTIONS: Required<ToastOptions>;
export declare type UseToastParams = {
    defaultOptions: Omit<ToastProps, 'config'>;
};
export declare function useToast({ defaultOptions }: UseToastParams): {
    isVisible: boolean;
    data: ToastData;
    options: Required<ToastOptions>;
    show: (params: ToastShowParams) => void;
    hide: () => void;
};
