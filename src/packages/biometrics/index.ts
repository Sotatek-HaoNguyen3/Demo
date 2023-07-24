import { Alert } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import * as Keychain from 'react-native-keychain';

const rnBiometrics = new ReactNativeBiometrics();

export const getBiometricsType = async () => {
    try {
        const resultObject = await rnBiometrics.isSensorAvailable();
        const { biometryType } = resultObject;
        return biometryType;
    } catch (error) {
        console.error('getBiometricsTypeError:', error);
    }
};

export const enableBiometric = async (username: string, password: string) => {
    try {
        const resultObject = await rnBiometrics.isSensorAvailable();
        const { available, error } = resultObject;
        if (error) {
            Alert.alert('Please enable biometric in Setting');
        } else if (available) {
            const result = await rnBiometrics.simplePrompt({ promptMessage: 'Confirm biometric' });
            const { success } = result;
            if (success) {
                await Keychain.setGenericPassword(username, password, {
                    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
                    authenticationPrompt: {
                        title: 'Biometric authentication',
                        subtitle: 'Please login to get access',
                        description: 'My App is using Android biometric authentication',
                        cancel: 'Cancel',
                    },
                });
            }
        }
    } catch (error) {
        console.error('enableBiometricError:', error);
    }
};

export const disableBiometric = async () => {
    try {
        await Keychain.resetGenericPassword();
    } catch (error) {
        console.error('disableBiometricEror:', error);
    }
};

export const loginWithBiometric = async () => {
    try {
        const options = {
            authenticationPrompt: {
                title: 'Biometric authentication',
                subtitle: 'Please login to get access',
                description: 'My App is using Android biometric authentication',
                cancel: 'Use app password',
            },
        };
        const credentials = await Keychain.getGenericPassword(options);
        if (credentials) {
            const { username, password } = credentials;
            console.log('login success', { username, password });
            // handle login with username, password
        } else {
            // Todo
        }
    } catch (error) {
        console.error('loginWithBiometricError:', error);
    }
};
