import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  OPEN_SANS_REGULAR,
  FONT_SIZE_XS,
  OPEN_SANS_MEDIUM,
  OPEN_SANS_SEMIBOLD,
  FONT_SIZE_XXS,
  STANDARD_USER_AVATAR_WRAPPER_SIZE,
  STANDARD_CARD_MIN_HEIGHT,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  buyerReviewCard: {
    padding: scale(15),
    minHeight: STANDARD_CARD_MIN_HEIGHT,
    borderRadius: STANDARD_CARD_MIN_HEIGHT * 0.2,
    justifyContent: 'space-between',
  },
  buyerReviewCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buyerImageNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buyerImageWrapper: {
    width: STANDARD_USER_AVATAR_WRAPPER_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.5,
  },
  buyerImage: {
    width: null,
    height: null,
    resizeMode: 'contain',
    flex: 1,
  },
  buyerNameAndReviewAgeWrapper: {
    marginLeft: scale(15),
  },
  buyerName: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_XS,
  },
  reviewAge: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XXS,
  },
  ratingStarsWrapper: {
    flexDirection: 'row',
  },
  review: {
    marginTop: scale(7.5),
    fontFamily: OPEN_SANS_REGULAR,
    fontSize: FONT_SIZE_XS,
  },
});
