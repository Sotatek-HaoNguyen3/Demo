import { t } from 'i18next';
import { Platform } from 'react-native';
import { check, openSettings, Permission, request, RESULTS } from 'react-native-permissions';

import Images from 'assets/images';

const showDialog = (permissionText: string) => {
    // DialogUtil.showMessageDialog({
    //     type: DialogType.two,
    //     icon: Images.CONFIRMATION,
    //     title: t('permission.title'),
    //     message: t(`permission.${permissionText}`),
    //     textButtonConfirm: t('permission.confirm'),
    //     onConfirm: onOpenSetting,
    // }).catch((_err) => {
    //     // TODO
    // });
    onOpenSetting();
};

const onOpenSetting = () => {
    // DialogUtil.dismiss();
    // openSettings().catch(() => {
    //     showCustomToastError(t('permission.openSettingError'));
    // });
    console.log('error');
};

export const checkPermission = async (
    permission: Permission,
    onAuthorized: () => void,
    permissionText: string,
    onDenied?: () => void
) => {
    try {
        const response: string = await check(permission);
        if (response === RESULTS.GRANTED || response === RESULTS.LIMITED) {
            onAuthorized();
        } else if (response === RESULTS.BLOCKED || (response === RESULTS.DENIED && Platform.OS === 'android')) {
            showDialog(permissionText);
            if (onDenied) {
                onDenied();
            }
        } else {
            const status = await request(permission);
            if (status === RESULTS.GRANTED) {
                onAuthorized();
            } else {
                if (onDenied) {
                    onDenied();
                }
            }
        }
    } catch (error) {
        // showCustomToastError(t('permission.checkPermissionError'));
        console.log('error');
    }
};
