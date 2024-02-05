import { StyleSheet } from "react-native";
import {
  OPEN_SANS_MEDIUM,
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  STANDARD_SPACING,
  OPEN_SANS_BOLD,
  OPEN_SANS_REGULAR,
  STANDARD_FLEX,
  STANDARD_SELECT_DROPDOWN_HEIGHT,
  STANDARD_PROFILE_PHOTO_WRAPPER_SIZE,
} from '../../config/Constants';
import {scale} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Exporting style
import {IndependentColors} from '../../config/Colors';
import Colors from "../../constants/Colors";
export default StyleSheet.create({
  mainWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: STANDARD_SPACING * 3,
  },
  largeHeadingComponentWrapper: {
   width:wp('95'),
   alignSelf:'center',
   marginTop:hp('2')
  },
  header: {
    width: '100%',
  },
  info: {
    marginBottom: STANDARD_SPACING * 3,
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_SM,
  },
  textInputComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
  },
  checkboxAndLabelWrapper: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: STANDARD_SPACING * 3,
    marginVertical:STANDARD_SPACING * 3,
  },
  checkboxLabel: {
    marginLeft: STANDARD_SPACING * 2,
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
    width:scale(280),
  },
  questionAndLinkWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp('2'),
  },
  question: {
    marginRight: STANDARD_SPACING,
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
  },
  dateOfBirthLabel: {
    marginBottom: scale(7.5),
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XS,
  },
  dropdownsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: STANDARD_SPACING * 2,
  },

  dropdownBtnStyle: {
    width: wp('98%'),
    alignSelf:'center',
    height: STANDARD_SELECT_DROPDOWN_HEIGHT,
    borderRadius: STANDARD_SELECT_DROPDOWN_HEIGHT * 0.2,
  },
  dropdownBtnTxtStyle: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
    textAlign: 'left',
  },

  dropdownDropdownStyle: {
    backgroundColor: IndependentColors.grey,
    borderRadius: STANDARD_SELECT_DROPDOWN_HEIGHT * 0.2,
  },
  dropdownRowTxtStyle: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
    textAlign: 'left',
  },
  inputfield: {
    width: wp("95%"),
    
    // alignSelf: "flex-end",
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth:2,
    // justifyContent:'center',
    // alignItems:'center',
    // // alignSelf:'center',
    // alignContent:'center'
    // // width: scale(100),
    // alignSelf: "flex-start",
  },
  inputContainer: {
    // width: wp("40%"),
    // alignSelf: "flex-end",
  },
  errorInput: {
    borderColor: 'red', // Apply a red border for invalid fields
  },
  errorText: {
    color: IndependentColors.red,
    fontSize: scale(8),
 
    // borderWidth:2
  },
  errorTextView: {
    height:hp('2'),
    // borderWidth:2
  },
  textInputContainer: {
    // backgroundColor: IndependentColors.greyDark,
    borderBottomWidth: 0,
    borderRadius: 8,
    color: IndependentColors.white,
  },

  questionAndResendLinkWrapper: {
    marginLeft: 55,
    marginTop: 12,
  },
  linking: {
    color: Colors.primary,
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
  },
  privacylinking: {
    color: Colors.primary,
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
  },
  modalWrapper: {
    // flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor: Colors.black+20,
  },
  modalviewwrapper: {
    // backgroundColor: IndependentColors.white,
    paddingHorizontal: STANDARD_SPACING * 5,
    width: wp('85%'),
    height: hp('40%'),
    bottom: hp('5%'),
    borderRadius: STANDARD_SELECT_DROPDOWN_HEIGHT * 0.2,
  },
  textInputContainer: {
    backgroundColor: IndependentColors.white,
    borderBottomWidth: 0,
    borderRadius: 8,
    color: IndependentColors.black,
  },
  opttext: {
    fontSize: scale(12),
    fontFamily: OPEN_SANS_BOLD,
    marginVertical: hp('5%'),
  },
  otpbutton: {
    bottom: hp('5'),
    position: 'absolute',
    alignSelf: 'center',
  },
  questionAndResendLinkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(20),
  },
  question: {
    marginRight: STANDARD_SPACING,
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
  },
  container: {
    flex: 1,
    // backgroundColor: "#F0EAD8",
  },

  inputContainer: {
    // display: 'flex',
    alignItems: 'center',
    alignContent:'center',
    flexDirection: 'row',
    backgroundColor: '#F6F6F7',
    // padding: wp('2'),
    marginTop: hp('1'),
    borderRadius: 8,
    justifyContent:'center',
    // borderWidth:2,
  },
  phoneTextContainer: {
    // flex: 1,
    //  backgroundColor: "white",
    // backgroundColor: '#F6F6F7',
    // borderWidth:2,

    // height: hp,
    //borderColor: "black",
    // display: 'flex',
    flexDirection: 'row',
     alignItems: "center",
    textAlign: 'center',

    // padding: 2,
  },

  phoneCountryCallingCodeText: {
    //  fontWeight: "bold",
    // marginRight: 16,
    // marginTop: 12,
  },
  phoneNoText: {
    // fontWeight: "bold",
    // backgroundColor:"black",
    width: wp('70'),
    // borderWidth:2,
    marginLeft:wp('2')
  },
  keypadContainer: {
    flex: 1,
  },

  OrderWrapper: {
    width: wp('30'),
    marginTop: wp('2.5'),
    marginLeft: wp('2.5'),
  },
});

