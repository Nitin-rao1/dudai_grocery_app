import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_SM,
  OPEN_SANS_MEDIUM,
  OPEN_SANS_SEMIBOLD,
  FONT_SIZE_MD,
  OPEN_SANS_BOLD,
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
  STANDARD_FLEX,
  STANDARD_SPACING,
  STANDARD_BORDER_RADIUS,
} from '../../config/Constants';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  header: {
    flex: STANDARD_FLEX,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appVersionTitle: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_SM,
  },
  appVersion: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_XS,
    marginVertical: STANDARD_SPACING,
  },
  lastUpdatedDate: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_XXS,
  },
  scrollViewWrapper: {
    flex: STANDARD_FLEX * 4,
    borderTopLeftRadius: STANDARD_BORDER_RADIUS * 5,
    borderTopRightRadius: STANDARD_BORDER_RADIUS * 5,
  },
  scrollViewItemWrapper: {
    marginHorizontal: STANDARD_SPACING * 3,
  },
  scrollViewItemWrapperWithMarginTop: {
    marginTop: STANDARD_SPACING * 3,
  },
  sectionTitle: {
    marginBottom: STANDARD_SPACING * 3,
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
  },
  linkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: STANDARD_SPACING * 3,
  },
  linkTitle: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_SM,
  },
  switchSize: {
    transform: [{scaleX: scale(0.8)}, {scaleY: scale(0.8)}],
  },
});
