import React, { memo, ReactElement } from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';


import { getStatusBarHeight, HitSlop } from 'themes/dimensions';
import { scale } from 'themes/scales';


interface HeaderProps {
    title?: string | ReactElement<TextProps>;
    disable?: boolean;
    left?: ReactElement<ViewProps>;
    right?: ReactElement<ViewProps>;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    showLeft?: boolean;
    hideLeft?: boolean;
    iconLeft?: ReactElement;
}

const AppBar = ({
    title,
    left,
    right,
    onPress,
    style = {},
    titleStyle = {},
    disable = false,
    containerStyle = {},
    hideLeft,
    iconLeft,
}: HeaderProps) => {
    const renderLeft = () => hideLeft ? (
        <View style={styles.leftView} />
    ) : (
        <TouchableOpacity
            style={styles.backView}
            onPress={onPress}
            hitSlop={HitSlop.default}
            disabled={disable}
        >
            <Text>Back</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={[styles.viewHeader, style]}>
                {renderLeft()}

                <View style={styles.centerView}>
                    {title ? <Text style={[styles.title, titleStyle]}>{title}</Text> : null}
                </View>

                <View style={styles.rightView}>{right}</View>
            </View>
        </View>
    )
}

export default memo(AppBar);

const styles = StyleSheet.create({
    container: {
        paddingTop: getStatusBarHeight(true),
        width: '100%',
        backgroundColor: 'white',
    },
    viewHeader: {
        height: scale(50),
        paddingHorizontal: scale(15),
        flexDirection: 'row',
        alignItems: 'center',
    },
    centerView: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: scale(10),
    },
    backView: {
        width: scale(50),
        justifyContent: 'center',
    },
    leftView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(50),
        height: scale(50),
    },
    rightView: {
        minWidth: scale(50),
        height: scale(50),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        textAlign: 'center',
        fontSize: scale(16),
        color: '#111827',
    },
    btnBack: {
        width: scale(50),
        height: scale(50),
        marginLeft: scale(8),
        justifyContent: 'center',
    },
})
