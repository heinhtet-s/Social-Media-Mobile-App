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
const {width, height} = Dimensions.get('window');
const SocialCardBrowse = ({
  data,
  handleOpenComments,
}: // setActiveIndex,
// index,
// setIsVideoLoaded,
// isVideoLoaded,
{
  data: ContentData;
  handleOpenComments: (id: string) => void;
}) => {
  return (
    <View style={[styles.cardContainer, {width: 'auto', height: height - 143}]}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>New</Text>
      </View>

      <View style={styles.imageStyle}>
        <Image
          style={styles.imageStyle}
          resizeMode="cover"
          source={{
            uri:
              data.image_url ||
              'https://teeup-dev.s3.ap-southeast-1.amazonaws.com/1697257229853-125476757-demoimage1.jpeg',
          }}
        />
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
        <ReactionBar data={data} handleOpenComments={handleOpenComments} />
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
export default React.memo(SocialCardBrowse);
