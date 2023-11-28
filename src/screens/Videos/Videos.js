import React, { useCallback, useState } from 'react';
import { ScrollView, ImageBackground, StyleSheet, View, Dimensions, Text } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

const { width } = Dimensions.get('window');

const videos = [
    { id: 'Rdc8_fpxC3U', title: 'Video 1' },
    { id: 'T43uHajxfno', title: 'Video 2' },
    { id: 'ja96W3ogBbM', title: 'Video 3' },
    { id: 'iAZA4yX0mf4', title: 'Video 4' },
    { id: '21mDekTZwsw', title: 'Video 5' },
];

export default function YoutubeVideo() {
    const [playing, setPlaying] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(videos[0].title);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    const renderVideoItem = (item, index) => (
        <View key={index} style={{ width: width }}>
            <ImageBackground style={{ flex: 1, justifyContent: 'center' }} source={{ uri: 'https://seculoxximinas.com.br/fgv/wp-content/uploads/2018/12/Webp.net-compress-image-20.jpg' }}>
                <YoutubePlayer
                    height={300}
                    play={playing}
                    videoId={item.id}
                    onChangeState={onStateChange}
                />
            </ImageBackground>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <Text style={[styles.title, { backgroundColor: '#6c4ab6' }]}>{currentTitle}</Text>
            <ScrollView
                horizontal
                pagingEnabled
                style={{ flex: 1 }}
                onMomentumScrollEnd={(event) => {
                    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                    setCurrentTitle(videos[pageIndex].title);
                }}
            >
                {videos.map((video, index) => renderVideoItem(video, index))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: 'white',  // Adiciona a cor do texto (opcional)
    },
});
