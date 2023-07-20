import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { loginDataForm } from './src/const';
import loginSchema from './src/schema';

import { FormInput } from 'components';

import BottomTestSheet from 'components/sheet/TestBottomSheet';
import { HybridContext } from 'packages/core/hybrid-overlay';
import { useThemeColors } from 'packages/hooks/useTheme';
import { Toast } from 'packages/uikit/components';
import { IColors } from 'packages/uikit/theme';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';
import BottomSheetInput, { BottomSheetInputRefType } from 'components/sheet/BottomSheetInput';

const test = [
    { title: 'allo 1', subTitle: 'haha 1', id: 1 },
    { title: 'allo 2', subTitle: 'haha 2', id: 2 },
    { title: 'allo 3', subTitle: 'haha 3', id: 3 },
    { title: 'allo 4', subTitle: 'haha 4', id: 4 },
];

const LoginScreen = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
    } = useForm({
        mode: 'all',
        defaultValues: { email: '', password: '' },
        resolver: yupResolver(loginSchema),
    });

    const [dataTest, setDataTest] = useState(test);

    const onSubmit = async (data) => {
        console.log(data);
    };
    const colors = useThemeColors();

    const bottomSheetRef = useRef<BottomSheetInputRefType>(null);

    const showBottomSheet = () => {
        if (bottomSheetRef) {
            bottomSheetRef.current?.open();
        }
    };

    const dismissBottomSheet = () => {
        if (bottomSheetRef) {
            bottomSheetRef.current?.close();
        }
    };

    const styles = myStyles(colors);
    const { colorMode } = useContext(HybridContext);
    const { toggleColorMode } = colorMode;

    const showToastTop = () => {
        Toast.show({
            text1: 'allo',
            text2: 'bllo',
            type: 'success',
            props: {
                text1: 'allll',
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

    const renderTestItem = ({ item }) => (
        <View style={styles.itemView}>
            <Text style={{ color: 'black' }}>{item?.title}</Text>
            <Text>{item?.subTitle}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.formRegister}>
                    <FormInput
                        control={control}
                        name={loginDataForm[0].name}
                        error={errors[`${loginDataForm[0].name}`]}
                        placeholder={loginDataForm[0].name}
                        label={loginDataForm[0].label}
                        register={register}
                    />
                    <FormInput
                        control={control}
                        name={loginDataForm[1].name}
                        error={errors[`${loginDataForm[1].name}`]}
                        placeholder={loginDataForm[1].name}
                        label={loginDataForm[1].label}
                        register={register}
                    />
                </View>

                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showToastTop} style={styles.btn}>
                    <Text>Toast base Top</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showToastBottom} style={styles.btn}>
                    <Text>Toast base Bottom</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleColorMode} style={styles.btn}>
                    <Text>Toggle Color Mode</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showBottomSheet} style={styles.btn}>
                    <Text>Toast bottomSheet</Text>
                </TouchableOpacity>
            </View>
            <BottomSheetInput ref={bottomSheetRef}>
                <FlatList
                    data={dataTest}
                    renderItem={renderTestItem}
                    keyExtractor={(e) => `${e.id}`}
                    style={styles.flatList}
                />
            </BottomSheetInput>
        </View>
    );
};

export default LoginScreen;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: Sizes.statusBarHeight,
            backgroundColor: themeColors.backgroundDisabled,
        },
        content: {
            marginHorizontal: scale(15),
        },
        btn: {
            height: scale(50),
            width: scale(340),
            marginTop: scale(40),
            alignItems: 'center',
            borderColor: 'black',
            borderWidth: scale(1),
            justifyContent: 'center',
            borderRadius: scale(5),
        },
        text1: {
            fontSize: scale(30),
        },
        formRegister: {
            height: scale(200),
            justifyContent: 'space-around',
        },
        viewContent: {
            height: scale(100),
            width: '100%',
            backgroundColor: themeColors.white,
        },
        flatList: {
            height: scale(200),
            width: '100%',
            backgroundColor: themeColors.white,
        },
        itemView: {
            height: scale(100),
        },
    });
};
