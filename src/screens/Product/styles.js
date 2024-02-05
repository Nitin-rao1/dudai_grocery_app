import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  OPEN_SANS_BOLD,
  FONT_SIZE_SM,
  OPEN_SANS_REGULAR,
  FONT_SIZE_XS,
  FONT_SIZE_MD,
  OPEN_SANS_MEDIUM,
  OPEN_SANS_SEMIBOLD,
  FONT_SIZE_XXS,
  STANDARD_FLEX,
  STANDARD_SPACING,
} from '../../config/Constants';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  carouselWrapper: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  flatlist: {
    flex: STANDARD_FLEX,
  },
  carouselItemWrapper: {
    flex: STANDARD_FLEX,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselItemImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftNavigationControlWrapper: {
    position: 'absolute',
    left: 0,
    top: '50%',
  },
  rightNavigationControlWrapper: {
    position: 'absolute',
    right: 0,
    top: '50%',
  },
  itemDetailsWrapper: {
    flex: STANDARD_FLEX,
  },
  itemTitleRatingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: STANDARD_SPACING * 3,
    paddingTop: STANDARD_SPACING * 3,
  },
  itemTitle: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_MD,
    flex: STANDARD_FLEX,
  },
  itemRatingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 0.75,
  },
  starIcon: {
    marginRight: STANDARD_SPACING,
  },
  rating: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_SM,
  },
  ratingCount: {
    marginHorizontal: STANDARD_SPACING * 1.5,
    fontFamily: OPEN_SANS_REGULAR,
    fontSize: FONT_SIZE_SM,
  },
  sectionTitle: {
    margin: STANDARD_SPACING * 3,
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_SM,
  },
  badgePillComponentWrapper: {
    paddingHorizontal: STANDARD_SPACING * 1,
  },
  ingredientScrollViewContentContainer: {
    marginHorizontal: STANDARD_SPACING * 1.5,
  },
  ingredientWrapper: {
    borderRadius: STANDARD_SPACING * 2,
    marginHorizontal: STANDARD_SPACING * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(60),
    height: scale(75),
  },
  ingredientImage: {
    marginBottom: STANDARD_SPACING,
  },
  ingredientTitle: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_XXS,
  },
  itemDescription: {
    paddingHorizontal: STANDARD_SPACING * 3,
    fontFamily: OPEN_SANS_REGULAR,
    fontSize: FONT_SIZE_XS,
  },
  itemPriceAndQunatityWrapper: {
    paddingHorizontal: STANDARD_SPACING * 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginLeft: STANDARD_SPACING * 1.5,
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_MD,
  },
  itemQuantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  itemQuantity: {
    paddingHorizontal: STANDARD_SPACING * 1.5,
  },
  submitButtonComponentWrapper: {
    paddingHorizontal: STANDARD_SPACING * 3,
    marginVertical: STANDARD_SPACING * 3,
  },
});
