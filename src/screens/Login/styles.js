import { StyleSheet } from "react-native";
import {
  OPEN_SANS_MEDIUM,
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  STANDARD_VECTOR_ICON_WRAPPER_SIZE,
  STANDARD_SPACING,
  STANDARD_BORDER_RADIUS,
} from "../../config/Constants";
import { IndependentColors } from "../../config/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    // flex: 1,
    height:hp('100'),
    justifyContent: "center",
    alignSelf:'center',
    alignContent:'center',
    // borderWidth:2,
    paddingHorizontal: STANDARD_SPACING * 3,
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
    marginBottom: STANDARD_SPACING * 3,
  },
  checkboxAndLinkWrapper: {
    marginBottom: STANDARD_SPACING * 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkboxAndLabelWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: STANDARD_SPACING * 1.5,
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
  },
  horizontalDividerComponentWrapper: {
    marginTop: STANDARD_SPACING * 6,
  },
  socialIconsWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: STANDARD_SPACING * 6,
  },
  questionAndLinkWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: STANDARD_SPACING * 4,
  },
  

  questions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: STANDARD_SPACING * 2,
  },
  
  question: {
    marginRight: STANDARD_SPACING,
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
  },
  border:{
    // flex: 1,
    height: 1,  
     width: 75, 
    //  leftwidth:25,      // Adjust the height of the line
    backgroundColor: 'black',  // Change the color as per your design
    marginHorizontal: 10,      // Adjust the horizontal spacing as needed
    alignSelf: 'center',   

  },
  modal: {
    margin: STANDARD_SPACING * 3,
  },
  modalBody: {
    position: "relative",
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
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: STANDARD_VECTOR_ICON_WRAPPER_SIZE * 0.5,
  },


  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: 'red', // Apply a red border for invalid fields
  },
  errorText: {
    color: IndependentColors.red,
    fontSize: FONT_SIZE_XS,
    fontFamily:OPEN_SANS_MEDIUM,
  },
});