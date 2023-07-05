import React from 'react';
import { Keyboard, Platform } from 'react-native';
export function useKeyboard() {
    const [keyboardHeight, setKeyboardHeight] = React.useState(0);
    const [isKeyboardVisible, setIsKeyboardVisible] = React.useState(false);
    const onShow = React.useCallback((event) => {
        const { height } = event.endCoordinates;
        setKeyboardHeight(height);
        setIsKeyboardVisible(true);
    }, []);
    const onHide = React.useCallback(() => {
        setKeyboardHeight(0);
        setIsKeyboardVisible(false);
    }, []);
    React.useEffect(() => {
        if (!(Platform.OS === 'ios')) {
            return () => {};
        }
        const didShowListener = Keyboard.addListener('keyboardDidShow', onShow);
        const didHideListener = Keyboard.addListener('keyboardDidHide', onHide);
        return () => {
            didShowListener.remove();
            didHideListener.remove();
        };
    }, [onHide, onShow]);
    return {
        keyboardHeight,
        isKeyboardVisible,
    };
}
