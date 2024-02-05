import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  FONT_SIZE_SM,
  OPEN_SANS_MEDIUM,
  OPEN_SANS_BOLD,
  FONT_SIZE_XXS,
  FONT_SIZE_XS,
  STANDARD_BORDER_RADIUS,
  STANDARD_FLEX,
  STANDARD_SPACING,
  STANDARD_OTP_LOCK_ICON_WRAPPER_SIZE,
  STANDARD_OTP_TEXT_VIEW_SIZE,
  STANDARD_OTP_TEXT_VIEW_BORDER_SIZE,
} from '../../config/Constants';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  largeHeadingComponentWrapper: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: STANDARD_SPACING * 6,
  },
  otpVerificationFormWrapper: {
    flex: STANDARD_FLEX,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: STANDARD_BORDER_RADIUS,
    borderTopRightRadius: STANDARD_BORDER_RADIUS,
  },
  otpLockIconWrapper: {
    padding: scale(20),
    borderRadius: STANDARD_OTP_LOCK_ICON_WRAPPER_SIZE * 0.2,
    width: STANDARD_OTP_LOCK_ICON_WRAPPER_SIZE,
    aspectRatio: 1,
  },
  otpLockIcon: {
    width: null,
    height: null,
    resizeMode: 'contain',
    flex: STANDARD_FLEX,
  },
  otpLockIconTitle: {
    marginVertical: STANDARD_SPACING * 1.5,
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_SM,
  },
  otpLockIconSubtitle: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XXS,
  },
  otpTextView: {
    borderRadius: STANDARD_BORDER_RADIUS * 2,
    marginVertical: STANDARD_SPACING * 6,
    borderBottomWidth: STANDARD_OTP_TEXT_VIEW_BORDER_SIZE,
    borderWidth: STANDARD_OTP_TEXT_VIEW_BORDER_SIZE,
    width: STANDARD_OTP_TEXT_VIEW_SIZE,
    aspectRatio: 1,
  },
  questionAndResendLinkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  question: {
    marginRight: STANDARD_SPACING,
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
  },
});
