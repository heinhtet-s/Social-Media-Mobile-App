import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FormStyle, Typograhpy, WrapperStyle} from '../../GlobalStyle';
import {COLORS} from '../../theme/theme';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import CustomTextInput from '../../components/CustomInput';
import SelectDropdown from 'react-native-select-dropdown';
import {
  SignUpFormData,
  SignUpSchema,
  useUserRegister,
} from '../../lib/services/SignUpService';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import CheckBox from '@react-native-community/checkbox';
import Config from 'react-native-config';
import {useGetCountries} from '../../lib/services/CountryServcie';
import {getData} from '../../lib/services';
import {Countries, CountriesResponse} from '../../lib/types/countries';
import {showMessage} from 'react-native-flash-message';
import {SuccessIcon} from '../../assets/images/svg';
import {ErrorMessage, SuccessMessage} from '../../lib/utils/FlashMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen({navigation}: {navigation: any}) {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      name: '',
      country: '',
      referral_code: '',
    },
  });
  const onSubmit = (data: SignUpFormData) => {
    mutate(data, {
      onSuccess: async data => {
        await AsyncStorage.setItem('token', data?.token ?? '');
        await AsyncStorage.setItem('user', JSON.stringify(data?.data));
        navigation.navigate('Otp');
        SuccessMessage('Successfuly Registered Please Verify Your Email');
      },
      onError: (error: any) => {
        ErrorMessage(error?.response?.data?.message);
      },
    });
  };
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const {
    data: countriesData,
    error: countriesError,
    isLoading: countriesLoading,
  } = useGetCountries<Countries[]>();

  const {mutate, isLoading} = useUserRegister();

  return (
    <KeyboardAvoidingWrapper style={WrapperStyle.container}>
      <>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={require('../../assets/images/Login.png')}
          />
        </View>
        <Text style={Typograhpy.h1}>Sign up</Text>
        <Text
          style={[
            Typograhpy.text,
            {
              marginBottom: 32,
            },
          ]}>
          An OTP code will be sent to your email
        </Text>

        <CustomTextInput
          name="email"
          errors={errors.email}
          control={control}
          placeholder="Enter your email address"
        />
        <CustomTextInput
          name="name"
          errors={errors.name}
          control={control}
          placeholder="Enter your name"
        />
        <Controller
          control={control}
          name="country"
          render={({field: {onChange, value}}) => (
            <SelectDropdown
              data={countriesData?.data ?? []}
              onSelect={(selectedItem, index) => onChange(selectedItem?.name)}
              search={true}
              searchInputStyle={{
                borderBottomColor: '#eee',
                borderBottomWidth: 1,
              }}
              defaultButtonText="Select a Country"
              searchInputTxtColor={COLORS.Text}
              searchPlaceHolder="Search Country"
              buttonStyle={{
                backgroundColor: 'white',
                marginTop: 10,
                width: '100%',

                borderRadius: 8,

                marginBottom: 10,
              }}
              buttonTextStyle={{
                color: COLORS.Text,
                fontSize: 16,
                fontWeight: '300',
                fontFamily: 'Open Sans',
                textAlign: 'left',
              }}
              rowStyle={{
                backgroundColor: 'white',
                borderBottomColor: '#eee',
                borderBottomWidth: 1,
                height: 56,
              }}
              rowTextStyle={{
                color: COLORS.Text,
                fontSize: 16,
                paddingLeft: 16,
                fontWeight: '300',
                fontFamily: 'Open Sans',
                textAlign: 'left',
              }}
              dropdownStyle={{
                backgroundColor: 'white',

                borderRadius: 8,

                marginBottom: 24,
              }}
              selectedRowStyle={{
                backgroundColor: COLORS.Primary,
              }}
              selectedRowTextStyle={{
                color: COLORS.White,
                fontSize: 16,
                fontWeight: '300',
                fontFamily: 'Open Sans',
                textAlign: 'left',
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem?.name;
              }}
              rowTextForSelection={(item, index) => {
                return item?.name;
              }}
            />
          )}
        />
        <CustomTextInput
          name="referral_code"
          errors={errors.referral_code}
          control={control}
          placeholder="Enter referral code (optional)"
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 24,
            marginBottom: 24,
          }}>
          {Platform.OS === 'ios' ? (
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              style={{
                width: 20,
                height: 20,
                marginRight: 12,
              }}
              boxType="square"
              onFillColor={COLORS.Primary}
              onCheckColor={COLORS.White}
              onTintColor="transparent"
              // tintColors={{
              //   true: COLORS.Primary,
              //   false: 'rgba(0, 0, 0, 0.20)',
              // }}
              onValueChange={newValue => {
                setToggleCheckBox(newValue);
              }}
            />
          ) : (
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              boxType="square"
              onFillColor={COLORS.Primary}
              onCheckColor={COLORS.White}
              onTintColor={COLORS.Primary}
              tintColors={{
                true: COLORS.Primary,
                false: 'rgba(0, 0, 0, 0.20)',
              }}
              onValueChange={newValue => {
                setToggleCheckBox(newValue);
              }}
            />
          )}

          <Text style={[Typograhpy.label]}>
            By clicking "Next", I have read, understood, and given my{' '}
            <Text style={styles.noticeText}>consent</Text> and accepted the
            <Text style={styles.noticeText}> Terms of Use.</Text>
          </Text>
        </View>
        <TouchableOpacity
          disabled={!toggleCheckBox}
          onPress={handleSubmit(onSubmit)}
          style={toggleCheckBox ? FormStyle.submitBtn : FormStyle.disabledBtn}>
          <Text style={Typograhpy.btnText}>Sign up</Text>
        </TouchableOpacity>

        <Text
          style={[
            Typograhpy.text,
            {
              marginTop: 12,
              marginBottom: 60,
              textAlign: 'center',
            },
          ]}>
          Don’t have an account?{' '}
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.noticeText}>Sign Up Now</Text>
          </TouchableWithoutFeedback>
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
    marginBottom: 48,
  },
  noticeText: {
    fontSize: 14,
    color: COLORS.Primary,
    fontWeight: '600',
    lineHeight: 20,
  },
});
