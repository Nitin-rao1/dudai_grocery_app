import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  OPEN_SANS_BOLD,
  OPEN_SANS_MEDIUM,
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  STANDARD_SPACING,
  STANDARD_BORDER_RADIUS,
  STANDARD_FLEX,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  restaurantWrapper: {
    marginHorizontal: STANDARD_SPACING * 1.5,
    borderRadius: STANDARD_BORDER_RADIUS * 4,
  },
  restaurantImageWrapper: {
    width: scale(240),
    height: scale(150),
    position: 'relative',
  },
  restaurantImage: {
    borderRadius: STANDARD_BORDER_RADIUS * 4,
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'contain',
  },
  restaurantDistanceWrapper: {
    position: 'absolute',
    width: '100%',
    height: scale(40),
    backgroundColor: '#000',
    bottom: 0,
    borderBottomLeftRadius: STANDARD_BORDER_RADIUS * 4,
    borderBottomRightRadius: STANDARD_BORDER_RADIUS * 4,
    opacity: 0.75,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(7.5),
  },
  restaurantDistance: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
    marginLeft: STANDARD_SPACING,
  },
  restaurantInfoWrapper: {
    padding: STANDARD_SPACING * 3,
  },
  restaurantName: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_SM,
  },
  restaurantRatingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: STANDARD_SPACING * 1.5,
  },
  restaurantRating: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_SM,
    marginHorizontal: STANDARD_SPACING,
  },
  restaurantRatingCount: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_SM,
  },
  restaurantPriceRangeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantPriceRangeLabel: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
  },
  restaurantPriceRange: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XS,
    marginLeft: STANDARD_SPACING * 1.5,
  },
});
