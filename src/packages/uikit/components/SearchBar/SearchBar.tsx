import React from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { scale } from 'themes/scales';

const SearchBar = () => {
    const styles = myStyles;
    <View style={styles.viewInput}>
        <TextInput
            style={styles.inputStyle}
            placeholder={'Search'}
            selectionColor={'#64748B'}
            value={''}
            onChangeText={() => {}}
            placeholderTextColor={'#A3A3A3'}
            maxLength={100}
        />
    </View>;
};

export default SearchBar;

const myStyles = StyleSheet.create({
    viewInput: {
        flexDirection: 'row',
        alignItems: 'center',
        height: scale(48),
        paddingHorizontal: scale(17.5),
        backgroundColor: 'gray',
        borderRadius: scale(4),
        marginTop: scale(20),
    },
    inputStyle: {
        padding: 0,
        margin: 0,
        fontSize: scale(14),
        color: 'black',
        marginLeft: scale(9.5),
        flex: 1,
        height: scale(48),
    },
});
