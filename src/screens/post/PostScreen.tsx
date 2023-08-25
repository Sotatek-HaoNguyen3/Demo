import React, { useMemo, useState } from 'react';

import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Svgs from 'assets/svgs';
import { useThemeColors } from 'packages/hooks/useTheme';
import { AppBar, Avatar, IColors } from 'packages/uikit';

import { HitSlop } from 'themes/dimensions';
import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';
import { goBack } from 'utils/navigationUtils';

const PostScreen = () => {
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [showOption, setShowOption] = useState<boolean>(false);
    const [content, setContent] = useState<string>('');
    const IconMode = useMemo(() => {
        const Icon = Svgs[`Ic${isPrivate ? 'Private' : 'Public'}`];
        return Icon;
    }, [isPrivate]);
    const IconArrow = useMemo(() => {
        const Icon = Svgs[`Ic${showOption ? 'ArrowUp' : 'ArrowDown'}`];
        return Icon;
    }, [isPrivate]);
    const renderHeader = () => {
        const IconBack = Svgs[`IcBack`];
        return (
            <View style={styles.header}>
                <TouchableOpacity style={styles.backView} onPress={() => goBack()} hitSlop={HitSlop.default}>
                    <IconBack width={scale(34)} height={scale(34)} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Create Post</Text>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <AppBar style={styles.headerView} left={renderHeader()} />
            <View style={styles.content}>
                <View style={styles.userInfor}>
                    <Avatar size={scale(50)} />
                    <View style={styles.rightInfo}>
                        <Text style={styles.nameText}>Maxwell Kim</Text>
                        <TouchableOpacity style={styles.postMode}>
                            <IconMode width={scale(16)} height={scale(16)} />
                            <Text>Public</Text>
                            <IconArrow width={scale(16)} height={scale(16)} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TextInput
                    style={styles.contentInput}
                    value={content}
                    onChangeText={setContent}
                    placeholder="Type Here..."
                    multiline={true}
                    autoFocus={false}
                />
            </View>
        </View>
    );
};

export default PostScreen;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: themeColors.backgroundAlt,
            paddingHorizontal: scale(16),
        },
        titleText: {
            color: themeColors.subText,
            ...Fonts.poppins700,
            fontWeight: '700',
            fontSize: scale(20),
        },
        backView: {
            marginRight: scale(22),
        },
        headerView: {
            paddingLeft: scale(1),
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        content: {
            borderWidth: scale(1),
            borderColor: themeColors.blackOpacity10,
            width: '100%',
            minHeight: scale(500),
            borderRadius: scale(12),
            padding: scale(10),
            marginTop: scale(20),
        },
        userInfor: {
            flexDirection: 'row',
            alignItems: 'center',
            height: scale(60),
            marginBottom: scale(8),
        },
        rightInfo: {
            marginLeft: scale(12),
            justifyContent: 'space-between',
            height: '100%',
            paddingVertical: scale(8),
        },
        postMode: {
            borderWidth: scale(1),
            borderColor: themeColors.blackOpacity10,
            borderRadius: scale(4),
            height: scale(20),
            width: scale(80),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        nameText: {
            ...Fonts.poppins400,
            fontWeight: '400',
            fontSize: scale(14),
        },
        contentInput: {
            width: '100%',
        },
    });
};
