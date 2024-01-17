// const Tab = createMaterialTopTabNavigator();

// export default function ProfileScreen({navigation}: {navigation: any}) {
//   const isFocused = useIsFocused();
//   return (
//     <ScrollView
//       style={{
//         flex: 1,
//       }}
//       contentContainerStyle={{
//         flexGrow: 1,
//       }}>
//       <View
//         style={{
//           width: '100%',
//           height: 128,
//         }}>
//         <TouchableWithoutFeedback
//           style={[
//             styles.cameraButton,
//             {
//               right: 10,
//               top: 10,
//             },
//           ]}>
//           <CameraIcon />
//         </TouchableWithoutFeedback>
//         <LinearGradient
//           colors={['rgba(218, 41, 28, 0.00)', 'rgba(218, 41, 28, 0.25)']}
//           style={styles.linearGradient}></LinearGradient>
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'flex-end',
//         }}>
//         <View style={styles.personalPhoto}>
//           <LinearGradient
//             colors={['rgba(218, 41, 28, 0.00)', 'rgba(218, 41, 28, 0.70)']}
//             style={[
//               styles.linearGradient,
//               {
//                 borderRadius: 200,
//                 zIndex: 10,
//                 backgroundColor: 'white',
//               },
//             ]}>
//             <PersonIcon />
//             <TouchableWithoutFeedback
//               style={[
//                 styles.cameraButton,
//                 {
//                   bottom: -25,
//                   left: 15,
//                 },
//               ]}>
//               <CameraIcon />
//             </TouchableWithoutFeedback>
//           </LinearGradient>
//         </View>
//         <TouchableWithoutFeedback>
//           <View style={styles.editButton}>
//             <EditIcon />
//             <Text style={styles.editText}>Edit Profile</Text>
//           </View>
//         </TouchableWithoutFeedback>
//       </View>
//       <View
//         style={{
//           marginLeft: 16,
//           marginRight: 10,
//           marginTop: 20,
//         }}>
//         <Text style={Typograhpy.h2}>Hein Htet Zaw</Text>
//         <Text style={Typograhpy.text}>
//           A dedicated UI/UX designer with a passion for crafting delightful
//           digital experiences.
//         </Text>
//       </View>
//       <View style={{zIndex: 10, minHeight: 1000}}>
//         <Tab.Navigator
//           screenOptions={{
//             tabBarAndroidRipple: {
//               color: 'transparent',
//               borderless: true,
//             },
//             tabBarContentContainerStyle: {
//               flex: 1,
//             },
//             tabBarStyle: {
//               backgroundColor: 'transparent',
//               marginHorizontal: 10,
//             },
//             tabBarIndicatorStyle: {
//               backgroundColor: COLORS.Primary,
//               height: 1, // Increase this value if needed
//             },

//             tabBarItemStyle: {
//               backgroundColor: 'transparent',
//               padding: 0,
//               width: 'auto',
//               marginRight: 10,
//             },
//             tabBarActiveTintColor: COLORS.Primary,
//             tabBarInactiveTintColor: COLORS.Text,
//             tabBarLabelStyle: {
//               textAlign: 'left',
//             },
//           }}
//           style={{
//             borderBottomColor: 'rgba(187, 199, 214, 0.5)',
//             borderBottomWidth: 1,
//             backgroundColor: 'transparent',
//           }}>
//           <Tab.Screen
//             name="Hope-Action assessment "
//             component={AssessmentScreen}
//             options={{
//               tabBarLabel: ({focused, children}) => (
//                 <Text
//                   style={{
//                     fontWeight: focused ? 'bold' : 'normal',
//                     color: focused ? COLORS.Primary : COLORS.Text,
//                     fontSize: 16,
//                   }}>
//                   {children}
//                 </Text>
//               ),
//             }}
//           />
//           <Tab.Screen
//             options={{
//               tabBarLabel: ({focused, children}) => (
//                 <Text
//                   style={{
//                     fontWeight: focused ? 'bold' : 'normal',
//                     color: focused ? COLORS.Primary : COLORS.Text,
//                     fontSize: 16,
//                   }}>
//                   {children}
//                 </Text>
//               ),
//             }}
//             name="Personal details "
//             component={AssessmentScreen}
//           />
//         </Tab.Navigator>
//       </View>
//       {/* <Button
//         title="Go to Profile"
//         onPress={() => {
//           navigation.navigate('Home');
//         }}
//       /> */}
//     </ScrollView>
//   );
// }
// const ProfileInfoScreen = () => {
//   return (
//     <View style={styles.tabContent}>
//       <Text>Profile Information</Text>
//     </View>
//   );
// };

