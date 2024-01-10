import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../theme/theme';
import {SearchIcon} from '../assets/images/svg';
// import TabBar from '../components/CustomTabBar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeAllScreen from './HomeAllScreen';

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);
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
const Tab = createMaterialTopTabNavigator();

export default function HomeScreen({navigation}: any) {
  // function MyTabBar({state, descriptors, navigation, position}: any) {
  //   const inputRange = state.routes.map((_: any, i: any) => i);
  //   const tabWidth = Dimensions.get('window').width / state.routes.length;

  //   console.log(state.routes.length);
  //   const translateX = position.interpolate({
  //     inputRange,
  //     outputRange: inputRange.map((i: any) => i * 100), // Adjust the value based on your requirements
  //   });

  //   return (
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         paddingVertical: 10,

  //         width: '100%',
  //       }}>
  //       {state.routes.map((route: any, index: any) => {
  //         const {options} = descriptors[route.key];
  //         const label =
  //           options.tabBarLabel !== undefined
  //             ? options.tabBarLabel
  //             : options.title !== undefined
  //             ? options.title
  //             : route.name;

  //         const isFocused = state.index === index;

  //         const onPress = () => {
  //           const event = navigation.emit({
  //             type: 'tabPress',
  //             target: route.key,
  //             canPreventDefault: true,
  //           });

  //           if (!isFocused && !event.defaultPrevented) {
  //             navigation.navigate(route.name, route.params);
  //           }
  //         };

  //         const onLongPress = () => {
  //           navigation.emit({
  //             type: 'tabLongPress',
  //             target: route.key,
  //           });
  //         };

  //         const inputRange = state.routes.map((_: any, i: any) => i);
  //         const opacity = position.interpolate({
  //           inputRange,
  //           outputRange: inputRange.map((i: any) => (i === index ? 1 : 0)),
  //         });

  //         return (
  //           <TouchableOpacity
  //             accessibilityRole="button"
  //             accessibilityState={isFocused ? {selected: true} : {}}
  //             accessibilityLabel={options.tabBarAccessibilityLabel}
  //             testID={options.tabBarTestID}
  //             onPress={onPress}
  //             onLongPress={onLongPress}
  //             style={{flex: 1}}>
  //             <Animated.Text
  //               style={{
  //                 color: isFocused ? COLORS.Primary : COLORS.Black,
  //                 padding: 8,
  //                 fontSize: 16,
  //               }}>
  //               {label}
  //             </Animated.Text>
  //           </TouchableOpacity>
  //         );
  //       })}
  //       <Animated.View
  //         style={{
  //           position: 'absolute',
  //           bottom: 0,
  //           left: 0,
  //           width: tabWidth, // Adjust the width of the indicator
  //           height: 2, // Height of the indicator
  //           backgroundColor: COLORS.Primary,
  //           transform: [{translateX}],
  //         }}
  //       />
  //     </View>
  //   );
  // }

  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarAndroidRipple: {
          color: 'transparent',
          borderless: true,
        },
        tabBarScrollEnabled: true,
        tabBarStyle: {
          flexDirection: 'row',
          zIndex: 1,
          alignSelf: 'flex-start',
          justifyContent: 'flex-start',
        },
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.Primary,
          height: 4, // Increase this value if needed
        },
        tabBarItemStyle: {
          height: 54,
          width: 'auto',
        },
      }}
      style={{
        borderTopColor: COLORS.Background,
        borderTopWidth: 2,
      }}
      // tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen name="tt" component={HomeAllScreen} />
      <Tab.Screen name="gg" component={SecondRoute} />
      <Tab.Screen name="ggewfwf" component={HomeAllScreen} />
      <Tab.Screen name="ggwf" component={SecondRoute} />
      <Tab.Screen name="ggewfwfefrwef" component={HomeAllScreen} />
    </Tab.Navigator>
  );
}
