import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import { IndependentColors } from '../../config/Colors';
import {
  FONT_SIZE_SM,
  OPEN_SANS_MEDIUM,
  OPEN_SANS_SEMIBOLD,
  FONT_SIZE_MD,
  OPEN_SANS_BOLD,
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
  STANDARD_FLEX,
  STANDARD_SPACING,
  STANDARD_BORDER_RADIUS,
} from '../../config/Constants';
import Colors from '../../constants/Colors';

// Exporting style
export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: Colors.white,
  },
  passwordModal: {
    padding: 8,
  },

  newPassword: {
    padding: 8,
  },
  confirmPassword: {
    padding: 8,
  },
  errorText: {
    color: IndependentColors.red,
    fontSize: scale(8),
 
    // borderWidth:2
  },
});
