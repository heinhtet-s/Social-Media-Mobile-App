import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import React from 'react';

export default function KeyboardAvoidingWrapper({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'android' ? 75 : 0}
      style={{flex: 1}}>
      <ScrollView
        style={[
          {
            flex: 1,
            backgroundColor: 'white',
          },
          style,
        ]}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
