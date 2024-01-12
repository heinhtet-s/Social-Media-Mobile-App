import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {
  FullScreenExitIcon,
  FullScreenIcon,
  PauseIcon,
  VolumeIcon,
  VolumeMuteIcon,
} from '../assets/images/svg';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue} from 'react-native-reanimated';
import {COLORS} from '../theme/theme';
import Orientation, {
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';
// import {
//   OrientationLocker,
//   PORTRAIT,
//   LANDSCAPE,
// } from 'react-native-orientation-locker';

// import Slider from 'react-native-slider';

export default function VideoDetailScreen() {
  const [pause, setPause] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value
  const progress = useSharedValue(0);
  const [isLoading, setIsLoading] = useState(true);
  const min = useSharedValue(0);
  const [volume, setVolume] = useState(false);

  const handleLoadStart = () => {
    setIsLoading(true); // Set loading state to true when video starts loading
    console.log('duration');
  };
  const handleVolumeChange = (value: any) => {
    setVolume(value);
    // Apply the volume setting to the currently playing song
    // (e.g., using the audio playback library you are using)
  };

  const handleLoad = () => {
    setIsLoading(false); // Set loading state to false when video is loaded
    console.log('duration');
  };
  const max = useSharedValue(10);
  const handleVideoPress = () => {
    if (currentTime === duration) {
      setPause(false);
      return;
    }

    setPause(!pause);
    Animated.timing(fadeAnim, {
      toValue: !pause ? 1 : 0, // Target opacity value
      duration: 500, // Duration of the animation
      useNativeDriver: true, // Use the native driver for performance
    }).start(); // Start the animation
  };
  const handleProgress = (data: any) => {
    max.value = Math.round(data.seekableDuration);
    setDuration(data.seekableDuration);
    setCurrentTime(data.currentTime);
    progress.value = Math.round(data.currentTime);
    if (data.currentTime === data.seekableDuration) {
      setPause(true);
    }
    if (data.currentTime === progress.value) {
      min.value = Math.round(data.currentTime);
    }
  };
  const handleBuffer = (meta: any) => {
    console.log('meta', meta.isBuffering);
    setIsBuffering(meta.isBuffering);
  };
  // onPress={handleVideoPress}
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#000',
        height: Dimensions.get('window').height - 130,
      }}>
      {/* <OrientationLocker
        orientation={LANDSCAPE}
        onChange={orientation => console.log('onChange', orientation)}
        onDeviceChange={orientation =>
          console.log('onDeviceChange', orientation)
        }
      /> */}
      {/* <OrientationLocker
        orientation={PORTRAIT}
        onChange={orientation => console.log('onChange', orientation)}
        onDeviceChange={orientation =>
          console.log('onDeviceChange', orientation)
        }
      /> */}
      <TouchableWithoutFeedback>
        <View
          style={{
            width: '100%',
            height: Dimensions.get('window').height - 130,
          }}>
          <Video
            onLoadStart={handleLoadStart} // Handle video load start
            onLoad={handleLoad} //
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            onEnd={() => {
              setPause(true);
            }}
            fullscreenOrientation="landscape"
            fullscreen={isFullScreen}
            fullscreenAutorotate={true}
            muted={volume}
            onBuffer={handleBuffer} // Handle video buffering
            onProgress={handleProgress}
            resizeMode="contain"
            paused={pause}
            onError={e => console.log(e)}
            source={require('../assets/images/video.mp4')}
            // source={{
            //   uri: 'https://teeup-dev.s3.ap-southeast-1.amazonaws.com/videos/1703581228231-817165778-2308-064-Career-Profile-Gladys-Tech-Sales-Subtitles-V03.mp4',
            // }}
          />
          {(isLoading || isBuffering) && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
          <Animated.View style={[styles.overlay, {opacity: fadeAnim}]}>
            <View style={{flexDirection: 'row'}}>
              <PauseIcon />
            </View>
          </Animated.View>
          <View style={styles.progressBarContainer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: '#fff', marginBottom: 10}}>
                {Math.floor(duration / 60) +
                  ':' +
                  ('0' + Math.floor(duration % 60)).slice(-2)}
                /
                {Math.floor(currentTime / 60) +
                  ':' +
                  ('0' + Math.floor(currentTime % 60)).slice(-2)}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setVolume(!volume);
                }}>
                {volume ? (
                  <VolumeMuteIcon width={20} height={20} color="white" />
                ) : (
                  <VolumeIcon width={20} height={20} color="white" />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsFullScreen(!isFullScreen);
                  isFullScreen
                    ? Orientation.lockToPortrait()
                    : Orientation.lockToLandscape();
                }}>
                {isFullScreen ? (
                  <FullScreenExitIcon width={20} height={20} color="white" />
                ) : (
                  <FullScreenIcon width={20} height={20} color="white" />
                )}
              </TouchableOpacity>
            </View>
            <Slider
              style={styles.progressBar}
              minimumValue={min}
              maximumValue={max}
              progress={progress}
              bubbleMaxWidth={20}
              sliderHeight={3}
              thumbWidth={10}
              theme={{
                disableMinTrackTintColor: '#fff',
                maximumTrackTintColor: '#fff',
                minimumTrackTintColor: COLORS.Primary,
                cacheTrackTintColor: '#333',
                bubbleBackgroundColor: '#666',
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  pauseText: {
    fontSize: 32,
    color: '#ffffff',
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  progressBar: {
    width: '100%',
  },
});
