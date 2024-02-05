import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  OPEN_SANS_BOLD,
  FONT_SIZE_XS,
  FONT_SIZE_MD,
  OPEN_SANS_SEMIBOLD,
  OPEN_SANS_MEDIUM,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_QUICK_CONTACT_ICON_WRAPPER_SIZE,
  STANDARD_SPACING,
  STANDARD_BORDER_RADIUS,
} from '../../config/Constants';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'relative',
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    top: 0,
    left: 0,
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  bottomSheet: {
    top: SCREEN_HEIGHT,
    left: 0,
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    paddingTop: STANDARD_SPACING * 1.5,
    paddingHorizontal: STANDARD_SPACING * 3,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: {width: scale(-1), height: scale(-1)},
    shadowOpacity: 0.25,
    shadowRadius: scale(10),
    elevation: scale(15),
  },
  chevronDownIcon: {
    alignSelf: 'center',
  },
  quickContactLabel: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_MD,
    textTransform: 'capitalize',
    alignSelf: 'center',
  },
  contactIconsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: STANDARD_SPACING * 3,
  },
  contactIconAndLabelWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactIconWrapper: {
    width: STANDARD_QUICK_CONTACT_ICON_WRAPPER_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_QUICK_CONTACT_ICON_WRAPPER_SIZE * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactIconLabel: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_XS,
    textTransform: 'capitalize',
    marginTop: STANDARD_SPACING,
  },
  horizontalDividerComponentWrapper: {
    marginVertical: STANDARD_SPACING * 5,
  },
  textInputComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
  },
  textAreaComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
  },
  textArea: {
    borderRadius: STANDARD_BORDER_RADIUS * 2,
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
    textAlignVertical: 'top',
  },
  textAreaLabel: {
    marginBottom: STANDARD_SPACING * 1.5,
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XS,
  },
});
