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
export default function SocialCard({
  cardWidth,
  cardHeight,
}: {
  cardWidth: any;
  cardHeight: any;
}) {
  return (
    <View
      style={[
        styles.cardContainer,
        {width: cardWidth, flex: 1, height: cardHeight},
      ]}>
      <Image
        style={styles.imageStyle}
        source={require('../assets/images/CardImage.jpeg')}
      />
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
}
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
    objectFit: 'cover',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.Text,
  },
});
