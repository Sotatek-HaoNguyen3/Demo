import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const _iconContainer = (size: number, checked: boolean, fillColor: string, unfillColor: string): ViewStyle => {
    return {
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: checked ? fillColor : unfillColor,
    };
};

export const _textStyle = (checked: boolean): TextStyle => {
    return {
        fontSize: 16,
        color: '#757575',
        textDecorationLine: checked ? 'line-through' : 'none',
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default StyleSheet.create<any>({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconImageStyle: {
        width: 10,
        height: 10,
    },
    textContainer: {
        marginLeft: 16,
    },
    iconContainer: (size: number, checked: boolean, fillColor: string, unfillColor: string, radius: number) => ({
        width: size,
        height: size,
        borderRadius: radius,
        backgroundColor: checked ? fillColor : unfillColor,
        alignItems: 'center',
        justifyContent: 'center',
    }),
    innerIconContainer: (size: number, fillColor: string, radius: number) => ({
        width: size,
        height: size,
        borderWidth: 1,
        borderColor: fillColor,
        borderRadius: radius,
        alignItems: 'center',
        justifyContent: 'center',
    }),
});
