import React, { useMemo, useRef, useState } from 'react';

import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Svgs from 'assets/svgs';
import { useThemeColors } from 'packages/hooks/useTheme';
import { AppBar, Avatar, BaseModal, IColors } from 'packages/uikit';

import { HitSlop } from 'themes/dimensions';
import Fonts from 'themes/fonts';
import { scale } from 'themes/scales';
import { goBack } from 'utils/navigationUtils';

const PostScreen = () => {
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const dropdownButtonRef = useRef(null);
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState<string>('');
    const [dropdownTop, setDropdownTop] = useState(0);
    const [dropdownLeft, setDropdownLeft] = useState(0);
    const IconMode = useMemo(() => {
        const Icon = Svgs[`Ic${isPrivate ? 'Private' : 'Public'}`];
        return Icon;
    }, [isPrivate]);
    const IconArrow = useMemo(() => {
        const Icon = Svgs[`Ic${visible ? 'ArrowUp' : 'ArrowDown'}`];
        return Icon;
    }, [visible]);
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
    const toggleDropdown = (): void => {
        visible ? setVisible(false) : openDropdown();
    };
    const onPressItem = (val) => {
        setVisible(false);
        setIsPrivate(val === 1);
    };

    const openDropdown = (): void => {
        dropdownButtonRef?.current.measure((_fx, _fy, _w, h, _px, py) => {
            setDropdownTop(py + h);
            setDropdownLeft(_px + scale(1));
        });
        setVisible(true);
    };

    const data = [
        { label: 'Public', value: 0, icon: 'IcPublic' },
        { label: 'Private', value: 1, icon: 'IcPrivate' },
    ];

    const renderItem = ({ item }) => {
        const Icon = Svgs[item.icon];
        return (
            <TouchableOpacity style={styles.item} onPress={() => onPressItem(item.value)}>
                <View style={styles.dropdownIcon}>
                    <Icon width={scale(16)} height={scale(16)} />
                </View>
                <View>
                    <Text style={styles.dropdownText}>{item.label}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderDropDown = () => {
        return (
            <Modal visible={visible} transparent animationType="none">
                <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
                    <View style={[styles.dropdown, { top: dropdownTop, left: dropdownLeft }]}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
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
                        <TouchableOpacity ref={dropdownButtonRef} style={styles.postMode} onPress={toggleDropdown}>
                            <IconMode width={scale(16)} height={scale(16)} />
                            <Text style={styles.textMode}>{isPrivate ? 'Private' : 'Public'}</Text>
                            <IconArrow width={scale(16)} height={scale(16)} />
                            {renderDropDown()}
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
            width: scale(90),
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: scale(4),
        },
        textMode: {
            marginHorizontal: scale(6),
            ...Fonts.poppins400,
            fontWeight: '400',
            fontSize: scale(12),
        },
        nameText: {
            ...Fonts.poppins400,
            fontWeight: '400',
            fontSize: scale(14),
        },
        contentInput: {
            width: '100%',
        },
        overlay: {
            width: '100%',
            height: '100%',
        },
        dropdown: {
            position: 'absolute',
            backgroundColor: themeColors.backgroundAlt,
            width: scale(88),
            shadowColor: '#000000',
            shadowRadius: 4,
            shadowOffset: { height: 4, width: 0 },
            shadowOpacity: 0.3,
        },
        item: {
            height: scale(20),
            width: scale(88),
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: scale(4),
        },
        dropdownIcon: {
            alignItems: 'center',
            // backgroundColor: 'red',
            marginRight: scale(6),
        },
        dropdownText: {
            ...Fonts.poppins400,
            fontWeight: '400',
            fontSize: scale(12),
        },
    });
};
