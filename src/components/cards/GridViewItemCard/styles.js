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

// Exporting style
export default StyleSheet.create({
  card: {
    justifyContent: 'center',
    padding: scale(10),
    position: 'relative',
    minHeight: STANDARD_GRID_VIEW_PRODUCT_CARD_MIN_HEIGHT,
    borderRadius: STANDARD_GRID_VIEW_PRODUCT_CARD_MIN_HEIGHT * 0.08,//0.1
  },
  squareButtonComponentWrapper: {
    position: 'absolute',
    left: scale(10),
    top: scale(10),
  },
  itemImageWrapper: {
    alignSelf: 'center',
    marginVertical: scale(10),
    alignItems:'center',
    justifyContent:'center',
    width:SCREEN_WIDTH * 0.15,
    aspectRatio: 1.0,
    // backgroundColor: 'red',
  },
  itemImage: {
    width: scale(60),
    height: scale(60),
    // flex: STANDARD_FLEX,
    resizeMode: 'contain',
  },
  itemName: {
    // marginBottom: scale(1.5),
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
  },
  itemOriginalPrice: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XXS,
    textDecorationLine: 'line-through',
  },
  itemweight: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XXS,
    // textDecorationLine: 'line-through',
  },
  itemDiscountedPrice: {
    marginLeft: scale(5),
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XS,
  },
  ratingWrapper: {
    marginBottom: scale(7.5),
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
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_XS,
  },
});