// const AssessmentScreen = () => {
//   return (
//     <View style={{marginHorizontal: 16}}>
//       <View>
//         <Text
//           style={[
//             Typograhpy.h3,
//             {
//               marginVertical: 24,
//             },
//           ]}>
//           Assessment chart
//         </Text>
//         <View style={styles.chart}>
//           <Text>Chart</Text>
//         </View>
//         <View style={styles.chart}>
//           <Text>Chart</Text>
//         </View>
//         <View style={styles.chart}>
//           <Text>Chart</Text>
//         </View>
//         <View style={styles.chart}>
//           <Text>Chart</Text>
//         </View>
//         <TouchableWithoutFeedback>
//           <Text>Continue assessment</Text>
//         </TouchableWithoutFeedback>
//       </View>
//       <View>
//         <Text>Assessment report</Text>
//         <View></View>
//       </View>
//     </View>
//   );
// };
// // color: var(--Color-Brand-color-Primary, #DA291C);
// // text-align: center;
// // /* 14px/semibold */
// // font-family: Open Sans;
// // font-size: 14px;
// // font-style: normal;
// // font-weight: 600;
// // line-height: 20px
// const styles = StyleSheet.create({
//   editText: {
//     color: COLORS.Primary,
//     textAlign: 'center',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   container: {
//     backgroundColor: COLORS.White,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 16,
//   },
//   editButton: {
//     flexDirection: 'row',
//     borderColor: COLORS.Primary,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     gap: 4,
//     borderRadius: 160,
//     borderWidth: 2,
//     alignSelf: 'flex-start',
//     marginRight: 10,
//   },
//   chart: {
//     width: StyleSheet.absoluteFill,
//     height: 250,
//     backgroundColor: '#D9D9D9',
//     marginVertical: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   assessmentBtn: {
//     backgroundColor: COLORS.Primary,
//     paddingVertical: 16,
//   },
//   personalPhoto: {
//     width: 96,
//     height: 96,
//     marginTop: -30,
//     marginLeft: 16,
//     zIndex: 10,
//     borderRadius: 200,
//     borderWidth: 4,
//     borderColor: '#fff',
//     backgroundColor: '#fff',
//   },
//   cameraButton: {
//     position: 'absolute',

//     width: 32,
//     height: 32,
//     elevation: 2, // For Android
//     shadowColor: '#000', // For iOS
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     borderRadius: 100,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   linearGradient: {
//     flex: 1,
//     justifyContent: 'center', // or 'flex-end', 'flex-start'
//     alignItems: 'center',
//   },
//   headerText: {
//     color: COLORS.Text,
//     fontSize: 16,
//     fontStyle: 'normal',
//     fontWeight: '600',
//     flex: 1,
//     textAlign: 'center',
//   },
//   tabContainer: {
//     padding: 10,
//   },
//   tabContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
import React from 'react';
import {View, StyleSheet, ListRenderItem} from 'react-native';
import {Tabs, MaterialTabBar} from 'react-native-collapsible-tab-view';
import {Text, Button, ScrollView, TouchableWithoutFeedback} from 'react-native';
import {
  CameraIcon,
  EditIcon,
  PersonIcon,
  SettingIcon,
} from '../assets/images/svg';
import {COLORS} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import {Typograhpy} from '../GlobalStyle';
import {MaterialTabItem} from 'react-native-collapsible-tab-view';

const HEADER_HEIGHT = 250;

const DATA = [0, 1, 2, 3, 4];
const identity = (v: unknown): string => v + '';

const Header = () => {
  return (
    <View>
      <View
        style={{
          width: '100%',
          height: 128,
        }}>
        <TouchableWithoutFeedback
          style={[
            styles.cameraButton,
            {
              right: 10,
              top: 10,
            },
          ]}>
          <CameraIcon />
        </TouchableWithoutFeedback>
        <LinearGradient
          colors={['rgba(218, 41, 28, 0.00)', 'rgba(218, 41, 28, 0.25)']}
          style={styles.linearGradient}></LinearGradient>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <View style={styles.personalPhoto}>
          <LinearGradient
            colors={['rgba(218, 41, 28, 0.00)', 'rgba(218, 41, 28, 0.70)']}
            style={[
              styles.linearGradient,
              {
                borderRadius: 200,
                zIndex: 10,
                backgroundColor: 'white',
              },
            ]}>
            <PersonIcon />
            <TouchableWithoutFeedback
              style={[
                styles.cameraButton,
                {
                  bottom: -25,
                  left: 15,
                },
              ]}>
              <CameraIcon />
            </TouchableWithoutFeedback>
          </LinearGradient>
        </View>
        <TouchableWithoutFeedback>
          <View style={styles.editButton}>
            <EditIcon />
            <Text style={styles.editText}>Edit Profile</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          marginLeft: 16,
          marginRight: 10,
          marginTop: 20,
        }}>
        <Text style={Typograhpy.h2}>Hein Htet Zaw</Text>
        <Text style={Typograhpy.text}>
          A dedicated UI/UX designer with a passion for crafting delightful
          digital experiences.
        </Text>
      </View>
    </View>
  );
};

