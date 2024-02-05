import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  OPEN_SANS_BOLD,
  FONT_SIZE_XS,
  FONT_SIZE_SM,
  OPEN_SANS_REGULAR,
  STANDARD_TEXT_TICKER_HEIGHT,
  STANDARD_TEXT_TICKER_PAGINATION_DOT_SIZE,
  STANDARD_TEXT_TICKER_PAGINATION_DOT_WRAPPER_SIZE,
  STANDARD_ORDER_ICON_WRAPPER_SIZE,
  STANDARD_FLEX,
  STANDARD_SPACING,
  SCREEN_WIDTH,
  STANDARD_Z_INDEX,
  OPEN_SANS_SEMIBOLD,
} from '../../config/Constants';
import { IndependentColors } from '../../config/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
    position: 'relative',
  },
  header: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: SCREEN_WIDTH,
    height: scale(75),
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tickerContainer: {
    overflow: 'hidden',
    height: STANDARD_TEXT_TICKER_HEIGHT,
  },
  tickerText: {
    textTransform: 'uppercase',
    fontFamily: OPEN_SANS_BOLD,
    fontSize: STANDARD_TEXT_TICKER_HEIGHT,
    lineHeight: STANDARD_TEXT_TICKER_HEIGHT,
  },
  paginationDotsContainer: {
    flexDirection: 'row',
    marginTop: scale(7.5),
  },
  animatedCircle: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: STANDARD_TEXT_TICKER_PAGINATION_DOT_WRAPPER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: STANDARD_TEXT_TICKER_PAGINATION_DOT_WRAPPER_SIZE,
    height: STANDARD_TEXT_TICKER_PAGINATION_DOT_WRAPPER_SIZE,
    borderWidth: scale(1.25),
    zIndex: STANDARD_Z_INDEX,
  },
  paginationDotWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: STANDARD_TEXT_TICKER_PAGINATION_DOT_WRAPPER_SIZE,
    height: STANDARD_TEXT_TICKER_PAGINATION_DOT_WRAPPER_SIZE,
  },
  paginationDot: {
    borderRadius: STANDARD_TEXT_TICKER_PAGINATION_DOT_SIZE / 2,
    width: STANDARD_TEXT_TICKER_PAGINATION_DOT_SIZE,
    height: STANDARD_TEXT_TICKER_PAGINATION_DOT_SIZE,
  },
  horizontalScrollView: {
    flex: STANDARD_FLEX,
  },
  slide: {
    width: SCREEN_WIDTH,
  },
  contentWrapper: {
    paddingHorizontal: STANDARD_SPACING * 3,
    flex: STANDARD_FLEX,
  },
  addButtonComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
  },
  cardComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
  },

  checkoutStatus: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
  },
  sectionTitle: {
    marginVertical: STANDARD_SPACING * 3,
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_SM,
  },
  textInputWrapper: {
    marginBottom: STANDARD_SPACING * 3,
  },
  orderSuccessCheckMarkWrapper: {
    width: STANDARD_ORDER_ICON_WRAPPER_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_ORDER_ICON_WRAPPER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderStatusTitle: {
    marginVertical: STANDARD_SPACING * 3,
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_SM,
  },
  orderStatusMessage: {
    fontFamily: OPEN_SANS_REGULAR,
    fontSize: FONT_SIZE_XS,
    textAlign: 'center',
    marginHorizontal: STANDARD_SPACING * 3,
    marginBottom: STANDARD_SPACING * 4,
  },
  timeSlotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(0),
    paddingVertical: scale(10),
  },
  timeSlotText: {
    color: IndependentColors.black,
    fontSize: scale(10),
    fontFamily: OPEN_SANS_REGULAR,
  },
  mainwrapper:{
    flexDirection:'row',
    // height: '100%',
    // width: '100%',
    backgroundColor:'red',
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
    // marginTop: hp('1'),
    // marginBottom: hp('10'),
    // paddingHorizontal: wp('2'),
  },
  pointCurrency: {
    // textAlign: 'center',
    justifyContent: 'flex-start',
    // marginBottom: 35,
    // marginLeft: 280,
  },
});
