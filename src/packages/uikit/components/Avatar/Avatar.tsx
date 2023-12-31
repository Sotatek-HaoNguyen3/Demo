import React, { memo } from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, TouchableOpacity, View } from 'react-native';

import { scale } from 'themes/scales';

export interface AvatarProps {
    source?: ImageSourcePropType;
    imageStyles?: StyleProp<ImageStyle>;
    size?: number;
    onPress?: () => void;
    isCircle?: boolean;
}

const Avatar = (props: AvatarProps) => {
    const { source, imageStyles, size, onPress, isCircle = true } = props;
    return (
        <TouchableOpacity disabled={!onPress} onPress={onPress}>
            {source ? (
                <Image
                    style={[
                        {
                            width: scale(size || 80),
                            height: scale(size || 80),
                            borderRadius: isCircle ? scale(size / 2 || 40) : 0,
                        },
                        imageStyles,
                    ]}
                    source={source}
                    resizeMode="stretch"
                />
            ) : (
                <View
                    style={[
                        {
                            width: scale(size || 80),
                            height: scale(size || 80),
                            borderRadius: isCircle ? scale(size / 2 || 40) : 0,
                            backgroundColor: 'black',
                            opacity: 0.1,
                        },
                        imageStyles,
                    ]}
                />
            )}
        </TouchableOpacity>
    );
};

export default memo(Avatar);
