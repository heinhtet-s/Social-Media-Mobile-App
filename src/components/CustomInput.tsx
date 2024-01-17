import {View, Text, TextInput, Image} from 'react-native';
import React from 'react';
import {FormStyle} from '../GlobalStyle';
import {COLORS} from '../theme/theme';
import WarningIcon from '../assets/images/svg/WarningIcon.svg';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  FieldError,
} from 'react-hook-form';
interface CustomTextInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  errors: FieldError | undefined;
  placeholder: string;
}
const CustomTextInput = <T extends FieldValues>({
  control,
  name,
  errors,
  placeholder,
  ...props
}: CustomTextInputProps<T>) => {
  return (
    <>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            {...props}
            placeholder={placeholder}
            placeholderTextColor={COLORS.Text}
            onBlur={onBlur}
            onChangeText={onChange}
            style={[
              FormStyle.input,
              errors && {borderColor: COLORS.Primary, borderWidth: 1},
            ]}
            value={value}
          />
        )}
        name={name}
      />
      {errors && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <WarningIcon height={20} />

          <Text
            style={{
              alignItems: 'center',
              color: COLORS.Primary,
              fontSize: 14,
              fontWeight: '400',
              marginLeft: 4,
              lineHeight: 20,
            }}>
            {errors?.message}
            {/* {errors[name]?.message || 'This field is required'} */}
          </Text>
        </View>
      )}
    </>
  );
};

export default CustomTextInput;
