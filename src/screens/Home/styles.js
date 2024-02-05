// import {StyleSheet} from 'react-native';
// import {
//   OPEN_SANS_SEMIBOLD,
//   FONT_SIZE_XL,
//   FONT_SIZE_MD,
//   STANDARD_DRAWER_MENU_ICON_WRAPPER_SIZE,
//   STANDARD_USER_AVATAR_WRAPPER_SIZE,
//   STANDARD_TEXT_INPUT_HEIGHT,
//   STANDARD_HOME_MAIN_CAROUSEL_WIDTH,
//   STANDARD_HOME_MAIN_CAROUSEL_HEIGHT,
//   SCREEN_WIDTH,
//   STANDARD_FLEX,
//   STANDARD_SPACING,
//   STANDARD_BORDER_RADIUS,
//   STANDARD_BANNER_WRAPPER_HEIGHT,
//   FONT_SIZE_XXS,
//   FONT_SIZE_XS,
//   OPEN_SANS_BOLD,
//   OPEN_SANS_MEDIUM,
// } from '../../config/Constants';
// import {scale} from 'react-native-size-matters';
// import {IndependentColors} from '../../config/Colors';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// // Exporting style
// export default StyleSheet.create({
//   mainWrapper: {
//     flex: STANDARD_FLEX,
//   },
//   mainScrollView: {
//     paddingBottom: STANDARD_SPACING * 3,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginHorizontal: STANDARD_SPACING * 3,
//     marginTop: STANDARD_SPACING * 3,
//   },
//   drawerMenuIconWrapper: {
//     width: STANDARD_DRAWER_MENU_ICON_WRAPPER_SIZE,
//     aspectRatio: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: STANDARD_DRAWER_MENU_ICON_WRAPPER_SIZE * 0.5,
//   },
//   avatarWrapper: {
//     width: STANDARD_USER_AVATAR_WRAPPER_SIZE,
//     aspectRatio: 1,
//     borderRadius: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//   },
//   avatarImage: {
//     width: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.7,
//     height: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.7,
//   },
//   BarBadgeStyle: {
//     position: 'absolute',
//     top: scale('-3'),
//     right: scale('-3'),
//     fontFamily: OPEN_SANS_SEMIBOLD,
//     fontSize: FONT_SIZE_XXS,
//     backgroundColor: Colors.primary,
//     color: IndependentColors.white,
//     borderRadius: scale(10),
//     paddingHorizontal: scale(6),
//     paddingVertical: scale(1.5),
//   },
//   Location: {
//     // width: SCREEN_WIDTH - 190,
//     fontFamily: OPEN_SANS_BOLD,
//     fontSize: FONT_SIZE_XXS,
//     textTransform: 'capitalize',
//     // borderWidth:1,
//     width:wp('43')
//   },
//   priceWrapper: {
//     // flexDirection:'row',
//     marginHorizontal: STANDARD_SPACING * 1,
//     alignItems: 'flex-end',
//   },
//   totalprice: {
//     fontFamily: OPEN_SANS_BOLD,
//     fontSize: scale(10),
//   },
//   Currency: {
//     fontFamily: OPEN_SANS_SEMIBOLD,
//     fontSize: scale(6),
//   },
//   searchbarWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     margin: STANDARD_SPACING * 3,
//   },
//   searchbarTextInput: {
//     width: SCREEN_WIDTH * 0.75,
//     height: STANDARD_TEXT_INPUT_HEIGHT,
//     borderRadius: STANDARD_TEXT_INPUT_HEIGHT * 0.2,
//     paddingLeft: STANDARD_SPACING * 3,
//   },
//   mainCarouselFlatListWrapper: {
//     width: STANDARD_HOME_MAIN_CAROUSEL_WIDTH,
//     height: STANDARD_HOME_MAIN_CAROUSEL_HEIGHT,
//     alignSelf: 'center',
//     position: 'relative',
//   },
//   mainCarouselFlatList: {
//     flex: STANDARD_FLEX,
//   },
//   mainCarouselFlatListItemWrapper: {
//     width: STANDARD_HOME_MAIN_CAROUSEL_WIDTH,
//     height: STANDARD_HOME_MAIN_CAROUSEL_HEIGHT,
//   },
//   mainCarouselFlatListItemImage: {
//     width: null,
//     height: null,
//     flex: STANDARD_FLEX,
//     resizeMode: 'contain',
//     borderRadius: 20,
//   },
//   paginationIndicatorsWrapper: {
//     flexDirection: 'row',
//     alignSelf: 'center',
//     marginTop: scale(15),
//   },
//   paginationIndicator: {
//     height: scale(6),
//     marginHorizontal: STANDARD_SPACING,
//     borderRadius: STANDARD_BORDER_RADIUS,
//   },
//   bannerWrapper: {
//     width: '100%',
//     height: STANDARD_BANNER_WRAPPER_HEIGHT,
//   },
//   bannerImage: {
//     width: null,
//     height: null,
//     flex: STANDARD_FLEX,
//     resizeMode: 'contain',
//     marginHorizontal: STANDARD_SPACING * 3,
//   },
//   sectionTitleAndLinkWrapper: {
//     margin: STANDARD_SPACING * 3,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   sectionTitleWrapper: {
//     margin: STANDARD_SPACING * 3,
//   },
//   sectionTitle: {
//     fontFamily: OPEN_SANS_SEMIBOLD,
//     fontSize: FONT_SIZE_MD,
//   },
//   horizontalScrollView: {
//     marginHorizontal: STANDARD_SPACING * 1.5,
//   },
//   VerticalScrollView: {
//     // marginVertical: STANDARD_SPACING * 1.5,
//   },
//   orderagainview: {
//     width: wp('100'),
//     flexWrap: 'wrap',
//     // borderWidth: 1,
//     // justifyContent: 'space-between',
//     // marginLeft: 20,
//     flexDirection: 'row',
//     alignSelf:'center',
//   },
//   itemWrapper: {
//     width: scale(140),
//     marginHorizontal: scale(7.5),
//   },
//   OrderWrapper: {
//     width: wp('30'),
//     marginTop: wp('2.5'),
//     marginLeft:wp('2.5')
//   },
//   categoryview: {
//     width: SCREEN_WIDTH * 0.95,
//     flexWrap: 'wrap',
//     //  borderWidth:1,
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     alignSelf:'center'
//   },

