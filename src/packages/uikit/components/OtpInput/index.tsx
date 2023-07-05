import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TextInput, View } from 'react-native';

import { fieldName, initValue, isAutoFillSupported, isNum } from './utils';

import { scale } from 'themes/scales';

interface OTPInputProps {
    digit?: number;
    firstFocus?: boolean;
}
const OTPInput = (props: OTPInputProps) => {
    const { digit = 6, firstFocus = true } = props;
    const otpArr = Array.from(Array(digit).keys());
    const initialValue = initValue(otpArr);
    const inputOtpRef = useRef([]);
    const { control, register, getValues, setValue } = useForm({
        mode: 'all',
        defaultValues: initialValue,
    });

    const autoFocus = (idx: number, isNext = true) => {
        if (isNext) {
            const nextInput = idx + 1;
            if (nextInput < digit) {
                inputOtpRef.current[nextInput].focus();
            }
        } else {
            const previousInput = idx - 1;
            if (previousInput >= 0) {
                inputOtpRef.current[previousInput].focus();
            }
        }
    };

    const handleChangeOTP = (value, idx, onChange) => {
        if (isNum(value)) {
            onChange(value);
            autoFocus(idx);
        }
    };

    const handleKeyPress = (event: object, idx: number) => {
        const isHasValue = !!getValues(fieldName(idx));
        if (event['key'] === 'Backspace' && !isHasValue) {
            autoFocus(idx, false);
        }
    };

    return (
        <View style={styles.container}>
            {otpArr.map((_, index) => (
                <Controller
                    name={fieldName(index)}
                    key={index}
                    control={control}
                    render={({ field }) => {
                        const { value, onChange, onBlur } = field;
                        return (
                            <TextInput
                                {...register(fieldName(index))}
                                ref={(ref) => (inputOtpRef.current[index] = ref)}
                                onBlur={onBlur}
                                onChangeText={(e) => {
                                    handleChangeOTP(e, index, onChange);
                                }}
                                onKeyPress={({ nativeEvent }) => {
                                    handleKeyPress(nativeEvent, index);
                                }}
                                onFocus={() => {
                                    setValue(fieldName(index), '');
                                }}
                                autoFocus={firstFocus ? index === 0 : false}
                                keyboardType="number-pad"
                                value={value}
                                style={styles.input}
                                autoCapitalize={'none'}
                                autoComplete="off"
                                maxLength={1}
                                textContentType={isAutoFillSupported ? 'oneTimeCode' : 'none'}
                            />
                        );
                    }}
                />
            ))}
        </View>
    );
};

export default OTPInput;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
        height: scale(100),
    },
    input: {
        borderBottomWidth: scale(1),
        width: scale(40),
        height: scale(50),
        fontSize: scale(20),
        textAlign: 'center',
    },
});
