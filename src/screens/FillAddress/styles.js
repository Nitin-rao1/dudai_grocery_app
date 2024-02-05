import {StyleSheet} from 'react-native';
import {
  OPEN_SANS_MEDIUM,
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  STANDARD_VECTOR_ICON_WRAPPER_SIZE,
  STANDARD_SPACING,
  STANDARD_BORDER_RADIUS,
} from '../../config/Constants';
import { scale } from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    // flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: STANDARD_SPACING * 2,
  },
  
  largeHeadingComponentWrapper: {
    marginBottom: STANDARD_SPACING * 1.5,
  },
  info: {
    marginBottom: STANDARD_SPACING * 8,
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_SM,
  },
  textInputComponentWrapper: {
    // marginBottom: STANDARD_SPACING * 1,
  },
  mapView: {
    // ...StyleSheet.absoluteFillObject,
    flex:1,
    height:hp('50')
  },
  buttonwrapper:{
    width: scale(220),
    flexDirection:'row',
    justifyContent:'space-between',
    alignSelf:'flex-end',
    paddingVertical:STANDARD_SPACING * 3

  }
//   checkboxAndLinkWrapper: {
//     marginBottom: STANDARD_SPACING * 3,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   checkboxAndLabelWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkboxLabel: {
//     marginLeft: STANDARD_SPACING * 1.5,
//     fontFamily: OPEN_SANS_MEDIUM,
//     fontSize: FONT_SIZE_XS,
//   },
//   horizontalDividerComponentWrapper: {
//     marginTop: STANDARD_SPACING * 3,
//   },
//   socialIconsWrapper: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: STANDARD_SPACING * 3,
//   },
//   questionAndLinkWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: STANDARD_SPACING * 6,
//   },
//   question: {
//     marginRight: STANDARD_SPACING,
//     fontFamily: OPEN_SANS_MEDIUM,
//     fontSize: FONT_SIZE_XS,
//   },
//   modal: {
//     margin: STANDARD_SPACING * 3,
//   },
//   modalBody: {
//     position: 'relative',
//     borderRadius: STANDARD_BORDER_RADIUS * 3,
//     padding: STANDARD_SPACING * 3,
//     paddingVertical: STANDARD_SPACING * 9,
//   },
//   modalSubmitButtonWrapper: {
//     marginTop: STANDARD_SPACING * 3,
//   },
//   modalCloseIconWrapper: {
//     width: STANDARD_VECTOR_ICON_WRAPPER_SIZE,
//     aspectRatio: 1,
//     right: STANDARD_SPACING * 2,
//     top: STANDARD_SPACING * 2,
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: STANDARD_VECTOR_ICON_WRAPPER_SIZE * 0.5,
//   },
});
