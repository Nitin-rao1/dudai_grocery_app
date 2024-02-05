import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  OPEN_SANS_BOLD,
  FONT_SIZE_MD,
  STANDARD_BUTTON_HEIGHT,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  label: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_MD,
  },
  button: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: STANDARD_BUTTON_HEIGHT,
    borderRadius: STANDARD_BUTTON_HEIGHT * 0.2,
    paddingHorizontal: scale(15),
  },
});
