import { RouteProp, useIsFocused } from '@react-navigation/native';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { PERMISSIONS } from 'react-native-permissions';

// import Svgs from 'assets/svgs';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

import ScanMask from './ScanMask';

import Text from 'components/base/Text';
import { useSetting } from 'contexts/SettingProvider';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';
import Fonts from 'themes/fonts';
import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors } from 'packages/uikit/theme';

const SCREEN_HEIGHT = Sizes.scrHeight;
const SCREEN_WIDTH = Sizes.scrWidth;
const SCAN_SIZE = (SCREEN_WIDTH * 231) / 375;
const topMargin = (SCREEN_HEIGHT - 150) / 2 - SCAN_SIZE / 2;
const leftMargin = SCREEN_WIDTH / 2 - SCAN_SIZE / 2;
const ANIMATED_DURATION = 1000;

// interface ScanQRRouteProps {
//     route: RouteProp<RootNavigatorParamList, 'ScanQR'>;
// }

const ScanQRScreen = (props) => {
    // const { onSuccess } = props.route.params;
    const color = useThemeColors();
    const styles = myStyles(color);

    const makeSlideOutTranslation = (translationType) => {
        return {
            from: {
                [translationType]: 0,
            },
            to: {
                [translationType]: SCAN_SIZE,
            },
        };
    };

    const renderHeader = () => (
        <View style={styles.headerStyle}>
            <Text style={styles.title}>{'scanCode'}</Text>
        </View>
    );

    const onReadQRSuccess = (res) => {
        if (res.type === RNCamera.Constants.BarCodeType.qr) {
            console.log(res);
        }
    };

    return (
        <View style={styles.container}>
            {renderHeader()}
            {useIsFocused() && (
                <QRCodeScanner
                    onRead={onReadQRSuccess}
                    cameraStyle={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
                    reactivate
                    reactivateTimeout={5000}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    showMarker
                    checkAndroid6Permissions={false}
                    customMarker={
                        <>
                            <ScanMask
                                windowWidth={SCREEN_WIDTH}
                                windowHeight={SCREEN_HEIGHT}
                                scanSize={SCAN_SIZE}
                                xPos={leftMargin}
                                yPos={topMargin}
                                borderRadius={scale(16)}
                            />
                            <View style={styles.rectangle}>
                                <View style={[styles.corner, styles.borderTopLeft]} />
                                <View style={[styles.corner, styles.borderTopRight]} />
                                <View style={[styles.corner, styles.borderBottmLeft]} />
                                <View style={[styles.corner, styles.borderBottmRight]} />
                                <Animatable.View
                                    direction="alternate-reverse"
                                    iterationCount="infinite"
                                    duration={ANIMATED_DURATION}
                                    easing="linear"
                                    animation={makeSlideOutTranslation('translateY')}
                                    onLayout={undefined}>
                                    <View style={styles.viewAnimated} />
                                </Animatable.View>
                            </View>
                        </>
                    }
                />
            )}
        </View>
    );
};

export default ScanQRScreen;

const myStyles = (theme: IColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.backgroundAlt,
        },
        rectangle: {
            overflow: 'hidden',
            borderRadius: scale(16),
            position: 'absolute',
            top: topMargin,
            left: leftMargin,
            width: SCAN_SIZE,
            height: SCAN_SIZE,
            backgroundColor: theme.bgScan,
        },
        corner: {
            width: scale(76),
            height: scale(76),
            position: 'absolute',
            borderColor: theme.white,
        },
        borderTopLeft: {
            borderTopWidth: scale(2),
            borderLeftWidth: scale(2),
            borderTopLeftRadius: scale(16),
            top: 0,
            left: 0,
        },
        borderTopRight: {
            borderTopWidth: scale(2),
            borderRightWidth: scale(2),
            borderTopRightRadius: scale(16),
            top: 0,
            right: 0,
        },
        borderBottmLeft: {
            borderBottomWidth: scale(2),
            borderLeftWidth: scale(2),
            borderBottomLeftRadius: scale(16),
            bottom: 0,
            left: 0,
        },
        borderBottmRight: {
            borderBottomWidth: scale(2),
            borderRightWidth: scale(2),
            borderBottomRightRadius: scale(16),
            bottom: 0,
            right: 0,
        },
        topOverlay: {
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
        },
        viewAnimated: {
            height: scale(2),
            backgroundColor: theme.white,
        },
        bottomView: {
            zIndex: 999,
            top: SCREEN_HEIGHT / 2 + scale(122),
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'center',
            left: 0,
            right: 0,
        },
        btnText: {
            fontSize: scale(14),
            color: theme.white,
            marginTop: scale(6),
        },
        subTitle: {
            fontSize: scale(14),
            color: theme.white,
            textAlign: 'center',
            paddingHorizontal: scale(50),
        },
        btnView: {
            paddingHorizontal: scale(50),
            flexDirection: 'row',
            marginTop: scale(75),
        },
        btn: {
            flex: 1,
            alignItems: 'center',
        },
        aroundBtn: {
            width: scale(45),
            height: scale(45),
            borderRadius: scale(25),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `${theme.secondary}50`,
        },
        headerStyle: {
            zIndex: 999,
            top: topMargin / 2,
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'center',
            left: 0,
            right: 0,
        },
        title: {
            fontSize: scale(18),
            color: theme.white,
            marginHorizontal: scale(100),
        },
    });
