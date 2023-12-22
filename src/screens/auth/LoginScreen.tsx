import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FormStyle, Typograhpy, WrapperStyle} from '../../GlobalStyle';
import {COLORS} from '../../theme/theme';

export default function LoginScreen() {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <ScrollView style={WrapperStyle.container}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={require('../../assets/images/Login.png')}
        />
      </View>
      <Text style={Typograhpy.h1}>Log In</Text>
      <Text
        style={[
          Typograhpy.text,
          {
            marginBottom: 32,
          },
        ]}>
        An OTP code will be sent to your email
      </Text>

      <TextInput
        placeholderTextColor={COLORS.Text}
        style={FormStyle.input}
        placeholder="useless placeholder"
      />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 24,
          marginBottom: 32,
        }}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          tintColors={{
            true: 'rgba(0, 0, 0, 0.20)',
            false: 'rgba(0, 0, 0, 0.20)',
          }}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
        <Text style={[Typograhpy.label]}>
          By clicking "Next", I have read, understood, and given my{' '}
          <Text style={styles.noticeText}>consent</Text> and accepted the
          <Text style={styles.noticeText}> Terms of Use.</Text>
        </Text>
      </View>
      <TouchableOpacity style={FormStyle.submitBtn}>
        <Text style={Typograhpy.btnText}>Send Otp</Text>
      </TouchableOpacity>
      <Text
        style={[
          Typograhpy.text,
          {
            marginTop: 12,
            textAlign: 'center',
          },
        ]}>
        Don’t have an account?{' '}
        <Text style={styles.noticeText}>Sign Up Now</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 192,
    height: 180,
    // objectFit: 'cover',
    // objectPosition: 'center center',
  },
  imageWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 85,
    marginBottom: 48,
  },
  noticeText: {
    fontSize: 14,
    color: COLORS.Primary,
    fontWeight: '600',
    lineHeight: 20,
  },
});
