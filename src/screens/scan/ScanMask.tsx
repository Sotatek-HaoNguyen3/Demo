import React from 'react';
import { Defs, Mask, Rect, Svg } from 'react-native-svg';

const ScanMask = ({ windowWidth, windowHeight, scanSize, xPos, yPos, borderRadius, bgColor = 'rgba(0, 0, 0,0.6)' }) => (
    <Svg height="100%" width="100%" viewBox={`0 0 ${windowWidth} ${windowHeight}`} fill="none">
        <Defs>
            <Mask id="mask" x="0" y="0" height="100%" width="100%">
                <Rect height="100%" width="100%" fill="#fff" />
                <Rect x={xPos} y={yPos} height={scanSize} width={scanSize} rx={borderRadius} />
            </Mask>
        </Defs>
        <Rect height="100%" width="100%" fill={bgColor} mask="url(#mask)" fill-opacity="0" />
    </Svg>
);

export default ScanMask;
