import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useMemo} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetView,
  BottomSheetVirtualizedList,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import {Portal} from 'react-native-portalize';
import {COLORS} from '../theme/theme';
import {HeartOutlineIcon} from '../assets/images/svg';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useGetComment} from '../lib/services/ContentService';
const CommentPopUp = ({
  bottomSheetRef,
  id,
}: {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  id: string;
}) => {
  const renderFlatItem = useCallback(
    ({item, index}: {item: any; index: number}) => (
      <>
        {index === 0 && (
          <Text style={bottomSheetStyle.bottomSheetHeader}>128 comments</Text>
        )}
        <View style={bottomSheetStyle.itemContainer}>
          <View style={bottomSheetStyle.commentHeader}>
            <Image
              source={{
                uri: item?.user?.profile_url || 'https://picsum.photos/200',
              }}
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
                  {item?.user?.name}
                </Text>
                <Text style={bottomSheetStyle.commentTime}>1 hour ago</Text>
              </View>
              <View
                style={{
                  flex: 1,
                }}>
                <Text style={bottomSheetStyle.commentText}>
                  {item?.comment}
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
  const data = Array(20)
    .fill(0)
    .map((_, index) => `index-${index}`);

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

  const {
    data: commentData,
    error: commentError,
    isLoading: commentLoading,
    refetch,
  } = useGetComment<any>(id);

  // useEffect(() => {
  //   if (id !== '') {
  //     console.log(id, 'id');
  //     refetch();
  //   }
  // }, [id]);
  return (
    <Portal>
      <BottomSheet
        handleIndicatorStyle={{
          backgroundColor: COLORS.Primary,
          width: 60,
          height: 2,
        }}
        ref={bottomSheetRef}
        index={-1}
        backdropComponent={renderBackdrop}
        keyboardBehavior="interactive"
        android_keyboardInputMode="adjustResize"
        enablePanDownToClose={true}
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
        {!commentLoading && (
          <BottomSheetFlatList
            scrollEnabled={true}
            data={commentData?.data || []}
            keyExtractor={(_, index) => index.toString()}
            // getItemCount={data => data.length}
            // getItem={(data, index) => data[index]}

            renderItem={renderFlatItem}
            contentContainerStyle={bottomSheetStyle.contentContainer}
          />
        )}

        <View style={bottomSheetStyle.bottomSheetFooter}>
          <BottomSheetTextInput style={bottomSheetStyle.input} />
          <TouchableOpacity>
            <Text style={{color: COLORS.Primary}}>Send</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </Portal>
  );
};

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
export default React.memo(CommentPopUp);
