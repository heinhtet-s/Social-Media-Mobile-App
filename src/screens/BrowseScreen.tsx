import {View, Text, FlatList, Dimensions} from 'react-native';
import React, {useEffect, useRef} from 'react';
import SocialCard from '../components/SocialCard';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

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
export default function BrowseScreen() {
  console.log(height);
  const flatListRef = useRef<any>(null);
  const currentIndex = useRef(0);

  const onScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const index = Math.round(scrollY / (height - 120));
    // Only snap when crossing to the next item
    if (index !== currentIndex.current) {
      currentIndex.current = index;
      flatListRef.current.scrollToIndex({
        index: currentIndex.current,
        animated: true,
      });
    }
  };
  return (
    <FlatList
      data={categories}
      ref={flatListRef}
      style={{
        paddingTop: 10,
      }}
      disableIntervalMomentum={true}
      // onScroll={onScroll}
      onMomentumScrollEnd={onScroll}
      pagingEnabled
      bounces={false}
      contentContainerStyle={{
        gap: 20,
        paddingBottom: 70,
      }}
      snapToInterval={height - 100}
      decelerationRate="fast"
      snapToAlignment={'start'}
      scrollEventThrottle={20}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <SocialCard cardHeight={height - 120} cardWidth={'auto'} />
      )}
    />
  );
}
