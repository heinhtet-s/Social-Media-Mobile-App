import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '../theme/theme';
import {
  CommentIcon,
  HeartOutlineIcon,
  PauseIcon,
  SaveOutline,
  ShareIcon,
  SocialSaveOutlineIcon,
} from '../assets/images/svg';
import Video from 'react-native-video';
import {ContentData} from '../lib/types/Content';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue} from 'react-native-reanimated';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import ReactionBar from './ReactionBar';
import {MutationFunction} from 'react-query';
import {ApiResponse} from '../lib/services';
const {width, height} = Dimensions.get('window');
// type PostLikeType = {
//   id: number | string;
// };
// type PostCommentType = {
//   id: number | string;
//   comment: string;
// };

const SocialVideoCard = ({
  activeIndex = false,
  data,
  handleOpenComments,
  setIsVideoLoaded,
  isVideoLoaded,
  handlePostLike,
  handlePostSave,
  handlePostComment,
}: // postLike,
// postSave,
// postComment,
// setActiveIndex,
// index,
// setIsVideoLoaded,
// isVideoLoaded,
{
  activeIndex?: boolean;
  data: ContentData;
  handleOpenComments: (id: string) => void;
  setActiveIndex?: React.Dispatch<any>;
  // index: number;
  setIsVideoLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  isVideoLoaded?: boolean;
  handlePostLike: (id: string) => void;
  handlePostSave: (id: string) => void;
  handlePostComment: (id: string, comment: string) => void;
  // postLike: MutationFunction<ApiResponse<PostDataType>, PostDataType>;
}) => {
  //   const handleBuffer = (meta: any) => {
  //     setIsVideoLoaded(meta.isBuffering);
  //   };
  //   const handleLoadStart = () => {
  //     setIsVideoLoaded(true); // Set loading state to true when video starts loading
  //   };
  //   const handleLoad = () => {
  //     setIsVideoLoaded(false); // Set loading state to false when video is loaded
  //   };

  //   //   const handleTextLayout = (event: any) => {
  //   //     const {lines} = event.nativeEvent;
  //   //     console.log('Number of lines: ' + event.nativeEvent.lines.length);
  //   //     // Check if the number of lines exceeds 2
  //   //     setIsTruncated(lines.length > 2);
  //   //   };
  return (
    <View style={[styles.cardContainer, {width: 'auto', height: height - 143}]}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>New</Text>
      </View>

      <TouchableWithoutFeedback
        style={styles.videoStyle}
        onPress={() => setIsVideoLoaded((prev: boolean) => !prev)}
        // onPress={() => {
        //   setActiveIndex((prev: {[x: number]: boolean}) => ({
        //     [index]: !prev[index],
        //   }));
        // }}
      >
        {/* {isVideoLoaded && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#fff" />
                </View>
              )} */}

        <View
          style={[
            styles.overlay,
            {
              opacity: !isVideoLoaded ? 1 : 0,
            },
          ]}>
          <View style={{flexDirection: 'row'}}>
            <PauseIcon />
          </View>
        </View>
        {activeIndex ? (
          <Video
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: '#000',
            }}
            // useTextureView={false}
            // playInBackground={true}
            // disableFocus={true}
            paused={!isVideoLoaded || !activeIndex}
            maxBitRate={2000000}
            //   onBuffer={handleBuffer}
            //   onLoadStart={handleLoadStart} // Handle video load start
            //   onLoad={handleLoad} //
            //   onLoad={(data: any) => setDuration(data.duration)}
            resizeMode="contain"
            poster={
              data.image_url ||
              'https://teeup-dev.s3.ap-southeast-1.amazonaws.com/1697257229853-125476757-demoimage1.jpeg'
            }
            onError={e => console.log(e)}
            posterResizeMode="cover"
            source={{
              uri: data.content_video?.video_url,
            }}
            repeat={true}
            // useTextureView={false}
            // poster={require('../assets/images/CardImage.jpeg')}
            // source={{
            //   uri: 'https://teeup-dev.s3.ap-southeast-1.amazonaws.com/videos/1700113652922-241137039-1+Minute+Video+-+Doggie.mp4',
            // }}
            // source={{
            //   uri: 'https://teeup-dev.s3.ap-southeast-1.amazonaws.com/videos/1703581228231-817165778-2308-064-Career-Profile-Gladys-Tech-Sales-Subtitles-V03.mp4',
            // }}
          />
        ) : (
          <Image
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: '#000',
            }}
            resizeMode="cover"
            source={{
              uri:
                data.image_url ||
                'https://teeup-dev.s3.ap-southeast-1.amazonaws.com/1697257229853-125476757-demoimage1.jpeg',
            }}
          />
        )}
      </TouchableWithoutFeedback>
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          padding: 12,
        }}>
        <Text
          style={{
            color: '#fff',
          }}>
          {data?.title}
        </Text>
        <Text
          style={{
            color: '#fff',
          }}
          numberOfLines={2}>
          {data?.description}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 12,
        }}>
        <ReactionBar
          data={data}
          handleOpenComments={handleOpenComments}
          handlePostLike={handlePostLike}
          handlePostSave={handlePostSave}
          handlePostComment={handlePostComment}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingTop: 16,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.White,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderTopEndRadius: 8,
    borderBottomLeftRadius: 8,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.Text,
  },
  socialItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  socialItemText: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.Text,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
  },
  container: {
    flex: 1,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
  },
  cardContainer: {
    borderRadius: 8,
    marginBottom: 30,
    position: 'relative',
    marginHorizontal: 10,
    backgroundColor: COLORS.White,
    overflow: 'hidden',
  },
  cardHeaderTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.Text,
  },
  seeMoreHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.Primary,
  },
  videoStyle: {
    width: width,
    height: height - 195,
    backgroundColor: '#000',
  },
  imageStyle: {
    backgroundColor: '#000',
    width: width,
    height: 200,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.Text,
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
  },
});
export default React.memo(SocialVideoCard);
