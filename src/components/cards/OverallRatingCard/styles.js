import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  OPEN_SANS_BOLD,
  FONT_SIZE_SM,
  OPEN_SANS_REGULAR,
  FONT_SIZE_XL,
  OPEN_SANS_MEDIUM,
  FONT_SIZE_XS,
  STANDARD_OVERALL_RATING_CARD_HEIGHT,
  STANDARD_PROGRESS_BAR_HEIGHT,
} from '../../../config/Constants';

// Exporting style
export default StyleSheet.create({
  overallRatingWrapper: {
    flexDirection: 'row',
    paddingHorizontal: scale(15),
    height: STANDARD_OVERALL_RATING_CARD_HEIGHT,
    borderRadius: STANDARD_OVERALL_RATING_CARD_HEIGHT * 0.2,
  },
  overallRatingContentWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  overallRatingValueWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overallRatingValue: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XL,
  },
  slash: {
    marginLeft: scale(7.5),
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_SM,
  },
  totalRatingValue: {
    fontFamily: OPEN_SANS_REGULAR,
    fontSize: FONT_SIZE_SM,
  },
  totalRatingCount: {
    marginVertical: scale(5),
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_SM,
  },
  totalRatingStarsWrapper: {
    flexDirection: 'row',
  },
  earnedRatingStarsStatsWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  earnedRatingStarsStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(3),
  },
  earnedRatingStarsStatsLabel: {
    marginRight: scale(10),
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
  },
  progressBar: {
    flex: 1,
    position: 'relative',
    height: STANDARD_PROGRESS_BAR_HEIGHT,
    borderRadius: STANDARD_PROGRESS_BAR_HEIGHT * 0.5,
  },
});
