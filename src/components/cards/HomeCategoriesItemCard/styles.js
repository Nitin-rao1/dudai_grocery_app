import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  OPEN_SANS_SEMIBOLD,
  FONT_SIZE_XS,
  STANDARD_HOME_CATEGORIES_CAROUSEL_ITEM_WRAPPER_WIDTH,
  STANDARD_SPACING,
  STANDARD_FLEX,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  categoryWrapper: {
    width: STANDARD_HOME_CATEGORIES_CAROUSEL_ITEM_WRAPPER_WIDTH,
    height: STANDARD_HOME_CATEGORIES_CAROUSEL_ITEM_WRAPPER_WIDTH * 1.5,
    borderWidth: scale(1),
    borderRadius: STANDARD_HOME_CATEGORIES_CAROUSEL_ITEM_WRAPPER_WIDTH * 0.1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: STANDARD_SPACING * 1.5,
  },
  categoryImageWrapper: {
    width: STANDARD_HOME_CATEGORIES_CAROUSEL_ITEM_WRAPPER_WIDTH * 0.9,
    aspectRatio: 1,
    // borderRadius:
    //   (STANDARD_HOME_CATEGORIES_CAROUSEL_ITEM_WRAPPER_WIDTH * 0.6) / 2,
    padding: STANDARD_SPACING * 1,
  },
  categoryImage: {
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'contain',
  },
  categoryLabel: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_XS,
    textAlign:'center'
  },
});
