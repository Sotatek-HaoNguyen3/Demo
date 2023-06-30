
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { scale } from 'themes/scales';

export interface MenuItemProps {
    name?: string
}

interface Props {
    onPress?: () => void;
    item?: MenuItemProps;
}

const MenuItem = (props: Props) => {
    const {item} = props
    const styles = myStyles();
    return (
        <TouchableOpacity style={styles.btn} onPress={props.onPress}>
            <View style={styles.viewItem}>
                <Text style={styles.textItem}>{(item?.name && item.name) || ''}</Text>
            </View>
        </TouchableOpacity>
    );
};

const myStyles = () =>
    StyleSheet.create({
        btn: {
            flexDirection: 'row',
            backgroundColor: 'white',
            alignItems: 'center',
            paddingHorizontal: scale(20),
            paddingVertical: scale(8),
        },
        viewItem: {
            flex: 1,
            flexDirection: 'row',
        },
        textItem: {
            color: 'black',
            fontSize: scale(14),
        },
    });

export default React.memo(MenuItem);
