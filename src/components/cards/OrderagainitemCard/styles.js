import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  OPEN_SANS_BOLD,
  OPEN_SANS_MEDIUM,
  FONT_SIZE_MD,
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  STANDARD_GRID_VIEW_PRODUCT_CARD_MIN_HEIGHT,
  STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE,
  STANDARD_FLEX,
  OPEN_SANS_SEMIBOLD,
  FONT_SIZE_XXS,
  SCREEN_WIDTH,
} from '../../../config/Constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// Exporting style
export default StyleSheet.create({
  card: {
    justifyContent: 'center',
    // padding: scale(4),
    // position: 'relative',
    height: wp('40'),
    borderRadius: STANDARD_GRID_VIEW_PRODUCT_CARD_MIN_HEIGHT * 0.08,//0.1
    
  },
  squareButtonComponentWrapper: {
    justifyContent:'space-between',
    flexDirection:'row',
    position: 'absolute',
    // left: scale(6),
    // top: scale(6),
    // borderWidth:2,
    width:wp('30'),
    zIndex:1,
  },
  itemImageWrapper: {
    alignSelf: 'center',
    marginVertical: scale(10),
    alignItems:'center',
    justifyContent:'center',
    width:SCREEN_WIDTH * 0.18,
    aspectRatio: 1.0,
    // backgroundColor: 'red',
  },
  itemImage: {
    width: scale(75),
    height: scale(75),
    // flex: STANDARD_FLEX,
    resizeMode: 'contain',
    zIndex:0,
  },
  itemName: {
    // marginBottom: scale(1.5),
    paddingLeft:wp('1'),
    paddingRight:wp('1'),
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: scale(8),
  },
  itemOriginalPrice: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: hp('1'),
    textDecorationLine: 'line-through',
    paddingLeft:wp('1'),
    // paddingRight:wp('1'),
  },
  itemweight: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: scale(6),
    paddingLeft:wp('1'),
    paddingRight:wp('1'),
    // textDecorationLine: 'line-through',
  },
  itemDiscountedPrice: {
    marginLeft: scale(5),
    fontFamily: OPEN_SANS_BOLD,
    fontSize: scale(8),
  },
  ratingWrapper: {
    // marginBottom: scale(7.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStarsWrapper: {
    flexDirection: 'row',
  },
  rating: {
    // marginHorizontal: scale(5),
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XS,
  },
  ratingCount: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
  },
  itemQuantityIncreaseDecreaseButtonWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemPriceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor:'red'
  },
  quantity: {
    paddingHorizontal: scale(1.5),
    fontFamily: OPEN_SANS_BOLD,
    fontSize: scale(12),
  },
});
