import {StyleSheet} from 'react-native';
import {
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  OPEN_SANS_BOLD,
  OPEN_SANS_MEDIUM,
  STANDARD_BORDER_WIDTH,
  STANDARD_FLEX,
  STANDARD_SPACING,
  STANDARD_BORDER_RADIUS,
  STANDARD_VECTOR_ICON_WRAPPER_SIZE,
} from '../../config/Constants';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
    paddingTop: STANDARD_SPACING * 3,
    paddingHorizontal: STANDARD_SPACING * 3,
  },
  giveRatingAndReviewLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: STANDARD_SPACING * 5,
    paddingVertical: STANDARD_SPACING * 3,
    borderTopWidth: STANDARD_BORDER_WIDTH,
    borderBottomWidth: STANDARD_BORDER_WIDTH,
  },
  giveRatingAndReviewLinkTitle: {
    marginLeft: STANDARD_SPACING * 1.5,
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_SM,
  },
  buyersReviewsTitle: {
    marginBottom: STANDARD_SPACING * 5,
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_SM,
  },
  scrollViewWrapper: {
    flex: STANDARD_FLEX,
  },
  buyerReviewCardComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
  },

  modal: {
    margin: STANDARD_SPACING * 3,
  },
  modalBody: {
    position: 'relative',
    borderRadius: STANDARD_BORDER_RADIUS * 3,
    padding: STANDARD_SPACING * 3,
    paddingVertical: STANDARD_SPACING * 9,
  },
  modalSubmitButtonWrapper: {
    marginTop: STANDARD_SPACING * 3,
  },
  modalCloseIconWrapper: {
    width: STANDARD_VECTOR_ICON_WRAPPER_SIZE,
    aspectRatio: 1,
    right: STANDARD_SPACING * 2,
    top: STANDARD_SPACING * 2,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: STANDARD_VECTOR_ICON_WRAPPER_SIZE * 0.5,
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