//   restaurantWrapper: {
//     // width:'45%',
//     marginHorizontal: STANDARD_SPACING * 1,
//     marginVertical: STANDARD_SPACING * 0.8,
//     borderRadius: STANDARD_BORDER_RADIUS * 2,
//   },
//   restaurantDistanceWrapper: {
//     position: 'absolute',
//     width: '100%',
//     height: scale(120),
//     backgroundColor: '#000000'+70,
//     // bottom: 0,
//     // borderBottomLeftRadius: STANDARD_BORDER_RADIUS * 2,
//     // borderBottomRightRadius: STANDARD_BORDER_RADIUS * 2,
//     borderRadius: STANDARD_BORDER_RADIUS * 2,
//     opacity: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent:'center',
//     paddingHorizontal: scale(7.5),
//   },
//   restaurantImageWrapper: {
//     width: scale(100),
//     height: scale(120),
//     position: 'relative',
//   },
//   restaurantDistance: {
//     fontFamily: OPEN_SANS_MEDIUM,
//     fontSize: FONT_SIZE_XS,
//     alignItems:'center',
//     color: '#fff',
//     marginLeft: STANDARD_SPACING,
//     textAlign:'center'
//   },
//   restaurantImage: {
//     borderRadius: STANDARD_BORDER_RADIUS * 2,
//     width: null,
//     height: null,
//     flex: STANDARD_FLEX,
//     resizeMode: 'contain',
//     backgroundColor: '#fff',
//   },
// });

