import {
  View,
  Text,
  FlatList,
  Dimensions,
  VirtualizedList,
  RefreshControl,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import SocialCard from '../components/SocialCard';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import CommentPopUp from '../components/CommentPopUp';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {useGetBrowseContent} from '../lib/services/ContentService';
import {ContentData} from '../lib/types/Content';
import {useInfiniteQuery} from 'react-query';
import {getData} from '../lib/services';
import {useScrollToTop} from '@react-navigation/native';
import SocialCardBrowse from '../components/SocialCardBrowse';
import {debounce} from 'lodash';
import {FlashList} from '@shopify/flash-list';
import SocialVideoCard from '../components/SocialVideoCard';

const {width, height} = Dimensions.get('window');
export default function BrowseScreen({navigation}: {navigation: any}) {
  const flatListRef = useRef<any>(null);
  const [activeComment, setActiveComment] = React.useState<string>('');
  const currentIndex = useRef(0);
  const [activeIndex, setActiveIndex] = React.useState<any>({});
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isVideoLoaded, setIsVideoLoaded] = React.useState<boolean>(true);

  const viewabiliaConfig = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 50,
      },
      onViewableItemsChanged: ({viewableItems}: {viewableItems: any[]}) => {
        if (viewableItems.length > 0 && viewableItems[0].isViewable) {
          const lastVisibleItemIndex =
            viewableItems[viewableItems.length - 1].index || 0;
          setActiveIndex({
            [lastVisibleItemIndex]: true,
          });
          setIsVideoLoaded(true);
        }
      },
    },
  ]);

  const handleToggleSheet = useCallback((id: string) => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
    setActiveComment(id);
  }, []);
  const {
    data: PaginateProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({pageParam = 1}) =>
      getData(`/content/browse?page=${pageParam}&pagesize=10`),
    getNextPageParam: (data, total) => {
      if (data.current_page < data.last_page) {
        return data.current_page + 1;
      }
      return undefined;
    },
  }) as any;
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const spinner = useCallback(() => {
    return (
      <View
        style={{
          marginBottom: 10,
        }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }, []);
  const flattenedData = useMemo(
    () =>
      PaginateProducts
        ? PaginateProducts?.pages.flatMap((item: any) => item.data)
        : [],
    [PaginateProducts],
  );
  const loadMore = () => {
    if (hasNextPage) {
      console.log('fetchNextPage');
      fetchNextPage();
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e: any) => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({offset: 0, animated: true});
        onRefresh();
      }
      return true;
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (activeIndex === 0) {
          return false; // Let the default back button behavior handle app exit
        } else {
          // Scroll to top and return true to prevent default behavior
          flatListRef.current.scrollToOffset({offset: 0, animated: true});
          onRefresh();
          return true;
        }
      },
    );

    return () => backHandler.remove();
  }, [activeIndex]);
  const renderItem = useCallback(
    ({item, index}: {item: ContentData; index: number}) => {
      if (item?.content_video) {
        return (
          <SocialVideoCard
            data={item}
            activeIndex={!!activeIndex[index]}
            handleOpenComments={handleToggleSheet}
            setIsVideoLoaded={setIsVideoLoaded}
            isVideoLoaded={isVideoLoaded}
          />
        );
      }
      return (
        <SocialCardBrowse data={item} handleOpenComments={handleToggleSheet} />
      );
    },
    [activeIndex, handleToggleSheet, isVideoLoaded],
  );
  // useScrollToTop(flatListRef);
  return (
    <>
      <VirtualizedList
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={11}
        updateCellsBatchingPeriod={100}
        getItemCount={data => data.length}
        getItem={(data, index) => data[index]}
        data={(flattenedData as ContentData[]) || []}
        ref={flatListRef}
        onEndReachedThreshold={0.9}
        removeClippedSubviews
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={isFetchingNextPage ? spinner : null}
        style={{
          paddingTop: 10,
        }}
        overScrollMode="never"
        disableIntervalMomentum={true}
        pagingEnabled
        bounces={false}
        contentContainerStyle={{
          gap: 20,
          paddingBottom: 70,
        }}
        viewabilityConfigCallbackPairs={viewabiliaConfig.current}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        decelerationRate="fast"
        snapToAlignment={'start'}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      {/* <FlashList
        estimatedItemSize={20}
        keyExtractor={(item, index) => index.toString()}
        ref={flatListRef}
        // viewabilityConfigCallbackPairs={viewabiliaConfig.current}
        decelerationRate="fast"
        // pagingEnabled
        overScrollMode="never"
        disableIntervalMomentum={true}
        onEndReachedThreshold={0.4}
        removeClippedSubviews
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={isFetchingNextPage ? spinner : null}
        // onEndReached={loadMore}
        contentContainerStyle={{
          paddingBottom: 70,
        }}
        snapToAlignment={'start'}
        data={(flattenedData as ContentData[]) || []}
        renderItem={({item, index}) => (
          <SocialCardBrowse
            data={item}
            // activeIndex={!!activeIndex[index]}
            // setActiveIndex={setActiveIndex}
            // index={index}
            handleOpenComments={handleToggleSheet}
            // setIsVideoLoaded={setIsVideoLoaded}
            // isVideoLoaded={isVideoLoaded}
          />
        )}
      /> */}
      <CommentPopUp bottomSheetRef={bottomSheetRef} id={activeComment} />
    </>
  );
}
