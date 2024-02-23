import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/theme';
import {
  CommentIcon,
  HeartActiveIcon,
  HeartOutlineIcon,
  ShareIcon,
  SocialSaveOutlineIcon,
  SoicalSaveActiveIcon,
} from '../assets/images/svg';
import {
  usePostComment,
  usePostContentLike,
  usePostContentSave,
} from '../lib/services/ContentService';

const ReactionBar = ({
  data,
  handleOpenComments,
  handlePostLike,
  handlePostSave,
  handlePostComment,
}: {
  data: {
    id: string;
    likes: number;
    comments: number;
    saves: number;
    is_liked: boolean;
    is_saved: boolean;
  };
  handleOpenComments: (id: string) => void;
  handlePostLike: (id: string) => void;
  handlePostSave: (id: string) => void;
  handlePostComment: (id: string, comment: string) => void;
}) => {
  return (
    <View style={styles.socialContainer}>
      <TouchableWithoutFeedback
        style={{
          height: 40,
        }}
        onPress={() => handlePostLike(data.id)}>
        <View style={styles.socialItem}>
          {data.is_liked ? <HeartActiveIcon /> : <HeartOutlineIcon />}
          <Text style={styles.socialItemText}>{data.likes}</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity
        onPress={() => handleOpenComments(data.id)}
        style={styles.socialItem}>
        <CommentIcon />
        <Text style={styles.socialItemText}>{data.comments}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialItem}>
        {data.is_saved ? <SoicalSaveActiveIcon /> : <SocialSaveOutlineIcon />}

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