import {StyleSheet} from 'react-native';
import {
  OPEN_SANS_SEMIBOLD,
  FONT_SIZE_XL,
  FONT_SIZE_MD,
  STANDARD_DRAWER_MENU_ICON_WRAPPER_SIZE,
  STANDARD_USER_AVATAR_WRAPPER_SIZE,
  STANDARD_TEXT_INPUT_HEIGHT,
  STANDARD_HOME_MAIN_CAROUSEL_WIDTH,
  STANDARD_HOME_MAIN_CAROUSEL_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_FLEX,
  STANDARD_SPACING,
  STANDARD_BORDER_RADIUS,
  STANDARD_BANNER_WRAPPER_HEIGHT,
  FONT_SIZE_XXS,
  FONT_SIZE_XS,
  OPEN_SANS_BOLD,
  OPEN_SANS_MEDIUM,
  STANDARD_GRID_VIEW_PRODUCT_CARD_MIN_HEIGHT,
} from '../../config/Constants';
import {scale} from 'react-native-size-matters';
import {IndependentColors} from '../../config/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
    backgroundColor:Colors.white
  },
  mainScrollView: {
    paddingBottom: STANDARD_SPACING * 3,
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
    // borderWidth:1,
    width: wp('43'),
  },
  priceWrapper: {
    // flexDirection:'row',
    marginHorizontal: STANDARD_SPACING * 1,
    alignItems: 'flex-end',
  },
  totalprice: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: scale(10),
  },
  Currency: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: scale(6),
  },
  searchbarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: STANDARD_SPACING * 3,
  },
  searchbarTextInput: {
    width: SCREEN_WIDTH * 0.63,
    height: STANDARD_TEXT_INPUT_HEIGHT,
    borderRadius: STANDARD_TEXT_INPUT_HEIGHT * 0.2,
    paddingLeft: STANDARD_SPACING * 3,
  },
  mainCarouselFlatListWrapper: {
    width: STANDARD_HOME_MAIN_CAROUSEL_WIDTH,
    height: STANDARD_HOME_MAIN_CAROUSEL_HEIGHT,
    alignSelf: 'center',
    position: 'relative',
  },
  mainCarouselFlatList: {
    flex: STANDARD_FLEX,
  },
  mainCarouselFlatListItemWrapper: {
    width: STANDARD_HOME_MAIN_CAROUSEL_WIDTH,
    height: STANDARD_HOME_MAIN_CAROUSEL_HEIGHT,
  },
  mainCarouselFlatListItemImage: {
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  paginationIndicatorsWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: scale(15),
  },
  paginationIndicator: {
    height: scale(6),
    marginHorizontal: STANDARD_SPACING,
    borderRadius: STANDARD_BORDER_RADIUS,
  },
  bannerWrapper: {
    width: '100%',
    height: STANDARD_BANNER_WRAPPER_HEIGHT,
  },
  bannerImage: {
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'contain',
    marginHorizontal: STANDARD_SPACING * 3,
  },
  sectionTitleAndLinkWrapper: {
    margin: STANDARD_SPACING * 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitleWrapper: {
    margin: STANDARD_SPACING * 3,
  },
  sectionTitle: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
  },
  horizontalScrollView: {
    marginHorizontal: STANDARD_SPACING * 1.5,
  },
  VerticalScrollView: {
    // marginVertical: STANDARD_SPACING * 1.5,
  },
  orderagainview: {
    width: wp('100'),
    flexWrap: 'wrap',
    // borderWidth: 1,
    // justifyContent: 'space-between',
    // marginLeft: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  itemWrapper: {
    width: scale(140),
    marginHorizontal: scale(7.5),
  },
  OrderWrapper: {
    width: wp('30'),
    marginTop: wp('2.5'),
    marginLeft: wp('2.5'),
  },
  categoryview: {
    width: SCREEN_WIDTH * 0.95,
    flexWrap: 'wrap',
    //  borderWidth:1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
  },

  restaurantWrapper: {
    // width:'45%',
    width: wp('28.7'),
    height:scale(120),
    marginHorizontal: STANDARD_SPACING * 1,
    marginVertical: STANDARD_SPACING * 0.8,
    borderWidth:1,
    borderColor:Colors.primary,
    borderRadius: STANDARD_BORDER_RADIUS * 2,
    backgroundColor: Colors.primary,
    // zIndex:1,
    overflow:'hidden'
  },
  restaurantDistanceWrapper: {
    // position: 'absolute',
    width: wp('28.7'),
    height:scale(20),
    // borderWidth:1,
    // height: scale(120),
    // backgroundColor: Colors.primary,
    // bottom: 0,
    // borderBottomLeftRadius: STANDARD_BORDER_RADIUS * 2,
    // borderBottomRightRadius: STANDARD_BORDER_RADIUS * 2,
    // borderRadius: STANDARD_BORDER_RADIUS * 2,
    opacity: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(7),
  },
  restaurantImageWrapper: {
    width: scale(100),
    height: scale(100),
    // position: 'relative',
    // zIndex:0,
  },
  restaurantDistance: {
    paddingBottom: scale(1),
    // paddingVertical: scale(2),
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: scale(7),
    alignItems: 'center',
    color: '#fff',
    // marginLeft: STANDARD_SPACING,
    textAlign: 'center',
  },
  restaurantImage: {
    // borderTopLeftRadius: STANDARD_BORDER_RADIUS * 2,
    // borderTopRightRadius: STANDARD_BORDER_RADIUS * 2,
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    // zIndex:1,
  },
  // qrcode: {
  //   marginRight: hp('1'),
  //   marginTop: hp('1.5'),
  //   // justifyContent: 'space-between',
  // },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'red',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  updateModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  updateModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  updateModalText: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  ModalContent: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
  image: {
    width: wp('60'),
    height: hp('30'),
  },

  closeButton: {
    position: 'absolute',
    right: 10,
    marginTop: STANDARD_SPACING * 2,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: Colors.white,
    // color: 'black',
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


  ///camera

  container: {
    flex: 1,
  },
  cameraView: {
    // flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    // backgroundColor: 'red',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: 'orange',
    borderWidth: 2,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: {flexDirection: 'row'},

  modalContent: {
    width: '100%',
    height: '100%',
  },

  closeeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },


  ///categoriesList
  categoryButton: {
    padding: hp('1'),
    borderWidth: wp('0.2'),
    marginHorizontal: wp('1.2%'),
    color: IndependentColors.black,
    borderColor: IndependentColors.black,
    borderRadius: hp('0.8'),
  },
  categoryButtonText: {
    fontWeight: '500',
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XXS,
    color: IndependentColors.black,
    marginHorizontal: wp('2'),
    textAlign: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('1%'),
    // backgroundColor:'red'
  },
  card: {
    justifyContent: 'center',
    alignItems:'center',
    // padding: scale(4),
    // position: 'relative',
    height: wp('33'),
    // backgroundColor:'red',
    // borderWidth:1,
    borderRadius: STANDARD_GRID_VIEW_PRODUCT_CARD_MIN_HEIGHT * 0.08,//0.1
    width:wp('25')
    
  },
  footerContainer:{
    flexDirection:'row',
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center'
  }
});
