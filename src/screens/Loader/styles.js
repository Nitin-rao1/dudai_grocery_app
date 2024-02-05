import {StyleSheet} from 'react-native';
import {
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  OPEN_SANS_BOLD,
  OPEN_SANS_REGULAR,
  STANDARD_FLEX,
  STANDARD_LOTTIE_VIEW_WRAPPER_SIZE,
} from '../../config/Constants';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieViewWrapper: {
    width: STANDARD_LOTTIE_VIEW_WRAPPER_SIZE,
    aspectRatio: 1,
  },
  title: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_SM,
  },
  message: {
    fontFamily: OPEN_SANS_REGULAR,
    fontSize: FONT_SIZE_XS,
  },
});
