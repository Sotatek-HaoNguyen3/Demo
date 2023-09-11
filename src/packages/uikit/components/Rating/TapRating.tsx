import _ from 'lodash';

import React, { useEffect, useState } from 'react';

import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import Star from './components/Star';

export type TapRatingProps = {
    /**
     * Total number of ratings to display.
     *
     * @default 5
     */
    count?: number;

    /**
     * Labels to show when each value is tapped.
     *
     * e.g. If the first star is tapped, then value in index 0 will be used as the label.
     *
     * @default ['Terrible', 'Bad', 'Okay', 'Good', 'Great']
     */
    reviews?: string[];

    /**
     * Determines if to show the reviews above the rating.
     *
     * @default true
     */
    showRating?: boolean;

    /**
     * Color value for review.
     *
     * @default #f1c40f
     */
    reviewColor?: string;

    /**
     * Size value for review.
     *
     * @default 40
     */
    reviewSize?: number;

    /**
     * Initial value for the rating
     *
     * @default 3
     */
    defaultRating?: number;

    /**
     * Style for star container
     *
     * @default undefined
     */
    starContainerStyle?: StyleProp<ViewStyle>;

    /**
     * Style for rating container
     *
     * @default undefined
     */
    ratingContainerStyle?: StyleProp<ViewStyle>;

    /**
     * Callback method when the user finishes rating. Gives you the final rating value as a whole number
     */
    onFinishRating?: (number) => void;

    /**
     * Whether the rating can be modiefied by the user
     *
     * @default false
     */
    isDisabled?: boolean;

    /**
     * Color value for filled stars.
     *
     * @default #004666
     */
    selectedColor?: string;

    /**
     * Size of rating image
     *
     * @default 40
     */
    size?: number;

    /**
     * Pass in a custom base image source
     */
    starImage?: string;
};

const TapRating: React.FunctionComponent<TapRatingProps> = (props) => {
    const [position, setPosition] = useState<number>(props.defaultRating);

    useEffect(() => {
        const { defaultRating } = props;

        if (defaultRating === null || defaultRating === undefined) {
            setPosition(3);
        } else {
            setPosition(defaultRating);
        }
    }, [props.defaultRating]);

    const renderStars = (rating_array) => {
        return _.map(rating_array, (star) => {
            return star;
        });
    };

    const starSelectedInPosition = (pos) => {
        const { onFinishRating } = props;

        if (typeof onFinishRating === 'function') {
            onFinishRating(pos);
        }

        setPosition(pos);
    };

    const { count, reviews, showRating, reviewColor, reviewSize } = props;
    const rating_array = [];

    _.times(count, (index) => {
        rating_array.push(
            <Star
                key={index}
                position={index + 1}
                starSelectedInPosition={(value) => {
                    starSelectedInPosition(value);
                }}
                fill={position >= index + 1}
                {...props}
            />
        );
    });

    return (
        <View style={[styles.ratingContainer, props?.ratingContainerStyle]}>
            {showRating && (
                <Text style={[styles.reviewText, { fontSize: reviewSize, color: reviewColor }]}>
                    {reviews[position - 1]}
                </Text>
            )}
            <View style={[styles.starContainer, props.starContainerStyle]}>{renderStars(rating_array)}</View>
        </View>
    );
};

TapRating.defaultProps = {
    defaultRating: 3,
    reviews: ['Terrible', 'Bad', 'Okay', 'Good', 'Great'],
    count: 5,
    showRating: true,
    reviewColor: 'rgba(230, 196, 46, 1)',
    reviewSize: 25,
};

const styles = StyleSheet.create({
    ratingContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewText: {
        fontWeight: 'bold',
        margin: 10,
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TapRating;
