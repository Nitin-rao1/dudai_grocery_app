import {StyleSheet} from 'react-native';
import {
  STANDARD_TEXT_INPUT_HEIGHT,
  STANDARD_HOME_MAIN_CAROUSEL_WIDTH,
  STANDARD_HOME_MAIN_CAROUSEL_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_FLEX,
  STANDARD_SPACING,
  CONTENT_SPACING,
  CONTROL_BUTTON_SIZE,
  SAFE_AREA_PADDING,
} from '../../config/Constants';
import {scale} from 'react-native-size-matters';
import {IndependentColors} from '../../config/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Exporting style
export default StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  // button: {
  //   marginBottom: CONTENT_SPACING,
  //   width: CONTROL_BUTTON_SIZE,
  //   height: CONTROL_BUTTON_SIZE,
  //   borderRadius: CONTROL_BUTTON_SIZE / 2,
  //   backgroundColor: 'rgba(140, 140, 140, 0.3)',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // rightButtonRow: {
  //   position: 'absolute',
  //   // right: SAFE_AREA_PADDING.paddingRight,
  //   // top: SAFE_AREA_PADDING.paddingTop,
  // },
  // backButton: {
  //   position: 'absolute',
  //   // left: SAFE_AREA_PADDING.paddingLeft,
  //   // top: SAFE_AREA_PADDING.paddingTop,
  // },

  // searchbarTextInput: {
  //   width: SCREEN_WIDTH * 0.65,
  //   height: STANDARD_TEXT_INPUT_HEIGHT,
  //   borderRadius: STANDARD_TEXT_INPUT_HEIGHT * 0.2,
  //   paddingLeft: STANDARD_SPACING * 3,
  //   justifyContent: 'space-between',
  //   padding: wp('1.5'),
  //   marginTop: hp('0.95'),
  // },
  // searchbarWrapper: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   margin: STANDARD_SPACING * 4,
  // },
  // header: {
  //   marginTop: hp('1.5'),
  // },
  // qrcode: {
  //   marginRight: hp('1'),
  //   marginTop: hp('0.95'),
  //   flexDirection: 'row',
  // },
  // camera: {
  //   marginTop: 20,
  //   width: '50%',
  //   height: '50%',
  //   alignItems: 'center',
  // },

  // container: {
  //   flex: STANDARD_FLEX,
  // },
  // wishlistItemCardComponentWrapper: {
  //   marginBottom: STANDARD_SPACING * 3,
  //   marginHorizontal: STANDARD_SPACING * 3,
  // },
  // wishlistItemCardComponentWrapperWithTopMargin: {
  //   marginTop: STANDARD_SPACING * 3,
  // },
  // orderagainview: {
  //   width: wp('100'),
  //   flexWrap: 'wrap',
  //   // borderWidth: 1,
  //   // justifyContent: 'space-between',
  //   // marginLeft: 20,
  //   flexDirection: 'row',
  //   alignSelf: 'center',
  // },
  // OrderWrapper: {
  //   width: wp('30'),
  //   marginTop: wp('2.5'),
  //   marginLeft: wp('2.5'),
  // },

  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  wishlistItemCardComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
    marginHorizontal: STANDARD_SPACING * 3,
  },
  wishlistItemCardComponentWrapperWithTopMargin: {
    marginTop: STANDARD_SPACING * 3,
  },
  orderagainview: {
    width: wp('100'),
    flexWrap: 'wrap',
    // borderWidth: 1,
    // justifyContent: 'space-between',
    // marginLeft: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  OrderWrapper: {
    width: wp('30'),
    marginTop: wp('2.5'),
    marginLeft: wp('2.5'),
  },
});
