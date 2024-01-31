import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeActive from '../assets/images/svg/HomeActive.svg';
import {
  BrowseActiveIcon,
  BrowseOutlineIcon,
  HomeActiveIcon,
  HomeOutlineIcon,
  MentorActive,
  MentorOutline,
  ProfileActive,
  ProfileOutline,
  SaveActive,
  SaveOutline,
} from '../assets/images/svg';
import BrowseScreen from '../screens/BrowseScreen';
import MentorshipScreen from '../screens/MentorshipScreen';
import SaveScreen from '../screens/SaveScreen';
import StackNavigation from './StackNavigation';
import {COLORS} from '../theme/theme';
import HeaderComponent from '../components/HeaderComponent';
import {Host, Portal} from 'react-native-portalize';
import SettingHeader from '../components/SettingHeader';
const Tab = createBottomTabNavigator();
const BottomTabNavigationData = [
  {
    key: 'Browse',
    name: 'Browse',
    component: BrowseScreen,
    ActiveIcon: <BrowseActiveIcon />,
    InActiveIcon: <BrowseOutlineIcon />,
  },
  {
    key: 'Home',
    name: 'Home',
    component: HomeScreen,
    ActiveIcon: <HomeActiveIcon width={'24px'} height={'24px'} />,
    InActiveIcon: <HomeOutlineIcon />,
  },

  {
    key: 'Mentorship',
    name: 'Mentorship',
    component: MentorshipScreen,
    ActiveIcon: <MentorActive />,
    InActiveIcon: <MentorOutline />,
  },
  {
    key: 'Save',
    name: 'Save',
    component: SaveScreen,
    ActiveIcon: <SaveActive />,
    InActiveIcon: <SaveOutline />,
  },
  {
    key: 'Profile',
    name: 'Profile',
    component: ProfileScreen,
    ActiveIcon: <ProfileActive />,
    InActiveIcon: <ProfileOutline />,
  },
];
export default function BottomTabNavigation() {
  return (
    <Host>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            zIndex: 1,
            height: 54,
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            shadowColor: 'transparent',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flex: 1,
            paddingTop: 5,
          },

          tabBarIconStyle: {
            width: 24,
            height: 24,
            flex: 1,
          },
          tabBarItemStyle: {
            flex: 1,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}>
        {/* <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? <HomeActive /> : <HomeActive />;
          },
        }}
      /> */}
        {/* <Tab.Screen name="Settings" component={ProfileScreen} /> */}

        {BottomTabNavigationData.map(item => {
          return (
            <Tab.Screen
              key={item.key}
              name={item.name}
              component={item.component}
              options={{
                tabBarIcon: ({focused}) => {
                  return focused ? item.ActiveIcon : item.InActiveIcon;
                },
                header: ({navigation, route, options}) => {
                  return route.name === 'Profile' ? (
                    <SettingHeader navigation={navigation} />
                  ) : (
                    <HeaderComponent />
                  );
                },
                tabBarLabel: ({focused}) => {
                  return (
                    <Text
                      style={{
                        color: focused ? COLORS.Primary : COLORS.Text,
                        fontSize: 14,
                        fontWeight: '400',
                        lineHeight: 20,
                        fontFamily: 'Open Sans',
                        paddingBottom: 5,
                      }}>
                      {item.name}
                    </Text>
                  );
                },
                
              }}
            />
          );
        })}
      </Tab.Navigator>
    </Host>
  );
}
