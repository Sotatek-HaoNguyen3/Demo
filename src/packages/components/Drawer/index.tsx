import React, { useImperativeHandle, useRef, useState } from 'react';
import { ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Animation } from 'react-native-animatable';

import Avatar, { AvatarProps } from '../Avatar';
import Menu from '../Menu';
import BaseModal from '../Modal';

import { BaseModalProps } from '../Modal/modal';

import { getStatusBarHeight } from 'themes/dimensions';
import { scale } from 'themes/scales';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalDrawerRef = React.createRef<any>()
export const globalDrawer = {
    open: () => {
        globalDrawerRef?.current?.open()
    },
    close: () => {
        globalDrawerRef?.current?.close()
    },
}

export interface DrawerRefType {
    open: () => void;
    dismiss: () => void;
}

const dataTest = [
    {name: 'Home'},
    {name: 'Setting'},
    {name: 'Notification'},
    {name: 'Profile'},
]

export interface DrawerProps {
    animationIn?: Animation;
    animationOut?: Animation;
    animationTiming?: number;
    backdropTransitionTiming?: number;
    backdropOpacity?: number;
    containerStyle?: StyleProp<ViewStyle>
    sourceAvatar?: ImageSourcePropType;
    avatarContainerStyle?: StyleProp<ViewStyle>;
    avatarProps?: AvatarProps;
    modalProps?: BaseModalProps;
}

const Drawer = (props: DrawerProps, ref) => {
    const {
        animationIn = 'slideInLeft',
        animationOut = 'slideOutLeft',
        animationTiming = 500,
        backdropTransitionTiming = 500,
        backdropOpacity = 0.5,
        containerStyle,
        sourceAvatar,
        avatarContainerStyle,
        avatarProps,
        modalProps,
        ...rest
    } = props
    const drawerRef = useRef(null);
    const [visible, setVisible] = useState<boolean>(false)

    const closeDrawer = () => {
        drawerRef?.current?.close()
        setVisible(false)
    }

    const openDrawer = () => {
        setVisible(true)
    }

    useImperativeHandle(
        ref,
        (): DrawerRefType => ({
            dismiss: closeDrawer,
            open: openDrawer,
        }),
    );
    return (
        <BaseModal
            ref={drawerRef}
            onBackdropPress={closeDrawer}
            animationIn={'slideInLeft'}
            isVisible={visible}
            style={containerStyle || styles.container}
            animationOut={'slideOutLeft'}
            animationInTiming={500}
            animationOutTiming={500}
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
            backdropOpacity={0.5}
            {...modalProps}
        >
            <View style={styles.contentContainer}>
                <View style={[styles.avatarContainer, avatarContainerStyle]}>
                    <Avatar source={sourceAvatar} {...avatarProps} />
                </View>
                <Menu data={dataTest}/>
            </View>
        </BaseModal>
    )
}

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
})
