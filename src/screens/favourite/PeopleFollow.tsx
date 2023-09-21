import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors, ListView } from 'packages/uikit';
import Images from 'assets/images';
import { scale } from 'themes/scales';
import Fonts from 'themes/fonts';
import { Svg } from 'react-native-svg';
import Svgs from 'assets/svgs';

const data = [
    {
        id: '1122',
        name: 'Akkd',
        avatar: '',
    },
    {
        id: '111',
        name: 'Akkd',
        avatar: '',
    },
    {
        id: '2',
        name: 'Akkd',
        avatar: '',
    },
    {
        id: '3',
        name: 'Akkd',
        avatar: '',
    },
    {
        id: '4',
        name: 'Akkd',
        avatar: '',
    },
    {
        id: '5',
        name: 'Akkd',
        avatar: '',
    },
    {
        id: '6',
        name: 'Akkd',
        avatar: '',
    },
    {
        id: '7',
        name: 'Akkd',
        avatar: '',
    },
    {
        id: '11',
        name: 'Akkd',
        avatar: '',
    },
    {
        id: '12',
        name: 'Akkd',
        avatar: '',
    },
    {
        id: '16',
        name: 'Akkd',
        avatar: '',
    },
];

const PeopleFollow = () => {
    const color = useThemeColors();
    const styles = myStyles(color);

    const renderItem = ({ item }) => {
        return (
            <ImageBackground source={Images.AVATAR_EXAMPLE} style={styles.itemView}>
                <View style={styles.iconLike}>
                    <Svgs.IcLike width={scale(10)} height={scale(10)} />
                </View>
                <Text style={styles.textName}>{item.name}</Text>
            </ImageBackground>
        );
    };

    return (
        <ListView
            data={data}
            renderItem={renderItem}
            // horizontal={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            style={{ flex: 1, paddingTop: scale(30) }}
            contentContainerStyle={{ paddingBottom: scale(70) }}
            columnWrapperStyle={{ justifyContent: data.length < 2 ? 'flex-start' : 'space-between' }}
        />
    );
};

export default PeopleFollow;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        itemView: {
            width: scale(165),
            height: scale(141),
            borderRadius: scale(10),
            resizeMode: 'cover',
            marginBottom: scale(15),
            justifyContent: 'space-between',
        },
        textName: {
            fontSize: scale(12),
            ...Fonts.poppins400,
            color: themeColors.white,
            padding: scale(10),
            maxWidth: scale(140),
        },
        iconLike: {
            backgroundColor: themeColors.white,
            width: scale(20),
            height: scale(20),
            borderRadius: scale(10),
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: scale(130),
            marginTop: scale(10),
        },
    });
};
