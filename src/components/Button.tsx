import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

// import Svgs from 'assets/svgs';
// import { Text, TouchableOpacity } from 'components/base';
import { useSetting } from 'contexts/SettingProvider';
import Fonts  from 'themes/fonts';

import { scale } from 'themes/scales';

interface ButtonProps {
    title?: string;
    subTitle?: string;
    left?: React.ReactElement;
    right?: React.ReactElement;
    subTitleCustom?: React.ReactElement;
    disabled?: boolean;
    containerStyles?: StyleProp<ViewStyle>;
    titleStyles?: StyleProp<TextStyle>;
    subTitleStyles?: StyleProp<TextStyle>;
    subTitleCustomStyles?: StyleProp<TextStyle>;
    onPress?: () => void;
}

const Button = (props: ButtonProps) => {
    // const { theme } = useSetting();
    const styles = myStyles();
    const { title, subTitle, subTitleCustom, left, right, disabled, containerStyles, titleStyles, subTitleStyles, subTitleCustomStyles, onPress } = props;

    return (
        <>
            <TouchableOpacity
                style={[styles.container, containerStyles]}
                disabled={!onPress || disabled}
                onPress={onPress}
            >
                {left ? (
                    <View style={styles.viewLeft}>{left}</View>
                ) : null}
                <View style={styles.viewCenter}>
                    <Text style={[styles.textCenter, titleStyles]}>{title}</Text>
                    {subTitle ? <Text style={[styles.subTextCenter, subTitleStyles]}>{subTitle}</Text> : null}
                    {subTitleCustom ? (
                    <View style={[styles.viewLeft, subTitleCustomStyles]}>{subTitleCustom}</View>
                ) : null}
                </View>
                {right ? (
                    <View style={styles.viewRight}>{right}</View>
                ) : (
                    <View/>
                    // <Svgs.IcForward width={scales(14)} height={scales(23)} color={Colors.gray} />
                )}
            </TouchableOpacity>
        </>
    );
};

export default Button;

const myStyles = () => StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: scale(15),
        alignItems: 'center',
        backgroundColor: 'bisque',
        width: scale(100),
        height: scale(42),
        borderRadius: scale(16),
    },
    viewLeft: {
        marginRight: scale(16),
    },
    viewCenter: {
        flex: 1,
        justifyContent: 'center',
    },
    textCenter: {
        ...Fonts.segoe400,
        fontSize: scale(15),
        textAlign: 'center',
        // color: Colors[theme].textColor,
    },
    subTextCenter: {
        ...Fonts.segoe400,
        fontSize: scale(12),
        // color: Colors[theme].textColor,
    },
    viewRight: {
        marginLeft: scale(16),
    },
});
