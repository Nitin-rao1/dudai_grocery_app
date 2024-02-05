import {StyleSheet} from 'react-native';
import {
  OPEN_SANS_SEMIBOLD,
  FONT_SIZE_XL,
  FONT_SIZE_MD,
  STANDARD_DRAWER_MENU_ICON_WRAPPER_SIZE,
  STANDARD_USER_AVATAR_WRAPPER_SIZE,
  STANDARD_TEXT_INPUT_HEIGHT,
  STANDARD_HOME_MAIN_CAROUSEL_WIDTH,
  STANDARD_HOME_MAIN_CAROUSEL_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_FLEX,
  STANDARD_SPACING,
  STANDARD_BORDER_RADIUS,
  STANDARD_BANNER_WRAPPER_HEIGHT,
  FONT_SIZE_XXS,
  FONT_SIZE_XS,
  OPEN_SANS_BOLD,
  OPEN_SANS_MEDIUM,
} from '../../config/Constants';
import {scale} from 'react-native-size-matters';
import {IndependentColors} from '../../config/Colors';

export default StyleSheet.create({
  mainCarouselFlatListWrapper: {
    width: STANDARD_HOME_MAIN_CAROUSEL_WIDTH,
    height: STANDARD_HOME_MAIN_CAROUSEL_HEIGHT,
    alignSelf: 'center',
    position: 'relative',
  },
  mainCarouselFlatListItemWrapper: {
    width: STANDARD_HOME_MAIN_CAROUSEL_WIDTH,
    height: STANDARD_HOME_MAIN_CAROUSEL_HEIGHT,
  },
  mainCarouselFlatListItemImage: {
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  mainCarouselFlatList: {
    flex: STANDARD_FLEX,
  },
  paginationIndicator: {
    height: scale(6),
    marginHorizontal: STANDARD_SPACING,
    borderRadius: STANDARD_BORDER_RADIUS,
  },
  paginationIndicatorsWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: scale(15),
    // marginBottom: scale(15),
    // backgroundColor:'red'
  },
  sectionTitleWrapper: {
    margin: STANDARD_SPACING * 3,
  },
  sectionTitle: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
  },

  bannerWrapper: {
    width: '100%',
    height: STANDARD_BANNER_WRAPPER_HEIGHT,
  },
  bannerImage: {
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'contain',
    marginHorizontal: STANDARD_SPACING * 3,
  },
});