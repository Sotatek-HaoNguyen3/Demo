import React, { useCallback, useMemo, useState } from 'react';

import HybridContext from './HybridContext';
import { IColorModeProviderProps } from '../color-mode';
import { useModeManager } from '../color-mode/hooks';

const HybridProvider = ({
    children,
    options: { initialColorMode = 'light', useSystemColorMode },
    colorModeManager,
}: IColorModeProviderProps) => {
    const { mode, setColorMode } = useModeManager(initialColorMode, useSystemColorMode, colorModeManager);

    const toggleColorMode = useCallback(() => {
        setColorMode(mode === 'light' ? 'dark' : 'light');
    }, [mode, setColorMode]);

    // handle set colors mode
    const contextValue = useMemo(() => {
        return {
            colorMode: {
                mode,
                toggleColorMode,
                setColorMode,
            },
        };
    }, [mode, toggleColorMode, setColorMode]);
    return <HybridContext.Provider value={contextValue}>{children}</HybridContext.Provider>;
};

export default HybridProvider;
