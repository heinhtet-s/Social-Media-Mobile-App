import {View, Text, Button, TextInput} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen({navigation}: any) {
  return (
    <View>
      <Text>HomeScreen</Text>
      <TextInput />
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate('Profile');
        }}
      />
    </View>
  );
}
