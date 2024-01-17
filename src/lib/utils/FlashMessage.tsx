import {showMessage} from 'react-native-flash-message';
import {ErrorIcon, SuccessIcon} from '../../assets/images/svg';
import {COLORS} from '../../theme/theme';

export const SuccessMessage = (message: string) => {
  showMessage({
    message: message,
    type: 'success',
    icon: props => <SuccessIcon {...props} />,
    backgroundColor: COLORS.SuccessIconColor,
    color: COLORS.SuccessTextColor,
    style: {
      borderRadius: 8,
      marginHorizontal: 16,
      marginTop: 16,
    },
  });
};

export const ErrorMessage = (message: string) => {
  showMessage({
    message: message,
    type: 'danger',
    icon: props => <ErrorIcon {...props} />,
    backgroundColor: COLORS.ErrorIconColor,
    color: COLORS.ErrorTextColor,
    style: {
      borderRadius: 8,
      marginHorizontal: 16,
      marginTop: 16,
    },
  });
};
