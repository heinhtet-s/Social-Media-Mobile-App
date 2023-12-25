import {StyleSheet} from 'react-native';
import {COLORS} from './theme/theme';

export const Typograhpy = StyleSheet.create({
  h1: {
    color: COLORS.Text,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  text: {
    color: COLORS.Text,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '300',
  },
  label: {
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 20,
    color: COLORS.Text,
    flex: 1,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28,
    color: COLORS.White,
  },
});

export const FormStyle = StyleSheet.create({
  input: {
    display: 'flex',
    height: 48,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.White,
    fontWeight: '300',
    marginBottom: 10,
    // elevation: 2,
    // shadowOffset: {
    //   width: 10,
    //   height: 20,
    // },
    // shadowColor: 'rgba(0, 0, 0, 5)',
    color: COLORS.Text,
  },

  submitBtn: {
    paddingHorizontal: 32,
    paddingVertical: 7,
    borderRadius: 160,
    alignItems: 'center',

    backgroundColor: COLORS.Primary,
  },
});
export const WrapperStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Background,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
});
