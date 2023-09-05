import React from 'react';

import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';
import { useThemeColors } from 'packages/hooks/useTheme';
import { Avatar, IColors } from 'packages/uikit';

import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';
import Fonts from 'themes/fonts';
import Svgs from 'assets/svgs';

const data = [
    {
        id: '1',
        username: 'Misty Shepherd',
        caption: 'Bài viết số 1',
        imageUrl: 'URL_hình_ảnh_1',
    },
    {
        id: '2',
        username: 'user2',
        caption: 'Bài viết số 2',
        imageUrl: 'URL_hình_ảnh_2',
    },
    {
        id: '3',
        username: 'user2',
        caption: 'Bài viết số 2',
        imageUrl: 'URL_hình_ảnh_2',
    },
    {
        id: '4',
        username: 'user2',
        caption: 'Bài viết số 2',
        imageUrl: 'URL_hình_ảnh_2',
    },
    // Thêm các bài viết khác tương tự
];

const HomeScreen = () => {
    const colors = useThemeColors();
    const styles = myStyles(colors);

    const flatListRef = React.useRef<FlatList>();

    React.useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({
                animated: false,
                offset: 0,
            });
        }
    }, [flatListRef]);

    const snapToOffsetsLikeGooglePlay = data.map((x, i) => {
        return i * Sizes.scrHeight;
    });

    const renderItem = ({ item }) => {
        return (
            <View style={styles.postContainer}>
                <Image source={Images.DEMO_HOME} style={styles.image} />
                <View style={styles.captionContainer}>
                    <Avatar size={36} source={Images.DEMO_HOME} />
                    <View style={styles.ownProfile}>
                        <View style={styles.nameView}>
                            <Text style={styles.username}>{item.username}</Text>
                            <View style={styles.dot} />
                            <Text style={styles.liveText}>LIVE</Text>
                        </View>
                        <Text style={styles.caption}>{item.caption}</Text>
                    </View>
                </View>
                <View style={styles.rightView}>
                    <View style={styles.iconView}>
                        <Svgs.IcLike />
                    </View>
                    <View style={styles.iconView}>
                        <Svgs.IcFollow />
                    </View>
                    <View style={styles.iconView}>
                        <Svgs.IcSave />
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                pagingEnabled={true}
                showsVerticalScrollIndicator={false}
                decelerationRate={0}
                snapToOffsets={snapToOffsetsLikeGooglePlay}
                snapToAlignment={'center'}
            />
        </View>
    );
};

export default HomeScreen;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        postContainer: {
            flex: 1,
            // alignItems: 'center',
            // justifyContent: 'center',
            // flexDirection: 'row',
        },
        image: {
            width: Sizes.scrWidth,
            height: Sizes.scrHeight,
        },
        captionContainer: {
            zIndex: 1,
            position: 'absolute',
            top: scale(669),
            left: scale(14),
            flexDirection: 'row',
            alignItems: 'center',
        },
        username: {
            fontSize: scale(12),
            color: themeColors.white,
            ...Fonts.poppins700,
        },
        caption: {
            fontSize: scale(10),
            color: themeColors.white,
            ...Fonts.poppins700,
        },
        ownProfile: {
            marginLeft: scale(10),
        },
        iconView: {
            width: scale(32),
            height: scale(32),
            borderRadius: scale(16),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: themeColors.white,
            marginVertical: scale(10),
        },
        rightView: { flex: 1, zIndex: 1, position: 'absolute', top: scale(582), left: scale(330) },
        liveText: {
            ...Fonts.poppins700,
            fontSize: scale(10),
            color: themeColors.white,
        },
        dot: {
            width: scale(4),
            height: scale(4),
            borderRadius: scale(2),
            backgroundColor: themeColors.white,
            marginLeft: scale(5),
            marginRight: scale(2),
        },
        nameView: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    });
};
