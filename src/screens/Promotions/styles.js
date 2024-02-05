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
  STANDARD_BORDER_RADIUS,
  STANDARD_DRAWER_MENU_ICON_WRAPPER_SIZE,
  STANDARD_USER_AVATAR_WRAPPER_SIZE,
  STANDARD_HOME_MAIN_CAROUSEL_WIDTH,
  STANDARD_HOME_MAIN_CAROUSEL_HEIGHT,
  SCREEN_WIDTH,
} from '../../config/Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {IndependentColors} from '../../config/Colors';
import Colors from '../../constants/Colors';

// Exporting style
export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: STANDARD_SPACING * 3,
    marginTop: STANDARD_SPACING * 3,
  },

  drawerMenuIconWrapper: {
    width: STANDARD_DRAWER_MENU_ICON_WRAPPER_SIZE,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: STANDARD_DRAWER_MENU_ICON_WRAPPER_SIZE * 0.5,
  },
  avatarWrapper: {
    width: STANDARD_USER_AVATAR_WRAPPER_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarImage: {
    width: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.7,
    height: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.7,
  },
  borders:{
backgroundColor:Colors.inputBorderColor,
height:0.5,
width:wp('90'),
marginTop:hp('1')
  },
  BarBadgeStyle: {
    position: 'absolute',
    top: scale('-3'),
    right: scale('-3'),
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_XXS,
    backgroundColor: Colors.primary,
    color: IndependentColors.white,
    borderRadius: scale(10),
    paddingHorizontal: scale(6),
    paddingVertical: scale(1.5),
  },
  promotionContainer: {
    width: wp('95'),
    borderWidth: 0.5,
    alignSelf: 'center',
    borderColor: Colors.inputBorderColor,
    borderRadius: wp('2'),
    marginBottom: hp('2'),
    marginTop: hp('2'),
    padding: wp('1.5'),
  },

  imagess: {
    width: STANDARD_HOME_MAIN_CAROUSEL_WIDTH,
    height: STANDARD_HOME_MAIN_CAROUSEL_HEIGHT,
   
    // borderWidth: 2,
    backgroundColor: 'white',
  },
  bannerImg: {
  
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'contain',
    borderRadius: 20,
   
  },
  imagecontent: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    padding: 5,
  },
  content: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  imagedes: {
    color: 'black',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: STANDARD_SPACING * 3,
    marginTop: STANDARD_SPACING * 3,
  },
  drawerMenuIconWrapper: {
    width: STANDARD_DRAWER_MENU_ICON_WRAPPER_SIZE,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: STANDARD_DRAWER_MENU_ICON_WRAPPER_SIZE * 0.5,
  },
  avatarWrapper: {
    width: STANDARD_USER_AVATAR_WRAPPER_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarImage: {
    width: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.7,
    height: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.7,
  },
  BarBadgeStyle: {
    position: 'absolute',
    top: scale('-3'),
    right: scale('-3'),
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_XXS,
    backgroundColor: Colors.primary,
    color: IndependentColors.white,
    borderRadius: scale(10),
    paddingHorizontal: scale(6),
    paddingVertical: scale(1.5),
  },
  Location: {
    // width: SCREEN_WIDTH - 190,
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XXS,
    textTransform: 'capitalize',
  },

  priceWrapper: {
    // flexDirection: 'row',
    marginHorizontal: STANDARD_SPACING * 1,
    alignItems: 'flex-end',
  },
  totalprice: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: scale(10),
  },
  Currency: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: scale(10),
  },


  imagecontent: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  searchbarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: STANDARD_SPACING * 3,
  },

  imagecontent: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  timer: {
    backgroundColor: 'orange', // Background color
    borderRadius: wp('2'), // Rounded corners (adjust as needed)
    padding: wp('1.5'), // Padding around the timer
    alignItems: 'center',
    width: wp('85'),
    alignSelf:"center",
    // marginLeft: wp('2'),
    // marginright: wp('2'),
  },
  timerWrapper: {
    // To center the text vertically
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: hp('3.2'), // Adjust the font size as needed
    color: Colors.white,
    fontFamily:OPEN_SANS_SEMIBOLD
  },
  orderagainview: {
    width: SCREEN_WIDTH * 0.92,
    flexWrap: 'wrap',
    // borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf:'center',
  },
  mainScrollView: {
    paddingBottom: STANDARD_SPACING * 3,
  },
  OrderWrapper: {
    width: scale(104),
    marginVertical: scale(2.5),
  },
});
