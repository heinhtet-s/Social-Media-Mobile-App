import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/theme';
import {
  CommentIcon,
  HeartOutlineIcon,
  SaveOutline,
  ShareIcon,
  SocialSaveOutlineIcon,
} from '../assets/images/svg';
import Video from 'react-native-video';

const SocialCard = ({
  cardWidth,
  cardHeight,
  activeIndex = false,
}: {
  cardWidth: any;
  cardHeight: any;
  activeIndex?: boolean;
}) => {
  return (
    <View
      style={[styles.cardContainer, {width: cardWidth, height: cardHeight}]}>
      {/* <Image
        style={styles.imageStyle}
        source={require('../assets/images/CardImage.jpeg')}
      /> */}
      <View style={styles.imageStyle}>
        {/* <Image
          style={styles.imageStyle}
          source={require('../assets/images/CardImage.jpeg')}
        /> */}

        <Video
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          resizeMode="cover"
          paused={activeIndex ? false : true}
          poster={
            'https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHx8fDE3MDU3MTQyMTh8MA&ixlib=rb-4.0.3'
          }
          onError={e => console.log(e)}
          posterResizeMode="cover"
          source={require('../assets/images/video.mp4')}
          // poster={require('../assets/images/CardImage.jpeg')}
          // source={{
          //   uri: 'https://teeup-dev.s3.ap-southeast-1.amazonaws.com/videos/1700113652922-241137039-1+Minute+Video+-+Doggie.mp4',
          // }}
          // source={{
          //   uri: 'https://teeup-dev.s3.ap-southeast-1.amazonaws.com/videos/1703581228231-817165778-2308-064-Career-Profile-Gladys-Tech-Sales-Subtitles-V03.mp4',
          // }}
        />
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>New</Text>
      </View>
      <View style={{padding: 12, flex: 1}}>
        <View style={{flex: 1}}>
          <Text style={styles.cardTitle}>
            This is the title. Lorem ipsum dolor
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '300',
              color: COLORS.Text,
              paddingTop: 12,
              paddingBottom: 16,
              height: 100,
            }}>
            This is the description. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed euismod.
          </Text>
        </View>

        <View style={styles.divider} />
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialItem}>
            <HeartOutlineIcon />
            <Text style={styles.socialItemText}>12</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialItem}>
            <CommentIcon />
            <Text style={styles.socialItemText}>12</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialItem}>
            <SocialSaveOutlineIcon />
            <Text style={styles.socialItemText}>12</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialItem}>
            <ShareIcon />
            <Text style={styles.socialItemText}>share</Text>
          </TouchableOpacity>
        </View>
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
    width: '100%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.Text,
  },
});
export default React.memo(SocialCard);
