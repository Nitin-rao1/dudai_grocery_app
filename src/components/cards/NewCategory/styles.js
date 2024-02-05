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
    // width:'45%',
    marginHorizontal: STANDARD_SPACING * 1,
    marginVertical: STANDARD_SPACING * 0.8,
    borderRadius: STANDARD_BORDER_RADIUS * 2,
  },
  restaurantImageWrapper: {
    width: scale(100),
    height: scale(120),
    position: 'relative',
  },
  restaurantImage: {
    borderRadius: STANDARD_BORDER_RADIUS * 2,
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  restaurantDistanceWrapper: {
    position: 'absolute',
    width: '100%',
    height: scale(120),
    backgroundColor: '#000000'+70,
    // bottom: 0,
    // borderBottomLeftRadius: STANDARD_BORDER_RADIUS * 2,
    // borderBottomRightRadius: STANDARD_BORDER_RADIUS * 2,
    borderRadius: STANDARD_BORDER_RADIUS * 2,
    opacity: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    paddingHorizontal: scale(7.5),
  },
  restaurantDistance: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
    // alignItems:'center',
    color: '#fff',
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
