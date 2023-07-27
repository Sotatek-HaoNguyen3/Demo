import { useWindowDimensions } from 'react-native';

import useTheme from './useTheme';
import { PropValue, ResponsiveBaseTheme, ResponsiveValue } from '../types';
import { getValueForScreenSize, isResponsiveObjectValue } from '../utilities';

const useResponsiveProp = <Theme extends ResponsiveBaseTheme, TVal extends PropValue>(
    propValue: ResponsiveValue<TVal, Theme['breakpoints']>
) => {
    const theme = useTheme<Theme>();
    const dimensions = useWindowDimensions();

    return isResponsiveObjectValue(propValue, theme)
        ? getValueForScreenSize({
              responsiveValue: propValue,
              breakpoints: theme.breakpoints,
              dimensions,
          })
        : propValue;
};

export default useResponsiveProp;
