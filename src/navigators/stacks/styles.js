import {StyleSheet} from 'react-native';
import {
  OPEN_SANS_SEMIBOLD,
  FONT_SIZE_MD,
  STANDARD_SPACING,
} from '../../config/Constants';

// Exporting style
export default StyleSheet.create({
  leftArrowIcon: {
    marginLeft: STANDARD_SPACING * 3,
  },
  rightIcon:{
    marginRight: STANDARD_SPACING * 3,
  },
  headerTitle: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
  },
});
