import React, { useMemo, useRef, useState } from 'react';

import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import IntroStep from './IntroStep';

import Images from 'assets/images';

import { useSetting } from 'contexts/SettingProvider';

import { useThemeColors } from 'packages/hooks/useTheme';
import { Button, IColors, Slider } from 'packages/uikit';
import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';
import { navigate } from 'utils/navigationUtils';
import Storages, { KeyStorage } from 'utils/storages';

const IntroScreen = (props) => {
    const { t } = useSetting();
    const sliderRef = useRef(null);
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const [currentPage, setCurrentPage] = useState(0);
    const handleLogin = () => {
        navigate('Login');
    };

    const isFinish = useMemo(() => {
        return currentPage === 2;
    }, [currentPage]);

    const slideList = [
        {
            title: 'Explore',
            messageText:
                'Our innovative platform combines the power of social interaction with comprehensive language lessons, creating a dynamic and immersive learning experience.',
            imgMain: 'IcHeadphone',
            nextAction: null,
        },
        {
            title: 'Share',
            messageText:
                'We believe that knowledge grows when shared, and learning English becomes an enriching communal endeavor.',
            imgMain: 'IcBookmark',
            nextAction: null,
        },
        {
            title: 'Search',
            messageText:
                'With a plethora of resources at your fingertips, you can explore, and find the answers you seek to bolster your English proficiency.',
            imgMain: 'IcZoom',
            nextAction: handleLogin,
        },
    ];

    React.useEffect(() => {
        Storages.set(KeyStorage.isTurnOfIntro, 'true');
    }, []);

    const renderItem = ({ index }) => {
        const slideData = slideList[index.key];
        return (
            <IntroStep
                {...slideData}
                onSwipe={() => {
                    sliderRef?.current?.onNext();
                }}
                key={`IntroStep-${index.key}`}
            />
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ImageBackground style={styles.backgroundStyle} source={Images.INTRO_BACKGROUND} />
            <Slider ref={sliderRef} renderItem={renderItem} onSlideChange={(index) => setCurrentPage(index)} />
            {!isFinish && (
                <View style={styles.skipView}>
                    <TouchableOpacity style={styles.skipBtn} onPress={() => navigate('Main')}>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                </View>
            )}
            <Button
                title={`${isFinish ? 'Done' : 'Next'}`}
                onPress={() => {
                    if (isFinish) {
                        navigate('Main');
                    } else {
                        sliderRef?.current?.onNext();
                    }
                }}
                containerStyles={styles.loginBtn}
                titleStyles={styles.titleButton}
            />
        </View>
    );
};

export default IntroScreen;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeColors.backgroundAlt,
        },
        backgroundStyle: {
            position: 'absolute',
            width: Sizes.scrWidth,
            height: scale(289),
            top: -scale(89),
        },
        skipView: {
            position: 'absolute',
            width: Sizes.scrWidth,
            height: scale(200),
            alignItems: 'flex-end',
            paddingRight: scale(15),
            paddingTop: scale(60),
        },
        skipBtn: {},
        skipText: {
            ...Fonts.poppins100,
            fontWeight: '500',
            fontSize: scale(12),
            color: themeColors.white,
        },
        titleButton: {
            ...Fonts.poppins600,
            fontWeight: '600',
            color: themeColors.white,
            fontSize: scale(14),
        },
        loginBtn: {
            borderRadius: scale(8),
            backgroundColor: themeColors.main,
            height: scale(50),
            marginBottom: scale(10) + Sizes.bottomSpace,
            marginHorizontal: scale(16),
        },
    });
};
