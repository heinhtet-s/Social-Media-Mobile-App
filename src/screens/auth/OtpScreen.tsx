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
import {useForm, Controller, set} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoginFormData, LoginSchema} from '../../lib/services/LoginService';
import ArrowLeft from '../../assets/images/svg/LeftArrow.svg';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import BackButton from '../../components/BackButton';
import {useGetOtp, useVerifyEmail} from '../../lib/services/VerifyService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ErrorMessage, SuccessMessage} from '../../lib/utils/FlashMessage';

export default function OTPScreen({navigation}: {navigation: any}) {
  const [seconds, setSeconds] = useState(60);
  const [showResend, setShowResend] = useState(false);
  const {mutate: otpSubmit, isLoading: otpLoading} = useVerifyEmail();
  const {mutate: resendOtp, isLoading: resendLoading} = useGetOtp();

  const otpRef = useRef<any>(null);
  const [otp, setOtp] = useState('');
  const getOtp = async () => {
    setSeconds(60);
    resendOtp(null, {
      onSuccess: (res: any) => {
        SuccessMessage('Otp Sent Successfully');
      },
      onError: (res: any) => {
        ErrorMessage(res?.response?.data?.message);
      },
    });
  };

  const onSubmit = () => {
    otpSubmit(
      {
        verificationCode: otp,
      },
      {
        onSuccess: async data => {
          await AsyncStorage.setItem('isLogin', 'true');
          navigation.navigate('HomePage');
        },
        onError: (error: any) => {
          ErrorMessage(error?.response?.data?.message);
        },
      },
    );
  };
  useEffect(() => {
    setTimeout(() => otpRef.current.focusField(0), 250);
  }, []);

  useEffect(() => {
    const coundSeconds = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);
    if (seconds === 0) {
      setShowResend(true);
      clearInterval(coundSeconds);
    }
    return () => {
      clearInterval(coundSeconds);
      setShowResend(false);
    };
  }, [seconds]);

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
          code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={code => {
            setOtp(code);
          }}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.underlineStyleBase}
          onCodeFilled={code => {
            // onSubmit(code);
          }}
        />
      </View>

      {showResend ? (
        <TouchableOpacity style={FormStyle.submitBtn} onPress={getOtp}>
          <Text style={Typograhpy.btnText}>Resend OTP</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text style={styles.noticeText}>
            {showResend ? 'Resend OTP' : `Resend OTP in ${seconds}s`}
          </Text>
          <TouchableOpacity
            disabled={otpLoading || otp.length < 6}
            onPress={onSubmit}
            style={FormStyle.submitBtn}>
            <Text style={Typograhpy.btnText}>Submit</Text>
          </TouchableOpacity>
        </>
      )}
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
