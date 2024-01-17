import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SettingIcon} from '../assets/images/svg';
import {COLORS} from '../theme/theme';

export default function SettingHeader({navigation}: {navigation: any}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Profile </Text>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('setting')}>
        <SettingIcon />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.White,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  cameraButton: {
    position: 'absolute',
    right: 10,
    top: 10,
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
});
