import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Touchable,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  RefreshControl,
  Button,
  VirtualizedList,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';

import {COLORS} from '../theme/theme';
import SocialCard from '../components/SocialCard';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

import {debounce} from 'lodash';
import {
  useGetHomeContent,
  usePostComment,
  usePostContentLike,
  usePostContentSave,
} from '../lib/services/ContentService';
import {ContentHomeData} from '../lib/types/Content';
import CommentPopUp from '../components/CommentPopUp';
import {useScrollToTop} from '@react-navigation/native';
import {useQueryClient} from 'react-query';
const categories = [
  'Category 1',
  'Category 2',
  'Category 3',
  'Category 4',
  'Category 5',
  'Category 6',
  'Category 7',
  'Category 8',
  'Category 9',
  'Category 10',
];

const {width, height} = Dimensions.get('window');
export default function HomeAllScreen({navigation}: {navigation: any}) {
  const {data: homeContent, isLoading, refetch} = useGetHomeContent<any>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeComment, setActiveComment] = useState<string>('');
  const queryClient = useQueryClient();
  const {mutate: postLike} = usePostContentLike();
  const {mutate: postSave} = usePostContentSave();
  const {mutate: postComment} = usePostComment();
  const handlePostLike = (id: string) => {
    queryClient.setQueryData('browse', (existingData: any) => {
      const changeData = existingData?.pages;
      return existingData;
    });
    postLike({
      id,
    });
  };
  const handlePostSave = (id: string) => {
    postSave({
      id,
    });
  };
  const handlePostComment = (id: string, comment: string) => {
    postComment({
      id,
      comment,
    });
  };

  const data = useMemo(
    () =>
      Array(20)
        .fill(0)
        .map((_, index) => `index-${index}`),
    [],
  );
  const handleToggleSheet = (id: string) => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
    setActiveComment(id);
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: any[]}) => {
      if (viewableItems?.length > 0) {
        const firstVisibleItemIndex = viewableItems[0].index || 0;

        setActiveIndex(firstVisibleItemIndex);
      }
    },
    [],
  );
  const viewabiliaConfig = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 50,
      },
      onViewableItemsChanged: debounce(
        ({viewableItems}: {viewableItems: any[]}) => {
          if (viewableItems.length > 0 && viewableItems[0].isViewable) {
            const lastVisibleItemIndex =
              viewableItems[viewableItems.length - 1].index || 0;
            setActiveIndex(lastVisibleItemIndex);
          }
        },
        100,
        {leading: false, trailing: true},
      ),
    },
  ]);
  const ref = React.useRef(null);

  useScrollToTop(ref);
  return (
    <>
      <ScrollView
        ref={ref}
        overScrollMode="never"
        bounces={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{
          marginBottom: 55,
        }}>
        {/* <TouchableOpacity onPress={handleToggleSheet}>
          <Text>Show Comments</Text>
        </TouchableOpacity> */}

        {/* <Button title="Close Sheet" onPress={handleOpenPress} /> */}
        {/* {[1, 2, 3, 4, 5].map((item, index) => ( */}

        {homeContent?.data && homeContent?.data?.length !== 0 ? (
          homeContent?.data?.map(
            (contentData: ContentHomeData, index: number) => {
              return (
                <View
                  key={index}
                  style={{
                    marginVertical: 10,
                  }}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderTitle}>
                      {contentData?.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ggwf')}>
                      <Text style={styles.seeMoreHeader}>Show More</Text>
                    </TouchableOpacity>
                  </View>
                  <VirtualizedList
                    data={contentData?.category_contents}
                    getItem={(data, index) => data[index]}
                    removeClippedSubviews={true}
                    horizontal={true}
                    contentContainerStyle={{
                      paddingHorizontal: 10,
                    }}
                    initialNumToRender={5}
                    maxToRenderPerBatch={5}
                    windowSize={5}
                    updateCellsBatchingPeriod={10}
                    overScrollMode="never"
                    alwaysBounceHorizontal={false}
                    bounces={false}
                    getItemCount={data => data.length}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={'fast'}
                    snapToInterval={width * 0.7 + 20}
                    // // onViewableItemsChanged={handleViewableItemsChanged}
                    snapToAlignment={'center'}
                    scrollEventThrottle={16}
                    // lazy={true}
                    viewabilityConfigCallbackPairs={viewabiliaConfig.current}
                    keyExtractor={(item, index) => `key-${index}`}
                    renderItem={({item, index}) => (
                      <SocialCard
                        key={index}
                        cardHeight="auto"
                        cardWidth={width * 0.7}
                        data={item?.content}
                        handleOpenComments={handleToggleSheet}
                        // onPress={() => navigation.navigate('ggwf')}
                        // activeIndex={activeIndex === index}
                      />
                    )}
                  />
                </View>
              );
            },
          )
        ) : (
          <Text>No data</Text>
        )}

        {/* ))} */}
      </ScrollView>
      <CommentPopUp bottomSheetRef={bottomSheetRef} id={activeComment} />
    </>
  );
}

const bottomSheetStyle = StyleSheet.create({
  bottomSheetHeader: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.Text,
    padding: 16,
  },
  bottomSheetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  input: {
    backgroundColor: 'rgba(91, 103, 112, 0.10)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    flex: 1,
    borderRadius: 40,
    marginRight: 12,
  },
  bottomSheetItem: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  commentText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    color: COLORS.Text,
    paddingBottom: 16,
  },
  commentImage: {
    width: 32,
    height: 32,
    marginRight: 8,
    borderRadius: 100,
  },
  commentHeader: {
    flex: 1,
    flexDirection: 'row',
  },
  commentName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.Text,
  },
  commentTime: {
    fontSize: 14,
    fontWeight: '300',
    color: COLORS.Text,
  },
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 30,
    margin: 6,
  },
});

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
    width: width * 0.7,
    marginHorizontal: 10,
    backgroundColor: COLORS.White,
    overflow: 'hidden',
  },
  cardHeaderTitle: {
    fontSize: 20,
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
    flex: 1,
    objectFit: 'cover',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.Text,
  },
});
