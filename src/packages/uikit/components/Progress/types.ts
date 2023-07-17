/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement, ReactNode } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { Linecap } from 'react-native-svg';

export type IArcProps = {
    startAngle: number;
    endAngle: number;
    radius: number;
    offset?: { top: number; left: number };
    strokeCap?: Linecap;
    strokeWidth?: number;
    direction?: 'clockwise' | 'counter-clockwise';
};

export type ICircleProps = {
    radius: number;
    offset?: { top: number; left: number };
    strokeWidth?: number;
    direction?: 'clockwise' | 'counter-clockwise';
};

export type ISectorProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    angle: any;
    radius: number;
    offset?: { top: number; left: number };
};

export type IAnimationProps = {
    animated?: boolean;
    direction?: 'clockwise' | 'counter-clockwise';
    indeterminate?: boolean;
    indeterminateAnimationDuration?: number;
    progress?: number;
};

export type IProgressPieProps = {
    animated?: boolean;
    borderColor?: string;
    borderWidth?: number;
    color?: string;
    children?: ReactNode;
    progress: number;
    rotation?: Animated.Value;
    size?: number;
    style?: StyleProp<ViewStyle>;
    unfilledColor?: string;
};

export type IProgressBarProps = {
    animated?: boolean;
    borderColor?: string;
    borderRadius?: number;
    borderWidth?: number;
    children?: ReactNode;
    color?: string;
    height?: number;
    indeterminate?: boolean;
    indeterminateAnimationDuration?: number;
    onLayout?: (event) => void;
    progress?: number;
    style?: StyleProp<ViewStyle>;
    unfilledColor?: string;
    width?: number;
    useNativeDriver?: boolean;
    animationConfig?: object;
    animationType?: 'decay' | 'timing' | 'spring';
};

export type IProgressCircleProps = {
    style?: StyleProp<ViewStyle>;
    size?: number;
    fill?: number;
    width?: number;
    backgroundWidth?: number;
    tintColor?: string;
    tintTransparency?: boolean;
    backgroundColor?: string;
    rotation?: number;
    lineCap?: Linecap;
    fillLineCap?: Linecap;
    arcSweepAngle?: number;
    children?: React.FC;
    childrenContainerStyle?: object;
    padding?: number;
    renderCap?: (...args: any[]) => any;
    dashedBackground?: object;
    dashedTint?: object;
};

export type IProgressAnimatedCircleProps = {
    prefill?: number;
    duration?: number;
    easing?: (...args: any[]) => any;
    onAnimationComplete?: (...args: any[]) => any;
    useNativeDriver?: boolean;
    delay?: number;
    tintColorSecondary?: string;
};
