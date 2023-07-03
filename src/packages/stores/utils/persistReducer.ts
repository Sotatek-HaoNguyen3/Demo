import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import { Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { encryptTransform } from 'redux-persist-transform-encrypt';

export function persistReducerUtil(key: string, reducer: Reducer, whitelist?: string[], sensitiveInfoWhitelist?: string[], version: number = -1): Reducer {
    const transforms = [
        encryptTransform (
            {
                secretKey: Config?.ENCRYPTION_KEY ? Config.ENCRYPTION_KEY! : 'a769504dead7ff32b18d34953510c97972d0ddf4bca6ab66c2818987136d05f5',
                onError: (_error: Error) => {
                    // TODO
                },
            },
            {
                whitelist: sensitiveInfoWhitelist,
            }
        ),
    ];

    const persistConfig = {
        storage: AsyncStorage,
        key,
        whitelist,
        debug: __DEV__,
        transforms,
        stateReconciler: autoMergeLevel2,
        version,
    };

    return persistReducer(persistConfig, reducer);
}
