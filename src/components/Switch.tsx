import React from 'react';
import { StyleSheet } from 'react-native';
import { Switch, SwitchProps } from 'react-native-switch';

import { useSetting } from 'contexts/SettingProvider';
import { scale } from 'themes/scales';

interface SwitchBaseProps extends SwitchProps {
    onValueChange: () => void;
    value: boolean;
}

const SwitchComponent = (props: SwitchBaseProps) => {
    // const { theme } = useSetting();
    const styles = myStyles();
    const { onValueChange, value } = props;

    return (
        <Switch
            value={value}
            onValueChange={onValueChange}
            circleSize={18}
            backgroundActive={'crimson'}
            backgroundInactive={'cyan'}
            renderActiveText={false}
            renderInActiveText={false}
            innerCircleStyle={styles.innerCircleStyle}
            circleActiveColor={'lightgreen'}
            circleInActiveColor={'darkblue'}
            {...props}
        />
    );
};

export default SwitchComponent;

const myStyles = () => StyleSheet.create({
    innerCircleStyle: {
        width: scale(9),
        height: scale(9),
        // borderColor: Colors[theme].bgColor,
    },
});
