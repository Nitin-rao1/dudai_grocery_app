import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
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
  OPEN_SANS_REGULAR,
} from '../../config/Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';

// Exporting style
export default StyleSheet.create({
  container: {
    flex: STANDARD_FLEX,
  },
  ViewContentCOntainerStyle: {
    margin: STANDARD_SPACING * 3,
  },
  Imagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(100),
  },
  ImageStyle: {
    width: scale(50),
    height: scale(50),
  },
  discIconAndPointTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: STANDARD_SPACING * 3,
    margin: STANDARD_SPACING * 3,
  },
  pointTitle: {
    marginLeft: STANDARD_SPACING * 1.5,
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XS,
  },
  pointDetails: {
    fontFamily: OPEN_SANS_REGULAR,
    fontSize: FONT_SIZE_XXS,
  },
  branchName: {
    fontFamily: OPEN_SANS_REGULAR,
    fontSize: FONT_SIZE_XS,
  },
  branchinfo: {
    fontFamily: OPEN_SANS_REGULAR,
    fontSize: FONT_SIZE_XXS,
  },
  branchContainer: {
    borderWidth: 0.5,
    borderColor: Colors.inputBorderColor,
    borderRadius: wp('1'),
    width: wp('95'),
    alignSelf: 'center',
    marginTop: hp('1'),
  },
  borders: {
    backgroundColor: Colors.inputBorderColor,
    height: wp('0.2'),
    width: wp('95'),
    alignSelf: 'center',
    marginTop: hp('2'),
    marginBottom: hp('1.5'),
  },
});
