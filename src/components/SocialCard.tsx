import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
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
import ReactionBar from './ReactionBar';

const SocialCard = ({
  cardWidth,
  cardHeight,
  activeIndex = false,
  data,
  handleOpenComments,
}: {
  cardWidth: any;
  cardHeight: any;
  activeIndex?: boolean;
  data: ContentData;
  handleOpenComments: (id: string) => void;
}) => {
  return (
    <View
      style={[styles.cardContainer, {width: cardWidth, height: cardHeight}]}>
      {/* <Image
        style={styles.imageStyle}
        source={require('../assets/images/CardImage.jpeg')}
      /> */}
      <View style={styles.imageStyle}>
        {data.content_video ? (
          <>
            <Image
              style={styles.imageStyle}
              source={{
                uri: data.image_url,
              }}
            />
            {/* <Video
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              }}
              // onLoad={(data: any) => setDuration(data.duration)}
              resizeMode="contain"
              paused={true}
              poster={
                data.image_url ||
                'https://teeup-dev.s3.ap-southeast-1.amazonaws.com/1697257229853-125476757-demoimage1.jpeg'
              }
              onError={e => console.log(e)}
              posterResizeMode="cover"
              source={{
                uri: data.content_video?.video_url,
              }}

              // poster={require('../assets/images/CardImage.jpeg')}
              // source={{
              //   uri: 'https://teeup-dev.s3.ap-southeast-1.amazonaws.com/videos/1700113652922-241137039-1+Minute+Video+-+Doggie.mp4',
              // }}
              // source={{
              //   uri: 'https://teeup-dev.s3.ap-southeast-1.amazonaws.com/videos/1703581228231-817165778-2308-064-Career-Profile-Gladys-Tech-Sales-Subtitles-V03.mp4',
              // }}
            /> */}
            <View style={styles.progressBarContainer}>
              <View style={styles.flex}>
                <View style={{flexDirection: 'row'}}>
                  <PauseIcon width={'20px'} height={'20px'} />
                </View>
                <Text style={{color: COLORS.DarkGrey, marginBottom: 10}}>
                  00:00
                </Text>
              </View>
              <View style={styles.progressBar} />
            </View>
          </>
        ) : (
          <Image
            style={styles.imageStyle}
            source={{
              uri:
                data.image_url ||
                'https://teeup-dev.s3.ap-southeast-1.amazonaws.com/1697257229853-125476757-demoimage1.jpeg',
            }}
          />
        )}
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>New</Text>
      </View>
      <View style={{padding: 12, flex: 1}}>
        <View style={{flex: 1}}>
          <Text style={styles.cardTitle}>{data?.title}</Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '300',
              color: COLORS.Text,
              paddingTop: 12,
              paddingBottom: 16,
              height: 100,
            }}
            numberOfLines={3}
            ellipsizeMode="tail">
            {data?.description}
          </Text>
        </View>

        <View style={styles.divider} />
        {/* <ReactionBar data={data} handleOpenComments={handleOpenComments} /> */}
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
  },
  cardContainer: {
    borderRadius: 8,
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
  imageStyle: {
    height: 150,
    backgroundColor: '#000',
    width: '100%',
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
export default React.memo(SocialCard);
