import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors, Image, ListView } from 'packages/uikit';
import Images from 'assets/images';
import { scale } from 'themes/scales';
import Fonts from 'themes/fonts';

const data = [
    {
        id: '1122',
        name: 'Fresh Ice Cream With Cookies',
        avatar: '',
    },
    {
        id: '111',
        name: 'Pasta without a Pasta Machine',
        avatar: '',
    },
    {
        id: '2',
        name: 'The Best Classic Burger',
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
];

const PostSave = () => {
    const color = useThemeColors();
    const styles = myStyles(color);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Image source={Images.EXAMPLE_POST} imageStyles={styles.image} />
                <View style={styles.infoView}>
                    <Text style={styles.nameText} numberOfLines={2}>
                        {item.name}
                    </Text>
                    <Text style={styles.ownText}>alooha</Text>
                </View>
            </View>
        );
    };

    return (
        <ListView
            data={data}
            renderItem={renderItem}
            style={styles.listPost}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: scale(70) }}
        />
    );
};

export default PostSave;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        itemContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            // height: scale(90),
            marginBottom: scale(15),
        },
        image: {
            width: scale(116),
            height: scale(84),
            borderRadius: scale(12),
            resizeMode: 'cover',
        },
        infoView: {
            marginLeft: scale(15),
        },
        listPost: {
            paddingTop: scale(30),
        },
        nameText: {
            ...Fonts.poppins600,
            fontSize: scale(16),
            maxWidth: scale(209),
        },
        ownText: {
            ...Fonts.poppins400,
            fontSize: scale(10),
        },
    });
};
