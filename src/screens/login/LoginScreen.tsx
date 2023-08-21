import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ImageBackground, StyleSheet, View } from 'react-native';

import { loginDataForm } from './src/const';
import loginSchema from './src/schema';

import Images from 'assets/images';
import { HybridContext } from 'packages/core/hybrid-overlay';
import { useThemeColors } from 'packages/hooks/useTheme';
import { Button, ButtonText, FormInput } from 'packages/uikit';
import Text from 'packages/uikit/components/Text';
import { IColors } from 'packages/uikit/theme';
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
        navigate('Main');
    };
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const { colorMode } = useContext(HybridContext);
    const { mode } = colorMode;
    const fadeImage = mode === 'dark' ? Images.BACKGROUND_FADE_DARK : Images.BACKGROUND_FADE;

    return (
        <ImageBackground style={styles.background} source={Images.BACKGROUND}>
            <View style={styles.container}>
                <ImageBackground style={styles.backgroundFade} source={fadeImage} />
                <View style={styles.content}>
                    <View>
                        <Text style={styles.login}>Login</Text>
                        <Text style={styles.subTitle}>Please sign in to continue</Text>
                    </View>
                    <View style={styles.formRegister}>
                        {loginDataForm.map((data, index) => {
                            return (
                                <FormInput
                                    key={`input_${index}`}
                                    control={control}
                                    name={data.name}
                                    error={errors[`${data.name}`]}
                                    placeholder={data.name}
                                    register={register}
                                    styleInput={styles.input}
                                    styleTextInput={styles.textInput}
                                    labelTextStyle={styles.labelInput}
                                    placeholderTextColor={colors.secondary80}
                                />
                            );
                        })}
                        <Button
                            title="LOGIN"
                            onPress={onSubmit}
                            containerStyles={styles.loginBtn}
                            titleStyles={styles.titleButton}
                        />
                    </View>
                </View>
                <View style={styles.bottomSignUp}>
                    <Text>Don't have an account?</Text>
                    <ButtonText title="Sign up" titleStyles={styles.signUp} onPress={() => {}} />
                </View>
            </View>
        </ImageBackground>
    );
};

export default LoginScreen;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        background: {
            flex: 1,
            justifyContent: 'flex-end',
        },
        backgroundFade: {
            flex: 1,
            position: 'absolute',
            height: scale(1000),
            width: scale(800),
            left: -scale(200),
            top: scale(130),
        },
        container: {
            flex: 1,
            // backgroundColor: themeColors.backgroundAlt,
        },
        content: {
            position: 'absolute',
            width: Sizes.scrWidth,
            top: scale(231),
            paddingHorizontal: scale(16),
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
            color: themeColors.blackOpacity80,
        },
        subTitle: {
            ...Fonts.segoe600,
            fontSize: scale(16),
            color: themeColors.blackOpacity50,
            marginTop: scale(4),
            marginBottom: scale(15),
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
            marginTop: scale(20),
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
            marginTop: scale(33),
            borderRadius: scale(8),
            backgroundColor: themeColors.main,
            height: scale(49),
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
