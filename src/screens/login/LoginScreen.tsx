import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { loginDataForm } from './src/const';
import loginSchema from './src/schema';

import { FormInput } from 'components';
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
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Sizes.statusBarHeight,
    },
    content: {
        marginHorizontal: scale(15),
    },
    formRegister: {
        height: scale(200),
        justifyContent: 'space-around',
    },
});
