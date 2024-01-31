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
import {useGetContentCategory} from '../lib/services/ContentService';
import {ContentCategoryResponse} from '../lib/types/Content';
import BrowseScreen from './BrowseScreen';

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
  const {
    data: categoryData,
    error: countriesError,
    isLoading: countriesLoading,
  } = useGetContentCategory<any>();

  if (countriesLoading) return <Text>Loading...</Text>;
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
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
      <Tab.Screen name={'All'} component={HomeAllScreen} />
      {categoryData?.data?.map((category: any) => (
        <Tab.Screen
          key={category.name}
          name={category.name}
          component={SecondRoute}
        />
      ))}
    </Tab.Navigator>
  );
}
