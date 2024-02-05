import {StyleSheet} from 'react-native';
import {
  OPEN_SANS_BOLD,
  OPEN_SANS_MEDIUM,
  FONT_SIZE_MD,
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  STANDARD_CARD_MIN_HEIGHT,
  STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE,
  STANDARD_SPACING,
} from '../../../config/Constants';
import {scale} from 'react-native-size-matters';

// Exporting style
export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    minHeight: STANDARD_CARD_MIN_HEIGHT,
    borderRadius: STANDARD_CARD_MIN_HEIGHT * 0.2,
  },
  itemImageWrapper: {
    marginTop: scale(20),
    marginLeft: scale(15),
    marginRight: scale(15),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE * 0.2,
  },
  itemImage: {
    width: STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE * 0.6,
    height: STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE * 0.6,
    resizeMode: 'contain',
  },
  heartButtonWrapper: {
    position: 'absolute',
    transform: [
      {translateX: scale(0)},
      {translateY: -(STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE * 0.5)},
    ],
  },
  itemDetailsWrapper: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingRight: scale(15),
  },
  itemName: {
    marginBottom: scale(7.5),
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_SM,
  },
  itemPriceAndCartButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:scale('185'),
    height:scale('30'),
    // backgroundColor:'green'
  },
  itemPriceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemOriginalPrice: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
    textDecorationLine: 'line-through',
  },
  itemDiscountedPrice: {
    marginLeft: scale(7.5),
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_MD,
  },
  starIcon: {
    marginHorizontal: scale(5),
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XS,
  },
  ratingCount: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
  },
  itemQuantity: {
    paddingHorizontal: STANDARD_SPACING * 1.0,
  },
  itemQuantityWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // marginHorizontal: scale(8),
    bottom:scale(15),
    // backgroundColor:'pink'
  },
});
