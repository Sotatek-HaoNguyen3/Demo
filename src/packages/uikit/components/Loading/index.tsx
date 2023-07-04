import React, { useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { MaterialIndicator } from '../Indicators';
import BaseModal from '../Modal';

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

export interface Props {
    name?: string;
}

const Loading = React.forwardRef((props, ref) => {
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
        <BaseModal ref={loadingRef} animationOut={'fadeOut'} animationIn={'fadeIn'} isVisible={visible}>
            <View style={styles.loadingBg}>
                <MaterialIndicator color={'white'} size={50} animationDuration={4000} />
            </View>
        </BaseModal>
    );
});

export default Loading;

const styles = StyleSheet.create({
    loadingBg: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
