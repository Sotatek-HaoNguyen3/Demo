import { useBaseConfig } from 'packages/core/BaseContext';

export function useTheme() {
    const theme = useBaseConfig('useTheme').theme;
    if (!theme) {
        throw Error('useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<BaseProvider />`');
    }
    return theme;
}
