import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import React, {useEffect, useRef, useState} from 'react';
import {FormStyle, Typograhpy, WrapperStyle} from '../../GlobalStyle';
import {COLORS} from '../../theme/theme';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoginFormData, LoginSchema} from '../../lib/services/LoginService';
import ArrowLeft from '../../assets/images/svg/LeftArrow.svg';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import BackButton from '../../components/BackButton';

export default function OTPScreen({navigation}: {navigation: any}) {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate('Home');
  };
  console.log('error', errors);
  const otpRef = useRef<any>(null);

  useEffect(() => {
    setTimeout(() => otpRef.current.focusField(0), 250);
  }, []);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <ScrollView style={WrapperStyle.container}>
      <BackButton />
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={require('../../assets/images/OtpBg.png')}
        />
      </View>
      <Text style={Typograhpy.h1}>Enter OTP</Text>
      <Text style={[Typograhpy.text]}>
        An OTP code will be sent to your email
      </Text>
      <View>
        <OTPInputView
          ref={otpRef}
          style={{width: '100%', height: 200}}
          pinCount={6}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.underlineStyleBase}
          onCodeFilled={code => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={FormStyle.submitBtn}>
        <Text style={Typograhpy.btnText}>Login</Text>
      </TouchableOpacity>
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
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  underlineStyleBase: {
    borderRadius: 8,
    height: 64,
    borderWidth: 0,
    backgroundColor: COLORS.White,
    color: COLORS.Text,
  },
});
