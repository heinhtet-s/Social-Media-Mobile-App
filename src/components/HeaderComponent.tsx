import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {SearchIcon} from '../assets/images/svg';
import {COLORS} from '../theme/theme';

export default function HeaderComponent() {
  return (
    <View style={styles.headerStyle}>
      <Image
        style={{width: 83, height: 20}}
        source={require('../assets/images/Logo.png')}
      />
      <TouchableOpacity>
        <SearchIcon />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: COLORS.White,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
