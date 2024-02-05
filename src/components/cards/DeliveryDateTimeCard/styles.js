import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  OPEN_SANS_REGULAR,
  FONT_SIZE_XS,
  OPEN_SANS_MEDIUM,
  OPEN_SANS_BOLD,
  STANDARD_VECTOR_ICON_WRAPPER_SIZE,
  OPEN_SANS_SEMIBOLD,
} from '../../../config/Constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// Exporting style
export default StyleSheet.create({
  mainwrapper:{
    flexDirection:'row',
    // height: '100%',
    // width: '100%',
    // backgroundColor:'red',
    // borderWidth:2,
    // position:'absolute'
  },
  daytittle: {
    marginHorizontal:scale(4),
    borderRadius:scale(5),
    borderWidth: scale(1),
    padding:scale(2),
    width: wp('30%'),
    height: hp('5%'),
    justifyContent: 'center',
  },
  daytxt: {
    fontSize: scale(8),
    fontFamily:OPEN_SANS_SEMIBOLD,
    textAlign: 'center',
    justifyContent: 'center',
  },
  datetxt: {
    fontSize: scale(8),
    textAlign: 'center',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: hp('2'),
    // marginBottom: hp('10'),
    // paddingHorizontal: wp('2'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentTypeIconWrapper: {
    width: STANDARD_VECTOR_ICON_WRAPPER_SIZE,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: STANDARD_VECTOR_ICON_WRAPPER_SIZE / 2,
  },
  paymentTypeLabel: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XS,
    marginLeft: scale(7.5),
  },
  payeeWrapper: {
    marginTop: scale(5),
  },
  payeeNameAndCardNumberWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payeeName: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XS,
  },
  payeeCardNumber: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
  },
  footerMessage: {
    fontFamily: OPEN_SANS_REGULAR,
    fontSize: FONT_SIZE_XS,
    marginTop: scale(15),
  },
  addressTypeIconWrapper: {
    width: STANDARD_VECTOR_ICON_WRAPPER_SIZE,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: STANDARD_VECTOR_ICON_WRAPPER_SIZE / 2,
  },
});













