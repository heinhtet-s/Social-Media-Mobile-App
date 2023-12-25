import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import ArrowLeft from '../assets/images/svg/LeftArrow.svg';
import {useNavigation} from '@react-navigation/native';

export default function BackButton() {
  const navigate = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigate.goBack()}>
      <ArrowLeft height={24} />
    </TouchableWithoutFeedback>
  );
}
