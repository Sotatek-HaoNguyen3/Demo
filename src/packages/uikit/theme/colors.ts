export type ICustomColor = {
    [key: string]: string;
}

export const baseColors = (customColor: ICustomColor) => {
    return {
        transparent: 'transparent',
        black: '#000000',
        white: '#FFFFFF',
        bgScan: '#FFFFFF3D',
        gray: '#999999',
        gray1: '#888888',
        gray2: '#F2F2F2',
        gray3: '#424754',
        gray4: '#F8F8F8',
        gray5: '#BEBEBE',
        gray6: '#EBEBEB',
        gray7: '#E2E2E2',
        d3d3d3: '#D3D3D3',
        failure: '#ED4B9E',
        failure33: '#ED4B9E33',
        primary: '#1FC7D4',
        primary0f: '#1FC7D40f',
        primary3D: '#1FC7D43D',
        primaryBright: '#53DEE9',
        primaryDark: '#0098A1',
        success: '#31D0AA',
        success19: '#31D0AA19',
        warning: '#FFB237',
        warning2D: '#ED4B9E2D',
        warning33: '#ED4B9E33',
        blackOpacity80: 'rgba(0, 0, 0, 0.8)',
        ...customColor,
    } as const;
};

export const lightColors = (customColor: ICustomColor) => {
    return {
        secondary: '#7645D9',
        secondary80: '#7645D980',
        background: '#FAF9FA',
        backgroundDisabled: '#E9EAEB',
        backgroundAlt: '#FFFFFF',
        backgroundAlt2: 'rgba(255, 255, 255, 0.7)',
        cardBorder: '#E7E3EB',
        contrast: '#191326',
        dropdown: '#F6F6F6',
        dropdownDeep: '#EEEEEE',
        invertedContrast: '#FFFFFF',
        input: '#eeeaf4',
        inputSecondary: '#d7caec',
        tertiary: '#EFF4F5',
        text: '#280D5F',
        text99: '#280D5F99',
        textDisabled: '#BDC2C4',
        textSubtle: '#7A6EAA',
        disabled: '#E9EAEB',
        ...customColor,
    } as const;
};

export const darkColors = (customColor: ICustomColor) => {
    return {
        secondary: '#9A6AFF',
        secondary80: '#9A6AFF80',
        background: '#08060B',
        backgroundDisabled: '#3c3742',
        backgroundAlt: '#27262c',
        backgroundAlt2: 'rgba(39, 38, 44, 0.7)',
        cardBorder: '#383241',
        contrast: '#FFFFFF',
        dropdown: '#1E1D20',
        dropdownDeep: '#100C18',
        invertedContrast: '#191326',
        input: '#372F47',
        inputSecondary: '#262130',
        primaryDark: '#0098A1',
        tertiary: '#353547',
        text: '#F4EEFF',
        text99: '#F4EEFF99',
        textDisabled: '#666171',
        textSubtle: '#B8ADD2',
        disabled: '#524B63',
        ...customColor,
    } as const;
};