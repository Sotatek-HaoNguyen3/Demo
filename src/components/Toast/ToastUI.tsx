import React from 'react';

import { AnimatedContainer } from './components/AnimatedContainer';
import { BaseToast } from './components/BaseToast';
import { ToastUIProps } from './types';
const defaultToastConfig = {
    base: (props) => <BaseToast {...props}/>,
};
function renderComponent(propsComponent: ToastUIProps) {
    const { data, options, config, isVisible, show, hide } = propsComponent
    const { text1, text2 } = data;
    const { type, onPress, position, props } = options;
    const toastConfig = {
        ...defaultToastConfig,
        ...config,
    };
    const ToastComponent = toastConfig[type];
    if (!ToastComponent) {
        throw new Error(`Toast type: '${type}' does not exist. You can add it via the 'config' prop on the Toast instance. Learn more: https://github.com/calintamas/react-native-toast-message/blob/master/README.md`);
    }
    return ToastComponent({
        position,
        type,
        isVisible,
        text1,
        text2,
        show,
        hide,
        onPress,
        props,
    });
}
export function ToastUI(props: ToastUIProps) {
    const { isVisible, options, hide } = props;
    const { position, topOffset, bottomOffset, keyboardOffset } = options;
    return (<AnimatedContainer isVisible={isVisible} position={position} topOffset={topOffset} bottomOffset={bottomOffset} onHide={hide} keyboardOffset={keyboardOffset}>
      {renderComponent(props)}
    </AnimatedContainer>);
}
