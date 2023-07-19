import React, { useEffect, useState } from 'react';

import { Image, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

import { ISearchBarProps } from './types';

import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors, theme } from 'packages/uikit/theme';
import { scale } from 'themes/scales';
import { useDebounce } from 'packages/hooks';

const SearchBar = (props: ISearchBarProps & TextInputProps) => {
    const colors = useThemeColors();
    const styles = myStyles(colors);
    const {
        containerStyle,
        leftStyle,
        rightStyle,
        inputStyle,
        placeholderTextColor = colors.textDisabled,
        placeholder = 'Search',
        hideLeft = false,
        hideRight = false,
        left,
        right,
        handleSearch = (value: string) => {},
        ...rest
    } = props;
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce<string>(value, 500);

    useEffect(() => {
        handleSearchValue();
    }, [debouncedValue]);

    const handleSearchValue = () => {
        handleSearch(debouncedValue);
    };

    const renderLeft = () => {
        if (hideLeft) {
            return null;
        } else {
            if (left) {
                return left;
            }
            return <Image style={[styles.viewIcon, leftStyle]} source={require('./search.png')} />;
        }
    };

    const renderRight = () => {
        if (hideRight) {
            return null;
        } else {
            if (right) {
                return right;
            }
            return (
                <TouchableOpacity style={styles.closeContainer} onPress={() => setValue('')}>
                    <Image style={[styles.iconClose, rightStyle]} source={require('./close.png')} />
                </TouchableOpacity>
            );
        }
    };

    return (
        <View style={[styles.viewInput, containerStyle]}>
            {renderLeft()}
            <TextInput
                style={[styles.inputStyle, inputStyle]}
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                placeholderTextColor={placeholderTextColor}
                {...rest}
            />
            {renderRight()}
        </View>
    );
};

export default SearchBar;

const myStyles = (themeColors: IColors) =>
    StyleSheet.create({
        viewIcon: {
            height: scale(20),
            width: scale(20),
            tintColor: themeColors.secondary,
        },
        viewInput: {
            flexDirection: 'row',
            alignItems: 'center',
            height: scale(48),
            paddingHorizontal: scale(17.5),
            backgroundColor: themeColors.backgroundDisabled,
            borderRadius: scale(4),
            marginTop: scale(20),
        },
        inputStyle: {
            padding: 0,
            margin: 0,
            fontSize: scale(14),
            marginHorizontal: scale(4),
            flex: 1,
            height: scale(48),
        },
        closeContainer: {
            backgroundColor: themeColors.backgroundAlt,
            padding: scale(4),
            borderRadius: scale(10),
            ...theme.shadows[2],
        },
        iconClose: {
            height: scale(12),
            width: scale(12),
            tintColor: themeColors.secondary,
        },
    });
