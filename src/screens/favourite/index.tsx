import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import PeopleFollow from './PeopleFollow';
import PostSave from './PostSave';
import { RoutesTabFavorite, TabFavorite } from './src/constant';
import { useThemeColors } from 'packages/hooks/useTheme';
import { IColors } from 'packages/uikit';
import { scale } from 'themes/scales';
import Sizes from 'themes/sizes';
import Fonts from 'themes/fonts';

const renderScene = SceneMap({
    [TabFavorite.People]: PeopleFollow,
    [TabFavorite.Post]: PostSave,
});

const FavouriteScreen = () => {
    const color = useThemeColors();
    const styles = myStyles(color);

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState(RoutesTabFavorite);

    const renderTabItem = (props) => {
        const { title } = props.route;
        const { focused } = props;

        return (
            <Text style={[styles.labelTabText, focused ? { color: color.main } : {}]} numberOfLines={2}>
                {title}
            </Text>
        );
    };

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            style={styles.tabContainer}
            indicatorStyle={[styles.indicatorContainer, index === 0 ? { width: scale(33) } : { width: scale(48) }]}
            renderLabel={renderTabItem}
            pressColor={color.background}
            pressOpacity={0.7}
            tabStyle={styles.tabBar}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Favorites</Text>
            <TabView
                lazy
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: scale(140) }}
                renderTabBar={renderTabBar}
            />
        </View>
    );
};

export default FavouriteScreen;

const myStyles = (themeColors: IColors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: Sizes.statusBarHeight,
            paddingHorizontal: scale(15),
            backgroundColor: themeColors.white,
        },
        labelTabText: {
            fontSize: scale(14),
            color: themeColors.blackOpacity80,
            ...Fonts.poppins400,
            width: scale(64),
            height: scale(24),
        },
        indicatorContainer: {
            backgroundColor: themeColors.main,
            height: scale(1),
            marginLeft: scale(2),
        },
        tabBar: {
            minHeight: 0,
            paddingBottom: scale(6),
        },
        tabContainer: {
            backgroundColor: themeColors.transparent,
            shadowColor: 'transparent',
            borderBottomWidth: scale(1),
            borderColor: themeColors.transparent,
            width: scale(140),
        },
        title: {
            ...Fonts.poppins700,
            fontSize: scale(20),
            marginBottom: scale(20),
            marginTop: scale(10),
        },
    });
};
