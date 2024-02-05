import {StyleSheet} from 'react-native';
import {
  OPEN_SANS_SEMIBOLD,
  FONT_SIZE_XL,
  FONT_SIZE_MD,
  STANDARD_DRAWER_MENU_ICON_WRAPPER_SIZE,
  STANDARD_USER_AVATAR_WRAPPER_SIZE,
  STANDARD_TEXT_INPUT_HEIGHT,
  STANDARD_HOME_MAIN_CAROUSEL_WIDTH,
  STANDARD_HOME_MAIN_CAROUSEL_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_FLEX,
  STANDARD_SPACING,
  STANDARD_BORDER_RADIUS,
  STANDARD_BANNER_WRAPPER_HEIGHT,
  FONT_SIZE_XXS,
  FONT_SIZE_XS,
  OPEN_SANS_BOLD,
  OPEN_SANS_MEDIUM,
} from '../../config/Constants';
import {scale} from 'react-native-size-matters';
import {IndependentColors} from '../../config/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },

  ///camera

  container: {
    flex: 1,
  },
  cameraView: {
    // flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    // backgroundColor: 'red',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: 'orange',
    borderWidth: 2,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: {flexDirection: 'row'},

  modalContent: {
    width: '100%',
    height: '100%',
  },

  closeeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
});