const ProfileScreen: React.FC = () => {
  const renderItem: ListRenderItem<number> = React.useCallback(({index}) => {
    return (
      <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
    );
  }, []);
  2;

  return (
    <Tabs.Container
      renderHeader={Header}
      headerContainerStyle={{
        shadowOpacity: 0,
        elevation: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(187, 199, 214, 0.5)',
        width: 'auto',
      }}
      headerHeight={HEADER_HEIGHT} // optional
      renderTabBar={(props: any) => (
        <MaterialTabBar
          {...props}
          indicatorStyle={{backgroundColor: 'red'}}
          scrollEnabled={true}
          style={{
            elevation: 0,

            width: 'auto',
          }}
          tabStyle={{
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            width: 'auto',
            padding: 0,
          }}
          contentContainerStyle={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            width: 'auto',
          }}
          // backgroundColor: 'green', marginRight: 18, }
          TabItemComponent={(props: any) => {
            return (
              <MaterialTabItem
                {...props}
                scrollEnabled={true}
                pressColor={'transparent'}
                tabBaroption={{pressColor: 'transparent'}}
                screenOptions={{tabBarPressColor: 'transparent'}}
                activeColor={COLORS.Primary}
                inactiveColor={COLORS.Text}
                style={{
                  alignItems: 'flex-start',
                  padding: 0,
                  margin: 0,
                }}
              />
            );
          }}
        />
      )}>
      <Tabs.Tab name="Hope-Action assessment">
        <Tabs.FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={identity}
        />
      </Tabs.Tab>
      <Tabs.Tab name="Personal details">
        <Tabs.ScrollView>
          <View style={[styles.box, styles.boxA]} />
          <View style={[styles.box, styles.boxB]} />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
  },
  editText: {
    color: COLORS.Primary,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    backgroundColor: COLORS.White,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  editButton: {
    flexDirection: 'row',
    borderColor: COLORS.Primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 4,
    borderRadius: 160,
    borderWidth: 2,
    alignSelf: 'flex-start',
    marginRight: 10,
  },
  chart: {
    width: StyleSheet.absoluteFill,
    height: 250,
    backgroundColor: '#D9D9D9',
    marginVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assessmentBtn: {
    backgroundColor: COLORS.Primary,
    paddingVertical: 16,
  },
  personalPhoto: {
    width: 96,
    height: 96,
    marginTop: -30,
    marginLeft: 16,
    zIndex: 10,
    borderRadius: 200,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  cameraButton: {
    position: 'absolute',

    width: 32,
    height: 32,
    elevation: 2, // For Android
    shadowColor: '#000', // For iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center', // or 'flex-end', 'flex-start'
    alignItems: 'center',
  },
  headerText: {
    color: COLORS.Text,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  tabContainer: {
    padding: 10,
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
