import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

// import Svgs from 'assets/svgs';
// import { Text, TouchableOpacity } from 'components/base';
import { useSetting } from 'contexts/SettingProvider';
import Fonts  from 'themes/fonts';

import { scale } from 'themes/scales';

interface ButtonIconProps {
    text?: string
    onPress: () => void
    icon: React.ReactElement,
    containerStyle?: StyleProp<ViewStyle>,
    labelStyle?: StyleProp<TextStyle>,
}

const ButtonIcon: React.FC<ButtonIconProps> = (props) => {
    // const { theme } = useSetting();
    const styles = myStyles();
    const { text, icon, onPress, containerStyle, labelStyle } = props

    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
            {icon}
            <Text style={[styles.text, labelStyle]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default React.memo(ButtonIcon);

const myStyles = () => StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: scale(30),
        height: scale(30),
    },
    text: {
        ...Fonts.segoe400,
        fontSize: scale(10),
        marginTop: scale(2),
        // color: Colors[theme].textColorOpacity80,
        textAlign: 'center',
    },
});
