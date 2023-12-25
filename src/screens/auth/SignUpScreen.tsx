import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {FormStyle, Typograhpy, WrapperStyle} from '../../GlobalStyle';
import {COLORS} from '../../theme/theme';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import CustomTextInput from '../../components/CustomInput';
import SelectDropdown from 'react-native-select-dropdown';
import {SignUpFormData, SignUpSchema} from '../../lib/services/SignUpService';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
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
  const [selected, setSelected] = React.useState('');
  const countries = [
    'Egypt',
    'Canada',
    'Australia',
    'Ireland',
    'UD',
    'UK',
    'USA',
    'Germany',
    'France',
    'Italy',
    'Spain',
    'Netherlands',
  ];
  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate('OtpScreen');
  };
  console.log('error', errors);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <KeyboardAvoidingWrapper style={WrapperStyle.container}>
      <View>
        {/* <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={require('../../assets/images/Login.png')}
          />
        </View> */}

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
          errors={errors.email}
          control={control}
          placeholder="Enter your name"
        />
        <Controller
          control={control}
          name="country"
          render={({field: {onChange, value}}) => (
            <SelectDropdown
              data={countries}
              onSelect={(selectedItem, index) => onChange(selectedItem)}
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
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
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
              textAlign: 'center',
            },
          ]}>
          Don’t have an account?{' '}
          <Text style={styles.noticeText}>Sign Up Now</Text>
        </Text>
      </View>
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
