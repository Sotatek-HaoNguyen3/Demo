import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { loginDataForm } from './src/const';
import loginSchema from './src/schema';

import { FormInput } from 'components';

import { HybridContext } from 'packages/core/hybrid-overlay';
import { useThemeColors } from 'packages/hooks/useTheme';
import { CheckBox, EmptyListView, ListView, OTPInput, RadioGroup, Toast } from 'packages/uikit/components';

import { globalDrawer } from 'packages/uikit/components/Drawer';
import { globalLoading } from 'packages/uikit/components/Loading';
import { IColors } from 'packages/uikit/theme';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';

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

    const onSubmit = async (data) => {
        console.log(data);
    };
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const { colorMode } = useContext(HybridContext);
    const { toggleColorMode } = colorMode;
    const [selectedId, setSelectedId] = useState<string>();
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

    const radioButtons = [
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Option 1',
            value: 'option1',
        },
        {
            id: '2',
            label: 'Option 2',
            value: 'option2',
        },
    ];

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
                <TouchableOpacity onPress={() => globalDrawer.open()}>
                    <Text>Drawer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getApi()}>
                    <Text>Loading</Text>
                </TouchableOpacity>
                <OTPInput submit={handleSubmitOtp} />
                <CheckBox onPress={(isChecked: boolean) => {}} />
                <RadioGroup radioButtons={radioButtons} onPress={(id) => setSelectedId(id)} selectedId={selectedId} />
                {/* <ListView data={[]} renderItem={renderItem} listEmpty={renderEmpty} /> */}
            </View>
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
    });
};
