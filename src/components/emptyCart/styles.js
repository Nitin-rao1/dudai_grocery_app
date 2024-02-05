import {StyleSheet} from 'react-native';
import {
  FONT_SIZE_MD,
  OPEN_SANS_BOLD,
  STANDARD_FLEX,
  STANDARD_LOTTIE_VIEW_WRAPPER_SIZE,
  STANDARD_SPACING,
} from '../../config/Constants';
import {scale} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';

// Exporting style
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.white,
  },
  mainWrapper: {
    flex: STANDARD_FLEX,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  emptyimagewrapper: {
    height: hp('100%'),
    width: wp('100%'),
  },
  lottieViewWrapper: {
    width: STANDARD_LOTTIE_VIEW_WRAPPER_SIZE,
    aspectRatio: 1,
    alignSelf: 'center',
    width: scale(300),
    height: scale(300),
  },
  imageViewWrapper: {
    // width: STANDARD_LOTTIE_VIEW_WRAPPER_SIZE,
    // aspectRatio: 1,
    // alignSelf: 'center',
    // flex:1,
    // alignItems:'center',
    // justifyContent:'center',
    width: scale(250),
    height: scale(250),
    backgroundColor:Colors.white
  },
  pointTitle: {
    alignSelf: 'center',
    marginTop: STANDARD_SPACING * 4.5,
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_MD,
  },
  StartShoppingButtonComponentWrapper: {
    marginTop: STANDARD_SPACING * 4.5,
    alignSelf: 'center',
  },
  img:{
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'contain',
  }
});
