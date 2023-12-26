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
import {FormStyle, Typograhpy, WrapperStyle} from '../../GlobalStyle';
import {COLORS} from '../../theme/theme';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {LoginFormData, LoginSchema} from '../../lib/services/LoginService';
import CustomInput from '../../components/CustomInput';
import CustomTextInput from '../../components/CustomInput';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
export default function LoginScreen({navigation}: {navigation: any}) {
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
    navigation.navigate('OtpScreen');
  };
  console.log('error', errors);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <KeyboardAvoidingWrapper style={WrapperStyle.container}>
      <>
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
        <View>
          {/* <CustomInput errors={errors} /> */}
          {/* <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="First name"
              onBlur={onBlur}
              onChangeText={onChange}
              style={[
                FormStyle.input,
                errors.email && {borderColor: COLORS.Primary, borderWidth: 1},
              ]}
              value={value}
            />
          )}
          name="email"
        /> */}

          <CustomTextInput
            name="email"
            errors={errors.email}
            control={control}
            placeholder="Email"
          />
        </View>
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
              true: COLORS.Primary,
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
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={FormStyle.submitBtn}>
          <Text style={Typograhpy.btnText}>Send Otp</Text>
        </TouchableOpacity>
        <Text
          style={[
            Typograhpy.text,
            {
              marginTop: 12,
              marginBottom: 30,
              textAlign: 'center',
            },
          ]}>
          Don’t have an account?{' '}
          <Text style={styles.noticeText}>Sign Up Now</Text>
        </Text>
      </>
    </KeyboardAvoidingWrapper>
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
    marginTop: 20,
    marginBottom: 48,
  },
  noticeText: {
    fontSize: 14,
    color: COLORS.Primary,
    fontWeight: '600',
    lineHeight: 20,
  },
});
