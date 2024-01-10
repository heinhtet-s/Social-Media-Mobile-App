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
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Typograhpy, WrapperStyle} from '../GlobalStyle';
import {COLORS} from '../theme/theme';
import SocialCard from '../components/SocialCard';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetView,
  BottomSheetVirtualizedList,
} from '@gorhom/bottom-sheet';
import {ScrollView as GhFlatlist} from 'react-native-gesture-handler';
import {Host, Portal} from 'react-native-portalize';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {HeartOutlineIcon} from '../assets/images/svg';
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
  const bottomSheetRef = useRef<BottomSheet>(null);
  const data = useMemo(
    () =>
      Array(20)
        .fill(0)
        .map((_, index) => `index-${index}`),
    [],
  );
  const handleToggleSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        opacity={1}
      />
    ),
    [],
  );
  const renderItem = useCallback(
    (item: any) => (
      <View key={item} style={bottomSheetStyle.itemContainer}>
        <Image
          source={require('../assets/images/CardImage.jpeg')}
          style={{height: 50, width: 50}}
        />
        {/* <Text>{item}</Text> */}
      </View>
    ),
    [],
  );
  const renderFlatItem = useCallback(
    ({item, index}: {item: any; index: number}) => (
      <>
        {index === 0 && (
          <Text style={bottomSheetStyle.bottomSheetHeader}>128 comments</Text>
        )}
        <View style={bottomSheetStyle.itemContainer}>
          <View style={bottomSheetStyle.commentHeader}>
            <Image
              source={require('../assets/images/CardImage.jpeg')}
              style={bottomSheetStyle.commentImage}
            />
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  flex: 1,
                }}>
                <Text style={bottomSheetStyle.commentName}>
                  Evelyn Smith .{' '}
                </Text>
                <Text style={bottomSheetStyle.commentTime}>1 hour ago</Text>
              </View>
              <View
                style={{
                  flex: 1,
                }}>
                <Text style={bottomSheetStyle.commentText}>
                  loream ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus vel enim eu eros finibus tristique. Quisque et
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}>
            <HeartOutlineIcon width={16} height={16} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: COLORS.Text,
              }}>
              23
            </Text>
          </View>
        </View>
      </>
    ),
    [],
  );
  return (
    <View>
      <ScrollView
        bounces={false}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{
          marginBottom: 55,
        }}>
        <TouchableOpacity onPress={handleToggleSheet}>
          <Text>Show Comments</Text>
        </TouchableOpacity>

        {/* <Button title="Close Sheet" onPress={handleOpenPress} /> */}
        {[1, 2, 3, 4, 5].map((item, index) => (
          <View
            key={index}
            style={{
              marginVertical: 10,
            }}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderTitle}>Learn</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ggwf')}>
                <Text style={styles.seeMoreHeader}>Show More</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={categories}
              horizontal={true}
              style={{
                paddingHorizontal: 10,
                paddingEnd: 20,
              }}
              bounces={false}
              // getItemLayout={(_, index) => {
              //   return {length: width * 0.7, offset: width * 0.7 * index, index};
              // }}
              showsHorizontalScrollIndicator={false}
              decelerationRate={'fast'}
              snapToInterval={width * 0.7 + 20}
              snapToAlignment={'center'}
              scrollEventThrottle={20}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <SocialCard cardHeight="auto" cardWidth={width * 0.7} />
              )}
            />
          </View>
        ))}
      </ScrollView>
      <Portal>
        <BottomSheet
          handleIndicatorStyle={{
            backgroundColor: COLORS.Primary,
            width: 60,
            height: 2,
          }}
          ref={bottomSheetRef}
          index={0}
          backdropComponent={renderBackdrop}
          keyboardBehavior="interactive"
          android_keyboardInputMode="adjustResize"
          // enablePanDownToClose={true}
          snapPoints={['50%']}>
          {/* <BottomSheetView style={{padding: 16}}></BottomSheetView> */}
          {/* <BottomSheetScrollView
              contentContainerStyle={bottomSheetStyle.contentContainer}>
              {data.map(renderItem)}
            </BottomSheetScrollView> */}
          {/* <BottomSheetFlatList
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.contentContainer}>
              {data.map((item, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: COLORS.Text,
                  }}>
                  {item}
                </Text>
              ))}
            </> */}
          <BottomSheetFlatList
            scrollEnabled={true}
            data={data}
            keyExtractor={(_, index) => index.toString()}
            // getItemCount={data => data.length}
            // getItem={(data, index) => data[index]}

            renderItem={renderFlatItem}
            contentContainerStyle={bottomSheetStyle.contentContainer}
          />
          <View style={bottomSheetStyle.bottomSheetFooter}>
            <BottomSheetTextInput style={bottomSheetStyle.input} />
            <TouchableOpacity>
              <Text style={{color: COLORS.Primary}}>Send</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </Portal>
    </View>
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
    flex: 1,
    objectFit: 'cover',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.Text,
  },
});
