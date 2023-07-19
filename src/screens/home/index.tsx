import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useMemo, useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { HybridContext } from 'packages/core/hybrid-overlay';
import { useThemeColors } from 'packages/hooks/useTheme';
import { AppBar, CheckBox, EmptyListView, IColors, ListView, OTPInput, SearchBar, Toast } from 'packages/uikit';
import { globalDrawer } from 'packages/uikit/components/Drawer';
import { globalLoading } from 'packages/uikit/components/Loading';
import { AnimatedCircularProgress, ProgressBar } from 'packages/uikit/components/Progress';
import RadioButtonsGroup from 'packages/uikit/components/RadioButton';

import Skeleton from 'packages/uikit/components/Skeleton';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';

const Home = () => {
    const navigation = useNavigation();
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const { colorMode } = useContext(HybridContext);
    const { toggleColorMode } = colorMode;
    const [selectedId, setSelectedId] = useState<string>();
    const [progress, setProgress] = useState<number>(50);

    const renderItem = (item) => {
        return <Text style={{ color: 'black' }}>{item.item.name}</Text>;
    };
    const renderEmpty = () => <EmptyListView />;
    const getApi = () => {
        globalLoading.show();
        setTimeout(() => {
            globalLoading.hide();
        }, 1000);
    };

    const handleSubmitOtp = (code: string) => {
        // console.log(code);
    };

    const showToastTop = () => {
        Toast.show({
            text1: 'Login',
            text2: 'SUCCESS',
            type: 'success',
            props: {
                text1: 'LOGIN',
                text1Style: styles.text1,
            },
        });
    };

    const showToastBottom = () => {
        Toast.show({
            text1: 'allo',
            type: 'base',
            position: 'bottom',
        });
    };

    const radioButtons = [
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Option 1',
            value: 'option1',
            labelStyle: styles.text,
        },
        {
            id: '2',
            label: 'Option 2',
            value: 'option2',
            labelStyle: styles.text,
        },
    ];
    return (
        <View style={styles.container}>
            <AppBar titleStyle={styles.text} title={'Home'} onPress={() => navigation.goBack()} />
            <View style={styles.content}>
                <SearchBar handleSearch={(value) => console.log(value)} />
                <TouchableOpacity onPress={showToastTop} style={styles.btn}>
                    <Text style={styles.text}>Toast base Top</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showToastBottom} style={styles.btn}>
                    <Text style={styles.text}>Toast base Bottom</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleColorMode} style={styles.btn}>
                    <Text style={styles.text}>Toggle Color Mode</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => globalDrawer.open()} style={styles.btn}>
                    <Text style={styles.text}>Drawer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getApi()} style={styles.btn}>
                    <Text style={styles.text}>Loading</Text>
                </TouchableOpacity>
                <OTPInput inputStyle={styles.otp} submit={handleSubmitOtp} />
                <CheckBox fillColor={colors.secondary} onPress={(isChecked: boolean) => {}} />
                <RadioButtonsGroup
                    radioButtons={radioButtons}
                    onPress={(id) => setSelectedId(id)}
                    selectedId={selectedId}
                    color={colors.secondary}
                />
                {/* <ListView data={[]} renderItem={renderItem} listEmpty={renderEmpty} /> */}
                {/* <Skeleton /> */}
                <ProgressBar
                    color={colors.secondary}
                    height={scale(4)}
                    progress={progress / 100}
                    width={Sizes.scrWidth - scale(16 * 2)}
                    borderColor={colors.secondary80}
                />
                <AnimatedCircularProgress
                    size={50}
                    width={8}
                    backgroundWidth={5}
                    fill={progress}
                    tintColor={colors.secondary}
                    backgroundColor={colors.textSubtle}
                    arcSweepAngle={360}
                    rotation={180}
                    lineCap="butt"
                />
            </View>
        </View>
    );
};

export default Home;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeColors.backgroundAlt,
        },
        content: {
            marginHorizontal: scale(16),
        },
        btn: {
            height: scale(50),
            width: scale(340),
            marginTop: scale(20),
            alignItems: 'center',
            borderColor: themeColors.secondary,
            borderWidth: scale(1),
            justifyContent: 'center',
            borderRadius: scale(5),
        },
        text1: {
            fontSize: scale(30),
        },
        text: {
            color: themeColors.secondary,
        },
        otp: {
            color: themeColors.secondary,
            borderBottomColor: themeColors.secondary,
        },
    });
};
