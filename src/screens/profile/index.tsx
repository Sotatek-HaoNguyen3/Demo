import auth from '@react-native-firebase/auth';
import React, { useContext, useMemo } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import MenuItem from './components/MenuItem';

import { HybridContext } from 'packages/core/hybrid-overlay';
import { useThemeColors } from 'packages/hooks/useTheme';
import { Avatar, IColors, Switch } from 'packages/uikit';

import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';
import { resetStack } from 'utils/navigationUtils';

const ProfileScreen = () => {
    const colors = useThemeColors();
    const styles = Styles(colors);
    const { colorMode } = useContext(HybridContext);
    const { toggleColorMode, mode } = colorMode;
    const IconMode = useMemo(() => {
        const name = `${mode === 'dark' ? 'LightMode' : 'DarkMode'}`;
        return name;
    }, [mode]);

    const handleLogout = async () => {
        auth()
            .signOut()
            .then(() => {
                resetStack('Login');
                console.log('User signed out!');
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.inforContainer}>
                <Avatar />
                <Text style={styles.nameText}>Jose Phonie</Text>
                <Text>JosePhonie123@gmail.com</Text>
            </View>
            <MenuItem
                iconLeft={IconMode}
                title={`${mode === 'dark' ? 'Light' : 'Dark'} Mode`}
                right={
                    <Switch
                        trackColor={{
                            active: colors.backgroundDisabled,
                            inActive: colors.backgroundDisabled,
                        }}
                        thumbColor={colors.secondary}
                        onChange={toggleColorMode}
                        value={mode === 'dark'}
                        size={50}
                    />
                }
            />
            <MenuItem onPress={handleLogout} iconLeft={'LogOut'} title={`Log Out`} />
        </View>
    );
};

export default ProfileScreen;

const Styles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: scale(20),
            paddingTop: Sizes.statusBarHeight,
        },
        headerView: {
            paddingLeft: scale(1),
        },
        inforContainer: {
            height: '30%',
            width: '100%',
            alignItems: 'center',
            paddingVertical: scale(32),
        },
        nameText: {
            ...Fonts.poppins600,
            fontWeight: '600',
            fontSize: scale(16),
            paddingVertical: scale(8),
        },
        menuText: {
            ...Fonts.poppins400,
            fontWeight: '500',
            fontSize: scale(14),
            marginLeft: scale(12),
        },
        menuContainer: {
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
        },
        leftMenu: {
            flexDirection: 'row',
            width: '50%',
            alignItems: 'center',
        },
        rightMenu: {
            width: '50%',
            alignItems: 'flex-end',
        },
    });
};
