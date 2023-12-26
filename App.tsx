import React, {useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import {COLORS} from './src/theme/theme';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from './src/screens/ProfileScreen';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './src/screens/auth/LoginScreen';
import OTPScreen from './src/screens/auth/OtpScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar animated={true} backgroundColor={COLORS.Black} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          presentation: 'modal',
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={SignUpScreen} />
        <Stack.Screen name="Otp" component={OTPScreen} />

        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//   <SafeAreaView style={{flex: 1}}>
//     <StatusBar animated={true} backgroundColor={COLORS.Black} />
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         gestureEnabled: true,
//         gestureDirection: 'horizontal',
//         presentation: 'modal',
//       }}>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//     </Stack.Navigator>
//   </SafeAreaView>
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
