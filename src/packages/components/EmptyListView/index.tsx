import React, { memo } from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { scale } from 'themes/scales';

interface EmptyViewProps {
    message?: string;
    containerStyles?: ViewStyle;
    image?: ImageSourcePropType;
}

const EmptyListView: React.FC = (props: EmptyViewProps) => {
    const styles = myStyles();
    const { image, message } = props;

    return (
        <View style={[styles.emptyView, props?.containerStyles]}>
            {image && (
                <Image
                    source={image}
                    style={styles.imageView}
                />
            )}
            <Text style={styles.emptyText}>{message ? message :'No Record'}</Text>
        </View>
    );
};

export default memo(EmptyListView);

const myStyles = () => StyleSheet.create({
    emptyView: {
        alignItems: 'center',
        paddingVertical: scale(100),
    },
    emptyText: {
        fontSize: scale(14),
        color: 'rgba(0, 0, 0, 0.5)',
    },
    imageView: {
        width: scale(120),
        height: scale(120),
    },
});
