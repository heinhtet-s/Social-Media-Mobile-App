// // TabBar.tsx
// import React, {useRef, useEffect, useState} from 'react';
// import {
//   View,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   Animated,
//   Text,
// } from 'react-native';

// const TABS = [
//   {id: '1', label: 'wefwfw'},
//   {id: '2', label: 'T332'},
//   {id: '3', label: 'T234234'},
//   {id: '4', label: 'Tab 4e32e'},
//   {id: '5', label: 'Tewf'},
// ];

// interface TabBarProps {
//   activeIndex: number;
//   setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
// }

// const TabBar: React.FC<TabBarProps> = ({activeIndex, setActiveIndex}) => {
//   const [tabWidths, setTabWidths] = useState<number[]>([]);
//   const underlineWidth = useRef(new Animated.Value(0)).current;
//   const [totalWidth, setTotalWidth] = useState<number>(0);

//   useEffect(() => {
//     if (tabWidths.length > 0) {
//       let accumulatedWidth = 0;
//       for (let i = 0; i < activeIndex; i++) {
//         accumulatedWidth += tabWidths[i];
//       }

//       Animated.spring(underlineWidth, {
//         toValue: accumulatedWidth
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [activeIndex, tabWidths]);
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const onLayoutTab = (
//     event: {nativeEvent: {layout: {width: number}}},
//     index: number,
//   ) => {
//     const {width} = event.nativeEvent.layout;
//     const newWidths = [...tabWidths];
//     newWidths[index] = width;
//     setTabWidths(newWidths);

//     if (index === tabWidths.length - 1) {
//       setTotalWidth(newWidths.reduce((acc, curr) => acc + curr, 0));
//     }
//   };

//   const renderItem = ({item}: {item: {id: string; label: string}}) => (
//     <TouchableOpacity
//       style={styles.tabItem}
//       onLayout={event => onLayoutTab(event, parseInt(item.id) - 1)}
//       onPress={() => setActiveIndex(parseInt(item.id) - 1)}>
//       <View>
//         <Text>{item.label}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={TABS}
//         renderItem={renderItem}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={item => item.id}
//         onScroll={Animated.event(
//           [{nativeEvent: {contentOffset: {x: scrollX}}}],
//           {useNativeDriver: false},
//         )}
//       />
//       <Animated.View
//         style={[
//           styles.underline,
//           {
//             transform: [{translateX: underlineWidth}],
//             width: tabWidths[activeIndex],
//           },
//         ]}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   tabItem: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   underline: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     height: 2,
//     backgroundColor: 'blue', // Set based on your design
//   },
// });

// export default TabBar;
