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
      e => {
        scrollViewRef.current?.scrollTo({
          y: e.endCoordinates.height + 90,
          animated: true,
        });
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []); // Empty dependency array means this useEffect runs once (similar to componentDidMount)
  const scrollViewRef = React.useRef<ScrollView>(null);
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[{flex: 1, backgroundColor: '#fff'}]}>
        <ScrollView ref={scrollViewRef} style={style} bounces={false}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {children}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
