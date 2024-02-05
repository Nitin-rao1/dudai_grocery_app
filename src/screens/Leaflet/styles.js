// import {StyleSheet} from 'react-native';
// import {scale} from 'react-native-size-matters';
// import {
//   FONT_SIZE_SM,
//   OPEN_SANS_MEDIUM,
//   OPEN_SANS_SEMIBOLD,
//   FONT_SIZE_MD,
//   OPEN_SANS_BOLD,
//   FONT_SIZE_XS,
//   FONT_SIZE_XXS,
//   STANDARD_FLEX,
//   STANDARD_SPACING,
//   STANDARD_BORDER_RADIUS,
// } from '../../config/Constants';

// // Exporting style
// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     // backgroundColor: '#2c3e50',
//   },

 
//   pageHeading: {
//     fontSize: 24, // Adjust the font size as needed
//     fontWeight: 'bold', // Adjust the font weight as needed
//     marginBottom: 20, // Add appropriate spacing or styling
//     // Add other heading styles as needed
//   },
// });

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
} from '../../config/Constants';

// Exporting style
export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },

  pageHeading: {
    fontSize: 24, // Adjust the font size as needed
    fontWeight: 'bold', // Adjust the font weight as needed
    marginBottom: 20, // Add appropriate spacing or styling
    // Add other heading styles as needed
  },
  container: {
    flex: STANDARD_FLEX,
  },
  ViewContentCOntainerStyle: {
    margin: STANDARD_SPACING * 3,
  },
  pdfview: {
    // marginTop: 10,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
  },
  skipbutton: {
    width: '97%',
    marginLeft: 5,
    marginBottom: 5,
  },
});
