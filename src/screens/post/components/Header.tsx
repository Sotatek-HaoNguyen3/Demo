import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Svgs from 'assets/svgs';
import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors } from 'packages/uikit';

import { HitSlop } from 'themes/dimensions';
import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';
import { goBack } from 'utils/navigationUtils';

const Header = () => {
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const IconBack = Svgs[`IcBack`];
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.backView} onPress={() => goBack()} hitSlop={HitSlop.default}>
                <IconBack width={scale(34)} height={scale(34)} />
            </TouchableOpacity>
            <Text style={styles.titleText}>Create Post</Text>
        </View>
    );
};

export default Header;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        titleText: {
            color: themeColors.subText,
            ...Fonts.poppins700,
            fontWeight: '700',
            fontSize: scale(20),
        },
        backView: {
            marginRight: scale(22),
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    });
};
