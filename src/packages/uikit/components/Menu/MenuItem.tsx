import React, { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native';

import { scale } from 'themes/scales';

export interface MenuItemProps {
    name?: string;
    icon?: ReactElement<ViewProps>;
}

interface Props {
    onPress?: () => void;
    item?: MenuItemProps;
}

const MenuItem = (props: Props) => {
    const { item } = props;
    const styles = myStyles();
    return (
        <TouchableOpacity style={styles.btn} onPress={props.onPress}>
            {item?.icon && <View style={styles.viewIcon} />}
            <View style={styles.viewItem}>
                <Text style={styles.textItem}>{item?.name ? item.name : ''}</Text>
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
            alignItems: 'center',
        },
        textItem: {
            color: 'black',
            fontSize: scale(14),
        },
        viewIcon: {
            backgroundColor: 'gray',
            width: scale(12),
            height: scale(12),
            marginHorizontal: scale(10),
        },
    });

export default React.memo(MenuItem);
