import colors from './colors';
import opacity from './opacity';
import radii from './radius';
import shadows from './shadows';

const theme = {
    colors,
    radii,
    shadows,
    opacity,
};

export const themePropertyMap = {
    borderRadius: 'radii',
    color: 'colors',
    border: 'borders',
    shadow: 'shadows',
};

export default theme;
