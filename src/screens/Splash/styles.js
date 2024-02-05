import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {IndependentColors} from '../../config/Colors';
import {
  FONT_SIZE_LG,
  FONT_SIZE_XS,
  OPEN_SANS_BOLD,
  OPEN_SANS_REGULAR,
  STANDARD_FLEX,
  STANDARD_SPACING,
} from '../../config/Constants';
import Colors from '../../constants/Colors';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  imageBackground: {
    position: 'relative',
    flex: STANDARD_FLEX,
  },
  imageBackgroundOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: IndependentColors.greyLightest,
    width: '100%',
    height: '100%',
  },
  logoWrapper: {
    width: scale(125),
    aspectRatio: 1,
    marginBottom: STANDARD_SPACING * 4,
  },
  logo: {
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'contain',
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_LG,
    textTransform: 'uppercase',
    color: IndependentColors.greyDarkest,
  },
  titleHighlighted: {
    color: Colors.primary,
  },
  message: {
    fontFamily: OPEN_SANS_REGULAR,
    fontSize: FONT_SIZE_XS,
    color: IndependentColors.greyDark,
  },
});
