import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';

import { loginDataForm, loginFieldName } from './const';
import loginSchema from './schema';

import Images from 'assets/images';
import Svgs from 'assets/svgs';
import { HybridContext } from 'packages/core/hybrid-overlay';
import { useThemeColors } from 'packages/hooks/useTheme';
import { Button, ButtonText, CheckBox, FormInput } from 'packages/uikit';
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
        getValues,
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
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const isPassword = (name: string) => {
        return name === loginFieldName.password;
    };

    const handleHidePassword = () => {
        setHidePassword(!hidePassword);
    };

    const renderLeftInput = (icon: string) => {
        const Icon = Svgs[`${icon}`];
        return (
            <View style={styles.leftIcon}>
                <Icon width={scale(16)} height={scale(16)} />
            </View>
        );
    };

    const renderRightInput = (name) => {
        const Icon = Svgs[isPassword(name) ? `Ic${hidePassword ? 'EyeHide' : 'Eye'}` : `IcCheck`];
        const sizeIcon = isPassword(name) ? (hidePassword ? 20 : 17) : 16;
        const padding = hidePassword || !isPassword(name) ? 0 : scale(2);
        return (
            <TouchableOpacity
                disabled={name !== loginFieldName.password}
                onPress={handleHidePassword}
                style={[styles.rightIcon, { paddingRight: padding }]}>
                <Icon width={scale(sizeIcon)} height={scale(sizeIcon)} />
            </TouchableOpacity>
        );
    };

    const renderCheckboxIcon = () => {
        const Icon = Svgs[`IcTick`];
        return isCheck ? <Icon width={scale(12)} height={scale(12)} /> : null;
    };

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
                                    placeholderTextColor={colors.label}
                                    leftComponent={renderLeftInput(data.icon)}
                                    secure={isPassword(data.name) ? hidePassword : false}
                                    rightComponent={renderRightInput(data.name)}
                                />
                            );
                        })}
                        <Button
                            title="LOGIN"
                            onPress={onSubmit}
                            containerStyles={styles.loginBtn}
                            titleStyles={styles.titleButton}
                        />
                        <CheckBox
                            iconComponent={renderCheckboxIcon()}
                            fillColor={colors.main}
                            onPress={(isChecked: boolean) => {
                                setIsCheck(isChecked);
                            }}
                            radius={scale(3)}
                            size={scale(16)}
                            text="Remember me"
                            textContainerStyle={styles.checkBoxTextContainer}
                            textStyle={styles.checkBoxText}
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
            height: scale(1100),
            width: scale(900),
            left: -scale(220),
            top: scale(100),
        },
        container: {
            flex: 1,
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
            ...Fonts.poppins700,
            fontWeight: '700',
            fontSize: scale(32),
            color: themeColors.blackOpacity80,
        },
        subTitle: {
            ...Fonts.poppins700,
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
            borderRadius: scale(8),
            borderWidth: scale(1),
            borderColor: themeColors.blackOpacity10,
            height: scale(48),
            marginTop: scale(20),
            paddingHorizontal: scale(10),
            alignItems: 'center',
        },
        textInput: {
            fontWeight: '400',
            fontSize: scale(12),
            ...Fonts.poppins400,
        },
        labelInput: {
            fontSize: 10,
            color: themeColors.label,
            ...Fonts.poppins400,
        },
        titleButton: {
            ...Fonts.poppins700,
            color: themeColors.white,
        },
        loginBtn: {
            marginTop: scale(33),
            borderRadius: scale(8),
            backgroundColor: themeColors.main,
            height: scale(49),
            marginBottom: scale(24),
        },
        bottomSignUp: {
            position: 'absolute',
            bottom: scale(20),
            justifyContent: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
        },
        signUp: {
            ...Fonts.poppins700,
            color: themeColors.secondary,
            bottom: scale(4),
            marginLeft: scale(4),
        },
        leftIcon: {
            marginRight: scale(8),
        },
        rightIcon: {
            width: scale(20),
            alignItems: 'center',
        },
        checkBoxTextContainer: {
            marginLeft: scale(4),
        },
        checkBoxText: {
            fontWeight: '400',
            fontSize: scale(12),
            ...Fonts.poppins100,
            color: themeColors.subText,
            textDecorationLine: 'none',
        },
    });
};
