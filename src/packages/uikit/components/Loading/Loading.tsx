import React, { useImperativeHandle, useRef, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { MaterialIndicator } from '../Indicators';
import { IndicatorProps } from '../Indicators/indicator/BaseIndicator';
import BaseModal from '../Modal';
import { BaseModalProps } from '../Modal/modal';
import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors } from 'packages/uikit/theme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalLoadingRef = React.createRef<any>();

export const globalLoading = {
    show: () => {
        globalLoadingRef?.current?.show();
    },
    hide: () => {
        globalLoadingRef?.current?.hide();
    },
};

export interface ILoadingProps {
    color: string;
    size: number;
    backgroundStyle: StyleProp<ViewStyle>;
    animationIn: string;
    animationOut: string;
    modalProps: BaseModalProps;
    indicatorProps: IndicatorProps;
    animationDuration: number;
}

const Loading = React.forwardRef((props: ILoadingProps & BaseModalProps, ref) => {
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const {
        color = colors.white,
        size = 50,
        animationDuration = 4000,
        backgroundStyle,
        animationIn = 'fadeIn',
        animationOut = 'fadeOut',
        modalProps,
        indicatorProps,
    } = props;
    const loadingRef = useRef(null);
    const [visible, setVisible] = useState<boolean>(false);

    useImperativeHandle(ref, () => {
        return { show, hide };
    });

    const show = () => {
        setVisible(true);
    };

    const hide = () => {
        loadingRef?.current?.close();
        setVisible(false);
    };

    return (
        <BaseModal
            {...modalProps}
            ref={loadingRef}
            animationOut={animationOut}
            animationIn={animationIn}
            isVisible={visible}>
            <View style={[styles.loadingBg, backgroundStyle]}>
                <MaterialIndicator
                    {...indicatorProps}
                    color={color}
                    size={size}
                    animationDuration={animationDuration}
                />
            </View>
        </BaseModal>
    );
});

export default Loading;

const myStyles = (themeColors: IColors) =>
    StyleSheet.create({
        loadingBg: {
            flex: 1,
            backgroundColor: themeColors.transparent,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
