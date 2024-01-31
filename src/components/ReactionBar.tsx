import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/theme';
import {
  CommentIcon,
  HeartOutlineIcon,
  ShareIcon,
  SocialSaveOutlineIcon,
} from '../assets/images/svg';

const ReactionBar = ({
  data,
  handleOpenComments,
}: {
  data: {
    id: string;
    likes: number;
    comments: number;
    saves: number;
  };
  handleOpenComments: (id: string) => void;
}) => {
  return (
    <View style={styles.socialContainer}>
      <TouchableOpacity style={styles.socialItem}>
        <HeartOutlineIcon />
        <Text style={styles.socialItemText}>{data.likes}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleOpenComments(data.id)}
        style={styles.socialItem}>
        <CommentIcon />
        <Text style={styles.socialItemText}>{data.comments}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialItem}>
        <SocialSaveOutlineIcon />
        <Text style={styles.socialItemText}>{data.saves}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialItem}>
        <ShareIcon />
        <Text style={styles.socialItemText}>share</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(ReactionBar);
const styles = StyleSheet.create({
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingTop: 16,
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
});
