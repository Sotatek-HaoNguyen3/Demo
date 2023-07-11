import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { loginDataForm } from './src/const';

import { FormInput, Input } from 'components';
import Text from 'components/base/Text';
import Button from 'components/Button';
import ButtonText from 'components/ButtonText';
import { HybridContext } from 'packages/core/hybrid-overlay';
import { useTheme } from 'packages/hooks';
import { useThemeColors } from 'packages/hooks/useTheme';
import { Toast } from 'packages/uikit/components';
import { IColors } from 'packages/uikit/theme';
// import colors from 'packages/uikit/theme/base/colors';
import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';

const LoginScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailStyle, setEmailStyle] = useState<boolean>(false);
    const [passwordStyle, setPasswordStyle] = useState<boolean>(false);
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const { colorMode } = useContext(HybridContext);
    const { toggleColorMode } = colorMode;

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
    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
    } = useForm({
        mode: 'all',
        defaultValues: { email: '', password: '' },
        // resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        console.log(data);
    };

    const onFocus = () => {
        setEmailStyle(true);
    };

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
                        onFocus={() => onFocus()}
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
                    />
                    <View style={{ alignItems: 'flex-end' }}>
                        <Button
                            title="LOGIN"
                            onPress={showToastTop}
                            containerStyles={styles.loginBtn}
                            titleStyles={styles.titleButton}
                        />
                    </View>
                </View>

                {/* <TouchableOpacity onPress={showToastTop} style={styles.btn}>
                    <Text>Toast base Top</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showToastBottom} style={styles.btn}>
                    <Text>Toast base Bottom</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleColorMode} style={styles.btn}>
                    <Text>Toggle Color Mode</Text>
                </TouchableOpacity> */}
            </View>
            <View style={styles.bottomSignUp}>
                <Text>Don't have an account?</Text>
                <ButtonText title="Sign up" titleStyles={styles.signUp} onPress={() => console.log('Sign Up')} />
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
            backgroundColor: 'white',
        },
        content: {
            marginTop: scale(100),
            marginHorizontal: scale(16),
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
        login: {
            ...Fonts.segoe700,
            fontSize: scale(32),
        },
        subTitle: {
            ...Fonts.segoe700,
            fontSize: scale(16),
            color: 'gray',
            marginTop: scale(4),
            marginBottom: scale(40),
        },
        formRegister: {
            justifyContent: 'space-around',
        },
        input: {
            backgroundColor: 'white',
            borderRadius: scale(4),
            borderWidth: 0.2,
            borderColor: '#d4d4d8',
            height: scale(48),
            marginBottom: scale(20),
            paddingHorizontal: scale(8),
            paddingVertical: scale(4),
            shadowColor: '#171717',
            shadowOffset: { width: 6, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
        },
        textInput: {
            fontWeight: '600',
            fontSize: 16,
        },
        labelInput: {
            color: 'gray',
            fontSize: 15,
            fontWeight: '800',
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
            color: '#f9b245',
            bottom: scale(4),
            marginLeft: scale(4),
        },
    });
};
