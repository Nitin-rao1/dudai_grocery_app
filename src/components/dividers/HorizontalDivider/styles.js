import {StyleSheet} from 'react-native';
import {OPEN_SANS_MEDIUM, FONT_SIZE_SM} from '../../../config/Constants';
import {scale} from 'react-native-size-matters';

// Exporting style
export default StyleSheet.create({
  dividerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerLine: {
    width: scale(100),
    height: scale(2),
  },
  dividerLineLeft: {
    borderRadius: scale(5),
    marginRight: scale(10),
  },
  dividerLineRight: {
    borderRadius: scale(5),
    marginLeft: scale(10),
  },
  dividerLabel: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_SM,
  },
});
