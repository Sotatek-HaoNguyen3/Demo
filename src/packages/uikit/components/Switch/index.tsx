import React, { useRef, useState } from 'react';
import { Animated, Text, TouchableWithoutFeedback, View } from 'react-native';

interface IProps {
    onPress?: () => void;
    initialState?: boolean;
}

const Switch = ({ onPress, initialState }: IProps) => {
    const animation = useRef(new Animated.Value(!!initialState ? 1 : 0)).current;
    const [toggled, setToggled] = useState(!!initialState);
    const [containerWidth, setContainerWidth] = useState(0);

    return (
        <View>
            <Text>Switch</Text>
        </View>
    );
};

export default Switch;
