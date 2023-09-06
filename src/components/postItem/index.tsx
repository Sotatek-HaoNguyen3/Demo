import React, { useMemo, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import Video from 'react-native-video';

import Svgs from 'assets/svgs';
import Sizes from 'themes/sizes';
import { scale } from 'themes/scales';

interface User {
    imageUri: string;
    username: string;
}

interface Song {
    name: string;
    imageUri: string;
}

interface PostProps {
    viewableItem: string;
    data: {
        id: string;
        likes: number;
        videoUri: string;
        user: User;
        song: Song;
        comments: string;
        shares: number;
        description: string;
    };
}

const PostItem = (props: PostProps) => {
    const { viewableItem } = props;
    const [post, setPost] = useState(props.data);
    const [isLiked, setIsLiked] = useState(false);
    const [idViewAble, setIdViewAble] = useState('');
    const [paused, setPaused] = useState(true);
    useMemo(() => {
        if (idViewAble !== viewableItem) {
            setIdViewAble(viewableItem);
        }
    }, [viewableItem]);

    useMemo(() => {
        if (post.id === idViewAble) {
            setPaused(false);
        } else if (!paused) {
            setPaused(true);
        }
    }, [idViewAble]);

    const onPlayPausePress = () => {
        setPaused(!paused);
    };

    const onLikePress = () => {
        const likesToAdd = isLiked ? -1 : 1;
        setPost({
            ...post,
            likes: post.likes + likesToAdd,
        });
        setIsLiked(!isLiked);
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={onPlayPausePress}>
                <View>
                    <Video
                        source={{ uri: props.data.videoUri }}
                        style={styles.video}
                        onError={(e) => console.log(e)}
                        resizeMode={'cover'}
                        repeat={true}
                        paused={paused}
                    />

                    <View style={styles.uiContainer}>
                        <View style={styles.rightContainer}>
                            <Image style={styles.profilePicture} source={{ uri: post.user.imageUri }} />

                            <TouchableOpacity style={styles.iconContainer} onPress={onLikePress}>
                                <Svgs.IcLike />
                                <Text style={styles.statsLabel}>{post.likes}</Text>
                            </TouchableOpacity>

                            <View style={styles.iconContainer}>
                                <Svgs.IcEye name={'commenting'} size={40} color="white" />
                                <Text style={styles.statsLabel}>{post.comments}</Text>
                            </View>

                            <View style={styles.iconContainer}>
                                <Svgs.IcArrowUp name={'share-a'} size={35} color="white" />
                                <Text style={styles.statsLabel}>{post.shares}</Text>
                            </View>
                        </View>

                        <View style={styles.bottomContainer}>
                            <View>
                                <Text style={styles.handle}>@{post.user.username}</Text>
                                <Text style={styles.description}>{post.description}</Text>

                                <View style={styles.songRow}>
                                    <Text style={styles.songName}>{post.song.name}</Text>
                                </View>
                            </View>

                            <Image style={styles.songImage} source={{ uri: post.song.imageUri }} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default PostItem;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Sizes.scrHeight,
    },
    videPlayButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 100,
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    uiContainer: {
        height: '100%',
        justifyContent: 'flex-end',
    },
    bottomContainer: {
        padding: scale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: scale(70),
    },
    handle: {
        color: '#fff',
        fontSize: scale(16),
        fontWeight: '700',
        marginBottom: scale(10),
    },
    description: {
        color: '#fff',
        fontSize: scale(16),
        fontWeight: '300',
        marginBottom: scale(10),
    },
    songRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    songName: {
        color: '#fff',
        fontSize: scale(16),
        marginLeft: scale(5),
    },

    songImage: {
        width: scale(50),
        height: scale(50),
        borderRadius: scale(25),
        borderWidth: scale(5),
        borderColor: '#4c4c4c',
    },

    //  right container
    rightContainer: {
        alignSelf: 'flex-end',
        height: scale(300),
        justifyContent: 'space-between',
        marginRight: scale(5),
    },
    profilePicture: {
        width: scale(50),
        height: scale(50),
        borderRadius: scale(25),
        borderWidth: scale(2),
        borderColor: '#fff',
    },

    iconContainer: {
        alignItems: 'center',
    },
    statsLabel: {
        color: '#fff',
        fontSize: scale(16),
        fontWeight: '600',
        marginTop: scale(5),
    },
});
