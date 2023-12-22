import {View, Text, Button} from 'react-native';
import React from 'react';

export default function ProfileScreen({navigation}: {navigation: any}) {
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
}
