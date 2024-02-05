import {Platform, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  OPEN_SANS_BOLD,
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  OPEN_SANS_MEDIUM,
  STANDARD_FLEX,
  STANDARD_SPACING,
  STANDARD_BORDER_RADIUS,
  STANDARD_DRAWER_WIDTH,
  STANDARD_DRAWER_HEADER_HEIGHT,
  STANDARD_USER_AVATAR_WRAPPER_SIZE,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  OPEN_SANS_SEMIBOLD,
  FONT_SIZE_MD,
  OPEN_SANS_REGULAR,
  FONT_SIZE_XXS,
} from '../../../config/Constants';
import { useContext } from 'react';
import { ThemeContext } from '../../../theming/ThemeContext';
import { IndependentColors } from '../../../config/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Colors from '../../../constants/Colors';


// Exporting style
export default StyleSheet.create({
  errTxt:{color: Colors.error, fontSize:12,  marginHorizontal:scale(15)},
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  drawer: {
    width: STANDARD_DRAWER_WIDTH,
  },
  drawerHeaderImageBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    height: STANDARD_DRAWER_HEADER_HEIGHT,
  },
  logoWrapper: {
    marginHorizontal: STANDARD_SPACING * 2,
    padding: STANDARD_SPACING,
    borderRadius: STANDARD_BORDER_RADIUS * 5,
    width: scale(70),
    aspectRatio: 1,
  },
  logo: {
    width: null,
    height: null,
    flex: STANDARD_FLEX ,
    borderRadius: STANDARD_BORDER_RADIUS * 5,
    resizeMode: 'contain',
  },
  brandName: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_SM,
  },
  brandSlogan: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XXS,
  },
  drawerItem: {
    height: scale(45),
    justifyContent: 'center',
    borderRadius: scale(10),
  },
  drawerItemLabel: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
  },
  avatarImage: {
    width: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.5,
    height: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    width:SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT * 0.42,
   
    // padding: 20,
    borderRadius: 10,
  },
  modalSubmitButtonWrapper: {
    position:'absolute',
    bottom:10,
    width:'80%',
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop: STANDARD_SPACING * 3,
  },
  SuggestTitle: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
    marginVertical: STANDARD_SPACING * 3,
    color: Colors.primary,
    marginHorizontal:scale(15),
  },
  pointDetails: {
    fontFamily: OPEN_SANS_REGULAR,
    fontSize: FONT_SIZE_XS,
    padding:20,
  },
  border:{
    borderBottomWidth:1,
    borderBottomColor:Colors.primary,
  },
  textInputView:{
//  backgroundColor:'red',
    height:hp('4'),
    width:wp('80'),
    alignSelf:'center',
    borderBottomWidth:1,
    borderBottomColor:Colors.inputBorderColor,
    justifyContent:'center'
  },
  textinput:{
    // backgroundColor:'red',
    height:Platform.OS == 'ios'? hp('3') : hp('7'),
    
    // marginHorizontal:scale(15)
  },
  FeedbackTitle: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
    marginVertical: STANDARD_SPACING * 3,
    color: Colors.primary,
    alignSelf:'center'
    
  },
  ratingview:{
    backgroundColor: IndependentColors.greyLightest,
    // alignSelf:'center',
    alignItems:'center'
  },
  ratingContainer:{
    width:'80%',
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    marginVertical: scale(15),
  },
  commentbox:{
    marginBottom: scale(15),
  },
  LeafletTitle: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
    marginVertical: STANDARD_SPACING * 3,
    color: Colors.primary,
    marginHorizontal: scale(15),
  },
  LeafletSubmitBtn: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: STANDARD_SPACING * 3,
  },

  leafContent: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 40,
    height: SCREEN_HEIGHT * 0.3,
    // padding: 20,
    borderRadius: 10,
  },

  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBorderColor,
  },





});