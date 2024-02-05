import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  OPEN_SANS_BOLD,
  OPEN_SANS_MEDIUM,
  OPEN_SANS_SEMIBOLD,
  FONT_SIZE_LG,
  FONT_SIZE_MD,
  FONT_SIZE_SM,
  STANDARD_CARD_MIN_HEIGHT,
  STANDARD_PRODUCT_IMAGE_WRAPPER_SIZE,
} from '../../../config/Constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
  trashButtonWrapper: {
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
    marginBottom: scale(1.5),
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_SM,
  },
  itemPriceQuantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth:1,
    // width:wp('55')
  },
  itemPrice: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: scale(13),
    // textAlign:'center',
    // borderWidth:2

  },
  itemQuantityIncreaseDecreaseButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width:wp('27')
  },
  quantity: {
    paddingHorizontal: scale(1.5),
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
    textAlign:'center'
  },
});
