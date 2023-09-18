import { yupResolver } from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';

import { registerDataForm, registerFieldName } from './constant';
import registerSchema from './schema';

import Images from 'assets/images';
import Svgs from 'assets/svgs';
import { useSetting } from 'contexts/SettingProvider';
import { HybridContext } from 'packages/core/hybrid-overlay';
import { useThemeColors } from 'packages/hooks/useTheme';
import { Button, ButtonText, FormInput } from 'packages/uikit';
import Text from 'packages/uikit/components/Text';
import { IColors } from 'packages/uikit/theme';
import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';
import { navigate } from 'utils/navigationUtils';

const INITIAL_VALUES = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
};

const RegisterScreen = () => {
    const {
        control,
        formState: { errors, touchedFields, isValid },
        register,
        getValues,
        handleSubmit,
    } = useForm({
        mode: 'all',
        defaultValues: INITIAL_VALUES,
        resolver: yupResolver(registerSchema),
    });

    console.log('err', errors, touchedFields, isValid);

    const onSubmit = async (data) => {
        console.log(data);
        auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
        // handleSubmit();
        // navigate('Main');
    };
    const { t } = useSetting();
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const { colorMode } = useContext(HybridContext);
    const { mode } = colorMode;
    const fadeImage = mode === 'dark' ? Images.BACKGROUND_FADE_DARK : Images.BACKGROUND_FADE;
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [hideRePassword, setHideRePassword] = useState<boolean>(true);

    const isPassword = (name: string) => {
        return name.toLowerCase().includes(registerFieldName.password);
    };

    const isShowRight = (name: string) => {
        const value = getValues();
        if (isPassword(name)) {
            return true;
        }
        if (name === registerFieldName.email) {
            return !!value.email && !errors[`${registerFieldName.email}`];
        }
        return false;
    };

    const handleHidePassword = (isConfirm = false) => {
        if (isConfirm) {
            setHideRePassword(!hideRePassword);
        } else {
            setHidePassword(!hidePassword);
        }
    };

    const handleSecure = (name: string) => {
        const isPass = isPassword(name);
        if (isPass) {
            if (name === registerFieldName.password) {
                return hidePassword;
            }
            if (name === registerFieldName.confirmPassword) {
                return hideRePassword;
            }
        } else {
            return false;
        }
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
        const Icon = Svgs[isPassword(name) ? `Ic${handleSecure(name) ? 'EyeHide' : 'Eye'}` : `IcCheck`];
        const sizeIcon = isPassword(name) ? (handleSecure(name) ? 20 : 17) : 16;
        const padding = handleSecure(name) || !isPassword(name) ? 0 : scale(2);
        return (
            <TouchableOpacity
                disabled={!isPassword(name)}
                onPress={() => handleHidePassword(name !== registerFieldName.password)}
                style={[styles.rightIcon, { paddingRight: padding }]}>
                <Icon width={scale(sizeIcon)} height={scale(sizeIcon)} />
            </TouchableOpacity>
        );
    };

    const renderInput = (data, index) => {
        const error = errors[`${data.name}`];
        const inputStyle = error && error?.message ? styles.errorInput : styles.input;
        return (
            <FormInput
                key={`input_${index}`}
                control={control}
                name={data.name}
                error={error}
                placeholder={t('auth.' + data.placeholder.toLowerCase())}
                register={register}
                styleInput={inputStyle}
                styleTextInput={styles.textInput}
                placeholderTextColor={colors.label}
                errorTextStyle={styles.errorText}
                leftComponent={renderLeftInput(data.icon)}
                secure={handleSecure(data.name)}
                rightComponent={isShowRight(data.name) && renderRightInput(data.name)}
            />
        );
    };

    return (
        <ImageBackground style={styles.background} source={Images.BACKGROUND}>
            <View style={styles.container}>
                <ImageBackground style={styles.backgroundFade} source={fadeImage} />
                <View style={styles.content}>
                    <View>
                        <Text style={styles.welcome}>{t('auth.welcome')}</Text>
                        <Text style={styles.subTitle}>{t('auth.welcomeSignUp')}</Text>
                    </View>
                    <View style={styles.formRegister}>
                        {registerDataForm.map((data, index) => {
                            return renderInput(data, index);
                        })}
                        <Button
                            title={t('auth.signUp')}
                            onPress={handleSubmit(onSubmit)}
                            containerStyles={styles.loginBtn}
                            titleStyles={styles.titleButton}
                        />
                    </View>
                </View>
                <View style={styles.bottomSignUp}>
                    <Text style={styles.dontHaveAccount}>{t('auth.haveAccount')}</Text>
                    <ButtonText
                        title={t('auth.signIn')}
                        titleStyles={styles.signUp}
                        onPress={() => navigate('Login')}
                    />
                </View>
            </View>
        </ImageBackground>
    );
};

export default RegisterScreen;

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
            top: scale(210),
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
        welcome: {
            ...Fonts.poppins700,
            fontWeight: '700',
            fontSize: scale(28),
            color: themeColors.subText,
        },
        subTitle: {
            ...Fonts.poppins400,
            fontWeight: '400',
            fontSize: scale(12),
            color: themeColors.subText,
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
            height: scale(45),
            marginTop: scale(24),
            paddingHorizontal: scale(10),
            alignItems: 'center',
        },
        errorInput: {
            backgroundColor: themeColors.backgroundAlt,
            borderRadius: scale(8),
            borderWidth: scale(1),
            height: scale(45),
            marginTop: scale(24),
            paddingHorizontal: scale(10),
            alignItems: 'center',
            borderColor: themeColors.red[500],
        },
        textInput: {
            fontWeight: '400',
            fontSize: scale(12),
            ...Fonts.poppins400,
        },
        errorText: {
            fontWeight: '400',
            fontSize: scale(10),
            marginLeft: scale(10),
            ...Fonts.poppins400,
            color: themeColors.red[500],
            position: 'absolute',
            bottom: -scale(16),
        },
        labelInput: {
            fontSize: 10,
            color: themeColors.label,
            ...Fonts.poppins400,
        },
        titleButton: {
            ...Fonts.poppins600,
            fontWeight: '600',
            color: themeColors.white,
            fontSize: scale(14),
        },
        loginBtn: {
            marginTop: scale(33),
            borderRadius: scale(8),
            backgroundColor: themeColors.main,
            height: scale(45),
            marginBottom: scale(24),
        },
        bottomSignUp: {
            position: 'absolute',
            bottom: scale(20),
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        dontHaveAccount: {
            ...Fonts.poppins400,
            color: themeColors.subText,
            fontSize: scale(12),
        },
        signUp: {
            ...Fonts.poppins400,
            color: themeColors.main,
            marginLeft: scale(4),
            fontSize: scale(12),
            textDecorationLine: 'underline',
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
