import { useContext } from 'react';

import { ThemeContext } from '../context';
import { BaseTheme } from '../types';

const useTheme = <Theme extends BaseTheme = BaseTheme>() => useContext(ThemeContext) as Theme;

export default useTheme;
