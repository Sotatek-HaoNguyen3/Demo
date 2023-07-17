/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Path } from 'react-native-svg';

import { ICircleProps } from '../types';

function makeCirclePath(x, y, radius, direction) {
    const reverseFlag = direction === 'counter-clockwise' ? 0 : 1;

    return `M${x} ${y}
          m${radius} 0
          a${radius} ${radius} 0 0 ${reverseFlag} 0 ${radius * 2}
          a${radius} ${radius} 0 0 ${reverseFlag} 0 ${radius * -2}`;
}

export default class Circle extends Component<ICircleProps> {
    static propTypes = {
        radius: PropTypes.number.isRequired,
        offset: PropTypes.shape({
            top: PropTypes.number,
            left: PropTypes.number,
        }),
        strokeWidth: PropTypes.number,
        direction: PropTypes.oneOf(['clockwise', 'counter-clockwise']),
    };

    static defaultProps = {
        offset: { top: 0, left: 0 },
        strokeWidth: 0,
        direction: 'clockwise',
    };

    render() {
        const { radius, offset, strokeWidth, direction, ...restProps } = this.props;
        const path = makeCirclePath(
            (offset.left || 0) + strokeWidth / 2,
            (offset.top || 0) + strokeWidth / 2,
            radius - strokeWidth / 2,
            direction
        );
        return <Path d={path} strokeLinecap="butt" strokeWidth={strokeWidth} {...restProps} />;
    }
}
