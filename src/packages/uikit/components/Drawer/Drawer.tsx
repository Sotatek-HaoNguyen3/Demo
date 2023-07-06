import React, { ReactElement, useImperativeHandle, useRef, useState } from 'react';
import { ImageSourcePropType, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import { Animation } from 'react-native-animatable';

import Avatar from '../Avatar';
import { AvatarProps } from '../Avatar/Avatar';
import Menu from '../Menu';
import { MenuItemProps } from '../Menu/MenuItem';
import BaseModal from '../Modal';

import { BaseModalProps } from '../Modal/modal';

import { getStatusBarHeight } from 'themes/dimensions';
import { scale } from 'themes/scales';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalDrawerRef = React.createRef<any>();
export const globalDrawer = {
    open: () => {
        globalDrawerRef?.current?.open();
    },
    close: () => {
        globalDrawerRef?.current?.close();
    },
};

export interface DrawerRefType {
    open: () => void;
    dismiss: () => void;
}

export interface DrawerProps {
    animationIn?: Animation;
    animationOut?: Animation;
    animationTiming?: number;
    backdropTransitionTiming?: number;
    backdropOpacity?: number;
    containerStyle?: StyleProp<ViewStyle>;
    showAvatar?: boolean;
    showMenu?: boolean;
    menuData?: MenuItemProps[];
    sourceAvatar?: ImageSourcePropType;
    contentContainerStyle?: StyleProp<ViewStyle>;
    avatarContainerStyle?: StyleProp<ViewStyle>;
    menuContainerStyle?: StyleProp<ViewStyle>;
    avatarProps?: AvatarProps;
    modalProps?: BaseModalProps;
    customComponent?: ReactElement<ViewProps>;
}

const Drawer = (props: DrawerProps, ref) => {
    const {
        animationIn = 'slideInLeft',
        animationOut = 'slideOutLeft',
        animationTiming = 500,
        backdropTransitionTiming = 500,
        backdropOpacity = 0.5,
        containerStyle,
        showAvatar,
        showMenu = false,
        menuData = [],
        sourceAvatar,
        contentContainerStyle,
        avatarContainerStyle,
        menuContainerStyle,
        avatarProps,
        modalProps,
        customComponent,
    } = props;
    const drawerRef = useRef(null);
    const [visible, setVisible] = useState<boolean>(false);

    const closeDrawer = () => {
        drawerRef?.current?.close();
        setVisible(false);
    };

    const openDrawer = () => {
        setVisible(true);
    };

    useImperativeHandle(
        ref,
        (): DrawerRefType => ({
            dismiss: closeDrawer,
            open: openDrawer,
        })
    );
    return (
        <BaseModal
            ref={drawerRef}
            onBackdropPress={closeDrawer}
            animationIn={animationIn}
            isVisible={visible}
            style={containerStyle || styles.container}
            animationOut={animationOut}
            animationInTiming={animationTiming}
            animationOutTiming={animationTiming}
            backdropTransitionInTiming={backdropTransitionTiming}
            backdropTransitionOutTiming={backdropTransitionTiming}
            backdropOpacity={backdropOpacity}
            {...modalProps}>
            <View style={[styles.contentContainer, contentContainerStyle]}>
                {showAvatar && (
                    <View style={[styles.avatarContainer, avatarContainerStyle]}>
                        <Avatar source={sourceAvatar} {...avatarProps} />
                    </View>
                )}
                {showMenu && (
                    <View style={[styles.menuContainer, menuContainerStyle]}>
                        <Menu data={menuData} />
                    </View>
                )}
                {customComponent}
            </View>
        </BaseModal>
    );
};

export default React.forwardRef(Drawer);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        width: '60%',
        margin: 0,
        paddingTop: getStatusBarHeight(true),
        justifyContent: 'flex-start',
    },
    contentContainer: {
        flex: 1,
    },
    avatarContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: scale(30),
    },
    menuContainer: {
        width: '100%',
    },
});
