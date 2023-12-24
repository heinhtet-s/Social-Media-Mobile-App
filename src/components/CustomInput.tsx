import {View, Text, TextInput, Image} from 'react-native';
import React from 'react';
import {FormStyle} from '../GlobalStyle';
import {COLORS} from '../theme/theme';
// import {WarningIcon} from '../assets/images/WarningIcon';
type CustomInputProps = {
  name: string;

  errors: any;
  register: any;
  placeholder: string;
};
const CustomInput = ({
  name,
  errors,
  register,
  placeholder,
}: CustomInputProps) => {
  return (
    <>
      <TextInput
        style={[
          FormStyle.input,
          errors && {borderColor: COLORS.Primary, borderWidth: 1},
        ]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.Text}
      />
      {true && (
        <View>
          {/* <WarningIcon /> */}
          <Text
            style={{
              alignItems: 'center',
              color: COLORS.Primary,
              fontSize: 14,
              fontWeight: '400',
            }}>
            {errors?.message || 'This field is required'}
          </Text>
        </View>
      )}
    </>
  );
};

export default CustomInput;
