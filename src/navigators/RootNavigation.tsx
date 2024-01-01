import {NavigationContainer} from '@react-navigation/native';

import StackNavigation from './StackNavigation';
import BottomTabNavigation from './BottomTabNavigation';

export default function RootNavigaion() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}
