import React, { useCallback, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BaseModal from '../Modal';

import { getStatusBarHeight } from 'themes/dimensions';

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

export interface DrawerProps {
    name?: string;
    isVisible?: boolean;
}

const Drawer = (props: DrawerProps, ref) => {
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
            style={styles.container}
            animationOut={'slideOutLeft'}
            animationInTiming={500}
            animationOutTiming={500}
            swipeDirection={['left', 'right']}
            backdropTransitionInTiming={500}
            backdropTransitionOutTiming={500}
            backdropOpacity={0.5}
        >
            <View>
                <Text>
                    Drawer
                </Text>
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
    // contentContainer
})
