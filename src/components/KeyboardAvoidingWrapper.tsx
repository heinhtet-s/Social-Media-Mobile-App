import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, {useEffect} from 'react';

export default function KeyboardAvoidingWrapper({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  useEffect(() => {
    // Add listener for keyboard show event
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        scrollViewRef.current?.scrollToEnd({animated: true});
        // You can perform additional actions when the keyboard shows
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        scrollViewRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
        // You can perform additional actions when the keyboard hides
      },
    );
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []); // Empty dependency array means this useEffect runs once (similar to componentDidMount)
  const scrollViewRef = React.useRef<ScrollView>(null);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      style={[{flex: 1, backgroundColor: '#fff'}]}>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        style={style}
        bounces={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
