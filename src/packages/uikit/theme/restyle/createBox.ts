import React from 'react';
import { View } from 'react-native';

import createRestyleComponent from './createRestyleComponent';
import {
    backgroundColor,
    BackgroundColorProps,
    backgroundColorShorthand,
    BackgroundColorShorthandProps,
    border,
    BorderProps,
    layout,
    LayoutProps,
    opacity,
    OpacityProps,
    position,
    PositionProps,
    shadow,
    ShadowProps,
    spacing,
    SpacingProps,
    spacingShorthand,
    SpacingShorthandProps,
    visible,
    VisibleProps,
} from './restyleFunctions';
import { BaseTheme, RestyleFunctionContainer } from './types';

type BaseBoxProps<Theme extends BaseTheme> = BackgroundColorProps<Theme> &
    OpacityProps<Theme> &
    VisibleProps<Theme> &
    LayoutProps<Theme> &
    SpacingProps<Theme> &
    BorderProps<Theme> &
    ShadowProps<Theme> &
    PositionProps<Theme>;

// check EnableShorthand
export type BoxProps<Theme extends BaseTheme, EnableShorthand extends boolean = true> = BaseBoxProps<Theme> &
    EnableShorthand extends true
    ? BaseBoxProps<Theme> & SpacingShorthandProps<Theme> & BackgroundColorShorthandProps<Theme>
    : BaseBoxProps<Theme>;

export const boxRestyleFunctions = [
    backgroundColor,
    backgroundColorShorthand,
    opacity,
    visible,
    layout,
    spacing,
    spacingShorthand,
    border,
    shadow,
    position,
];

const createBox = <
    Theme extends BaseTheme,
    Props = React.ComponentProps<typeof View> & { children?: React.ReactNode },
    EnableShorthand extends boolean = true
>(
    BaseComponent: React.ComponentType<any> = View
) => {
    return createRestyleComponent<
        BoxProps<Theme, EnableShorthand> & Omit<Props, keyof BoxProps<Theme, EnableShorthand>>,
        Theme
    >(boxRestyleFunctions as RestyleFunctionContainer<BoxProps<Theme, EnableShorthand>, Theme>[], BaseComponent);
};

export default createBox;
