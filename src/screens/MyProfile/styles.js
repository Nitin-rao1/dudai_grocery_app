import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  OPEN_SANS_BOLD,
  FONT_SIZE_SM,
  OPEN_SANS_REGULAR,
  FONT_SIZE_XS,
  STANDARD_SPACING,
  STANDARD_FLEX,
  STANDARD_MY_PROFILE_HEADER_HEIGHT,
  STANDARD_MY_PROFILE_PHOTO_WRAPPER_SIZE,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  STANDARD_BORDER_RADIUS,
  OPEN_SANS_MEDIUM,
} from '../../config/Constants';
import {IndependentColors} from '../../config/Colors';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
    paddingHorizontal: STANDARD_SPACING * 3,
    paddingTop: STANDARD_SPACING * 3,
  },
  headerImageBackground: {
    borderRadius: scale(20),
    height: STANDARD_MY_PROFILE_HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profilePhotoWrapper: {
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: STANDARD_MY_PROFILE_PHOTO_WRAPPER_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_MY_PROFILE_PHOTO_WRAPPER_SIZE * 0.2,
    marginLeft: STANDARD_SPACING * 3,
  },
  cameraIconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: -(STANDARD_SPACING * 2),
    alignItems: 'center',
    justifyContent: 'center',
    width: STANDARD_MY_PROFILE_PHOTO_WRAPPER_SIZE * 0.4,
    aspectRatio: 1,
    borderRadius: STANDARD_MY_PROFILE_PHOTO_WRAPPER_SIZE * 0.4 * 0.5,
  },
  profileNameAndEmailWrapper: {
    flex: STANDARD_FLEX,
    paddingHorizontal: STANDARD_SPACING * 4,
  },
  profileName: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_SM,
  },
  profileEmail: {
    marginTop: STANDARD_SPACING,
    fontFamily: OPEN_SANS_REGULAR,
    fontSize: FONT_SIZE_XS,
  },
  profileImage: {
    width: STANDARD_MY_PROFILE_PHOTO_WRAPPER_SIZE * 0.9,
    height: STANDARD_MY_PROFILE_PHOTO_WRAPPER_SIZE * 0.9,
  },
  navigationLinksScrollviewWrapper: {
    flex: STANDARD_FLEX,
  },
  navigationLinkWrapper: {
    marginBottom: STANDARD_SPACING * 3,
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.4,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
  },
  header: {
    // backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    backgroundColor: IndependentColors.greyLightest,
    height: scale(10),
    width: scale(80),
    marginVertical: scale(8),
    borderRadius: scale(8),
  },
  modalbtnview: {
    alignSelf: 'center',
    flexDirection: 'column',
    height: SCREEN_HEIGHT * 0.25,
    justifyContent: 'space-evenly',
    marginVertical: scale(10),
    // backgroundColor: 'red'
  },
  panelTitle: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_SM,
  },
  panelSubtitle: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_SM,
    
  },
});
