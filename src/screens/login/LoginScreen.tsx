import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { loginDataForm } from './src/const';

import loginSchema from './src/schema';

import { FormInput } from 'components';
import Text from 'components/base/Text';
import Button from 'components/Button';
import ButtonText from 'components/ButtonText';
import { useThemeColors } from 'packages/hooks/useTheme';

import { IColors } from 'packages/uikit/theme';
// import colors from 'packages/uikit/theme/base/colors';
import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';
import { navigate } from 'utils/navigationUtils';

const LoginScreen = () => {
    const {
        control,
        formState: { errors },
        register,
    } = useForm({
        mode: 'all',
        defaultValues: { email: '', password: '' },
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async () => {
        navigate('Home');
    };
    const colors = useThemeColors();
    const styles = myStyles(colors);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View>
                    <Text style={styles.login}>Login</Text>
                    <Text style={styles.subTitle}>Please sign in to continue</Text>
                </View>
                <View style={styles.formRegister}>
                    <FormInput
                        control={control}
                        name={loginDataForm[0].name}
                        error={errors[`${loginDataForm[0].name}`]}
                        placeholder={loginDataForm[0].name}
                        label={loginDataForm[0].label}
                        register={register}
                        styleInput={styles.input}
                        styleTextInput={styles.textInput}
                        labelTextStyle={styles.labelInput}
                        placeholderTextColor={colors.secondary80}
                    />
                    <FormInput
                        control={control}
                        name={loginDataForm[1].name}
                        error={errors[`${loginDataForm[1].name}`]}
                        placeholder={loginDataForm[1].name}
                        label={loginDataForm[1].label}
                        register={register}
                        styleInput={styles.input}
                        styleTextInput={styles.textInput}
                        labelTextStyle={styles.labelInput}
                        placeholderTextColor={colors.secondary80}
                    />
                    <View style={{ alignItems: 'flex-end' }}>
                        <Button
                            title="LOGIN"
                            onPress={onSubmit}
                            containerStyles={styles.loginBtn}
                            titleStyles={styles.titleButton}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.bottomSignUp}>
                <Text>Don't have an account?</Text>
                <ButtonText title="Sign up" titleStyles={styles.signUp} onPress={() => {}} />
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
            backgroundColor: themeColors.backgroundAlt,
        },
        content: {
            marginTop: scale(100),
            marginHorizontal: scale(16),
        },
        btn: {
            height: scale(50),
            width: scale(340),
            marginTop: scale(10),
            alignItems: 'center',
            borderColor: 'black',
            borderWidth: scale(1),
            justifyContent: 'center',
            borderRadius: scale(5),
        },
        text1: {
            fontSize: scale(30),
        },
        login: {
            ...Fonts.segoe700,
            fontSize: scale(32),
            color: themeColors.secondary,
        },
        subTitle: {
            ...Fonts.segoe700,
            fontSize: scale(16),
            color: themeColors.secondary80,
            marginTop: scale(4),
            marginBottom: scale(40),
        },
        formRegister: {
            justifyContent: 'space-around',
        },
        input: {
            backgroundColor: themeColors.backgroundAlt,
            borderRadius: scale(4),
            borderWidth: 1,
            borderColor: themeColors.cardBorder,
            height: scale(48),
            marginBottom: scale(20),
            paddingHorizontal: scale(8),
            paddingVertical: scale(4),
            shadowColor: '#171717',
            shadowOffset: { width: 6, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
        },
        textInput: {
            fontWeight: '600',
            fontSize: 16,
            color: themeColors.secondary,
        },
        labelInput: {
            fontSize: 15,
            fontWeight: '800',
            color: themeColors.secondary,
        },
        titleButton: {
            ...Fonts.segoe700,
            color: themeColors.white,
        },
        loginBtn: {
            marginTop: scale(20),
            width: scale(120),
            borderRadius: scale(40),
            alignContent: 'flex-end',
            backgroundColor: themeColors.secondary,
        },
        bottomSignUp: {
            position: 'absolute',
            bottom: scale(20),
            justifyContent: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
        },
        signUp: {
            ...Fonts.segoe700,
            color: themeColors.secondary,
            bottom: scale(4),
            marginLeft: scale(4),
        },
    });
};
