import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import MenuItem, { MenuItemProps } from './MenuItem';
import FlatListView from '../FlatListView';


interface MenuProps {
    data: MenuItemProps[];
}

const Menu = (props: MenuProps) => {
    const styles = myStyles();
    const { data } = props;
    const renderItem = ({ item }) => <MenuItem item={item} />;

    return (
        <View style={styles.container}>
            <FlatListView data={data} renderItem={renderItem}/>
        </View>
    );
};

export default memo(Menu);

const myStyles = () => StyleSheet.create({
    container: {
        backgroundColor: 'red',
    },
});
