import {StyleSheet} from 'react-native';
import {FONT_SIZE_MD, FONT_SIZE_XS, OPEN_SANS_BOLD, STANDARD_FLEX, STANDARD_LOTTIE_VIEW_WRAPPER_SIZE, STANDARD_SPACING} from '../../config/Constants';
import { scale } from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { IndependentColors } from '../../config/Colors';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  cartItemCardComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
    marginHorizontal: STANDARD_SPACING * 3,
  },
  cartItemCardComponentWrapperWithTopMargin: {
    marginTop: STANDARD_SPACING * 3,
  },
  checkoutButtonComponentWrapper: {
    paddingHorizontal: STANDARD_SPACING * 3,
  },
  emptyimagewrapper:{
    height:hp('100%'),
    width:wp('100%'),
    // flex: STANDARD_FLEX,
    // backgroundColor:'red',
    // alignSelf:'center',
    // justifyContent:'center'
  },
  // emptyimage: {
  //   marginTop: STANDARD_SPACING * 16,
  //   tintColor: Colors.primary,
  //   // backgroundColor:'pink',
  //   alignSelf:'center',
  //   justifyContent:'center',
  //   width: scale(300),
  //   height:scale(300),
  // },
  pointTitle: {
    alignSelf:'center',
    marginTop: STANDARD_SPACING * 4.5,
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_MD,
  },
  StartShoppingButtonComponentWrapper:{
    // paddingHorizontal: STANDARD_SPACING * 5,
    // paddingVertical: STANDARD_SPACING * 35,
    // position:'absolute',
    // bottom:scale(150),
    marginTop: STANDARD_SPACING * 4.5,
    alignSelf:'center'
  },
  lottieViewWrapper: {
    width: STANDARD_LOTTIE_VIEW_WRAPPER_SIZE,
    aspectRatio: 1,
    alignSelf:'center',
    width: scale(300),
    height:scale(300),
  },
});
