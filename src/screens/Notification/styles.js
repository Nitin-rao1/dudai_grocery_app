import {StyleSheet} from 'react-native';
import {
  STANDARD_TEXT_INPUT_HEIGHT,
  STANDARD_HOME_MAIN_CAROUSEL_WIDTH,
  STANDARD_HOME_MAIN_CAROUSEL_HEIGHT,
  SCREEN_WIDTH,
  STANDARD_FLEX,
  STANDARD_SPACING,
  CONTENT_SPACING,
  CONTROL_BUTTON_SIZE,
  SAFE_AREA_PADDING,
  STANDARD_BORDER_RADIUS,
  OPEN_SANS_SEMIBOLD,
  FONT_SIZE_XXS,
  FONT_SIZE_LG,
  FONT_SIZE_MD,
  OPEN_SANS_BOLD,
  FONT_SIZE_XS,
  OPEN_SANS_MEDIUM,
  STANDARD_USER_AVATAR_WRAPPER_SIZE,
  FONT_SIZE_XL,
  FONT_SIZE_SM,
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
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  deleteText: {
    color: 'red',
  },
  // container: {
  //   flex: 1,
  // },
  // button: {
  //   marginBottom: CONTENT_SPACING,
  //   width: CONTROL_BUTTON_SIZE,
  //   height: CONTROL_BUTTON_SIZE,
  //   borderRadius: CONTROL_BUTTON_SIZE / 2,
  //   backgroundColor: 'rgba(140, 140, 140, 0.3)',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // rightButtonRow: {
  //   position: 'absolute',
  //   // right: SAFE_AREA_PADDING.paddingRight,
  //   // top: SAFE_AREA_PADDING.paddingTop,
  // },
  // backButton: {
  //   position: 'absolute',
  //   // left: SAFE_AREA_PADDING.paddingLeft,
  //   // top: SAFE_AREA_PADDING.paddingTop,
  // },

  // searchbarTextInput: {
  //   width: SCREEN_WIDTH * 0.65,
  //   height: STANDARD_TEXT_INPUT_HEIGHT,
  //   borderRadius: STANDARD_TEXT_INPUT_HEIGHT * 0.2,
  //   paddingLeft: STANDARD_SPACING * 3,
  //   justifyContent: 'space-between',
  //   padding: wp('1.5'),
  //   marginTop: hp('0.95'),
  // },
  // searchbarWrapper: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   margin: STANDARD_SPACING * 4,
  // },
  // header: {
  //   marginTop: hp('1.5'),
  // },
  // qrcode: {
  //   marginRight: hp('1'),
  //   marginTop: hp('0.95'),
  //   flexDirection: 'row',
  // },
  // camera: {
  //   marginTop: 20,
  //   width: '50%',
  //   height: '50%',
  //   alignItems: 'center',
  // },

  // container: {
  //   flex: STANDARD_FLEX,
  // },
  // wishlistItemCardComponentWrapper: {
  //   marginBottom: STANDARD_SPACING * 3,
  //   marginHorizontal: STANDARD_SPACING * 3,
  // },
  // wishlistItemCardComponentWrapperWithTopMargin: {
  //   marginTop: STANDARD_SPACING * 3,
  // },
  // orderagainview: {
  //   width: wp('100'),
  //   flexWrap: 'wrap',
  //   // borderWidth: 1,
  //   // justifyContent: 'space-between',
  //   // marginLeft: 20,
  //   flexDirection: 'row',
  //   alignSelf: 'center',
  // },
  // OrderWrapper: {
  //   width: wp('30'),
  //   marginTop: wp('2.5'),
  //   marginLeft: wp('2.5'),
  // },

  // mainWrapper: {
  //   flex: STANDARD_FLEX,
  // },
  wishlistItemCardComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
    marginHorizontal: STANDARD_SPACING * 3,
  },
  wishlistItemCardComponentWrapperWithTopMargin: {
    marginTop: STANDARD_SPACING * 3,
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
  OrderWrapper: {
    width: wp('30'),
    marginTop: wp('2.5'),
    marginLeft: wp('2.5'),
  },
  modalButtonWrapper: {
    marginTop: hp('9'),
    marginBottom: hp('1'),
    width: wp('95'),
    alignSelf:'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },


  /// invoice css
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  topContentWrapper: {
    flex: 0.22,
    paddingHorizontal: STANDARD_SPACING * 3,
    paddingBottom:hp('2'),
    position: 'relative',
    backgroundColor:Colors.primary
  },
  payeeName: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_SM,
    textTransform:'capitalize'
    // marginVertical: STANDARD_SPACING * 3,
  },
  totalAmount: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: hp('1.5'),
    color:Colors.white,
    // marginVertical: STANDARD_SPACING * 3,
  },
  invoiceNumberLabel: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: hp('1.3'),
  },
  invoiceNumber: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XS,
  },
  invoiceNumberAndStatusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth:2,
  },
  invoiceNumberWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    width:wp('60'),
    // borderWidth:2
  },
  invoiceTotalOverviewWrapper: {
    position: 'absolute',
    width: '75%',
    bottom: STANDARD_SPACING * 3,
    alignSelf: 'center',
    borderRadius: STANDARD_SPACING * 4,
    padding: STANDARD_SPACING * 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountPaidLabel: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XXS,
  },
  amountPaidValue: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_XL,
  },
  bottomContentWrapper: {
    flex: STANDARD_FLEX,
    borderTopLeftRadius: STANDARD_BORDER_RADIUS * 5,
    borderTopRightRadius: STANDARD_BORDER_RADIUS * 5,
    position: 'relative',
    padding: STANDARD_SPACING * 3,
  },
  invoiceIssueDetailsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  payeeDetailsWrapper: {
    alignItems: 'center',
  },
  issuedAndDueOnLabel: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
  },
  issuedAndDueDate: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XS,
  },
  payeeAvatarWrapper: {
    width: STANDARD_USER_AVATAR_WRAPPER_SIZE,
    aspectRatio: 1,
    borderRadius: STANDARD_USER_AVATAR_WRAPPER_SIZE * 0.5,
  },
  payeeAvatar: {
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'cover',
  },
  payeeName2: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XS,
    // marginVertical: STANDARD_SPACING,
  },
  payeeEmail: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
  },
  dueOnWrapper: {
    alignItems: 'flex-end',
  },
  orderedItemsWrapper: {
    flex: STANDARD_FLEX,
  },
  orderedItemsLabel: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XS,
    width:wp('95'),
    alignSelf:'center'
    // marginVertical: STANDARD_SPACING * 3,
  },
  scrollViewWrapper: {
    flex: STANDARD_FLEX,
    backgroundColor: 'green',
  },
  orderedItemWrapper: {
    padding: STANDARD_SPACING * 1.5,
    borderRadius: STANDARD_BORDER_RADIUS * 1.5,
    marginBottom: STANDARD_SPACING * 3,
  },
  orderedItemNameAndPriceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'center'
    // justifyContent: 'space-between',
    // marginBottom: STANDARD_SPACING,
  },
  orderedItemNameWrapper: {
    // flex: STANDARD_FLEX,
    // justifyContent:'center',
    // alignContent:'center'
  },
  orderedItemCostWrapper: {
    width:wp('63'),
    marginLeft:wp('2'),
    marginRight:wp('2'),
    // borderWidth:2
    // flex: 0.25,
    // alignItems: 'flex-end',
  },
  orderedItemName: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
    // marginLeft: 45,
    // marginTop: -29,
  },
  orderedItemCost: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XS,
    textAlign:'center',
    width:wp('11'),
    // borderWidth:1,
  },
  orderedItemQtyAndRate: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XXS,
    // marginLeft: 45,
  },
  invoiceTotalAndTaxWrapper: {
    padding: STANDARD_SPACING * 1.5,
  },
  invoiceTotalAndTaxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: STANDARD_SPACING * 2,
  },
  invoiceTotalAndTaxLabel: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_XS,
  },
  invoiceTotalAndTaxValue: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XS,
  },
  actionIconsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  shareIconWrapper: {
    marginLeft: STANDARD_SPACING * 1.5,
  },

  cartItemCardComponentWrapper: {
    // marginBottom: STANDARD_SPACING * 3,
    // marginHorizontal: STANDARD_SPACING * 6,
    flex: STANDARD_FLEX,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: STANDARD_SPACING,
  },
  cartItemCardComponentWrapperWithTopMargin: {
    // marginTop: STANDARD_SPACING * 6,
  },
  checkoutButtonComponentWrapper: {
    paddingHorizontal: STANDARD_SPACING * 3,
  },
  StartShoppingButtonComponentWrapper: {
    paddingHorizontal: STANDARD_SPACING * 3,
    // paddingVertical: STANDARD_SPACING * 35,
    position: 'left',
    bottom: scale(150),
    alignSelf: 'start',
  },

  mainCarouselFlatListItemImage: {
    width: wp('10'),
    height: wp('10'),

    // flex: STANDARD_FLEX,
    // resizeMode: 'contain',
    borderRadius: wp('2'),
  },
  // modal css
 
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent 
  },
  modalContent: {
    
    // backgroundColor: 'white',
    // padding: 20,
    // borderRadius: 10,
    // elevation: 5,
    // width: wp('90%'), // Adjust this as needed
    // height: hp('20%'),
    // alignItems: 'center',
  },
  modalContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
     width: wp('90%'), // Adjust this as needed
    height: hp('60%'),
    backgroundColor:Colors.white,
    // padding:scale(20),
    borderRadius: scale(10),
  },
  // modalButtonWrapper: {
  //   marginTop: hp('9'),
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  modalTitle: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_MD,
    marginVertical: STANDARD_SPACING * 3,
    color: IndependentColors.black,
    marginHorizontal: scale(15),
    textAlign: 'center',
  },
  modalTitles: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_LG,
    marginVertical: STANDARD_SPACING * 3,
    color: Colors.error,
    marginHorizontal: scale(15),
    textAlign: 'center',
  },
  textError: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_XXS,
    // marginVertical: STANDARD_SPACING * 3,
    color: Colors.error,
    // marginHorizontal: scale(15),
    textAlign: 'left',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: IndependentColors.green,
    // marginVertical: STANDARD_SPACING,
  },

  dropdown1BtnTxtStyle: {
    // color: Colors.black,
    width: wp('80%'),// Set the width to 100%
    textAlign: 'left',
   
    // backgroundColor: 'lightgrey',
    
  },
  btnCancelOption:{
    width: wp('80%'),
    backgroundColor: Colors.inactive,
    // alignItems:'flex-start',
    justifyContent:'center'

  },
  dropdown1DropdownStyle: {
    backgroundColor: Colors.inactive,
    borderRadius: STANDARD_BORDER_RADIUS * 2,
  },
  dropdown1RowStyle: {
    alignItems: 'center',
    marginTop: 20,
    width: wp('80%'),
    backgroundColor: Colors.inactive,
  },
  dropdown1RowTxtStyle: {
    color: Colors.black,
    textAlign: 'left',
  },
  dropdown1SelectedRowStyle: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  dropdown1searchInputStyleStyle: {
    alignSelf: 'center',
    backgroundColor: Colors.inactive,
    borderRadius: STANDARD_BORDER_RADIUS * 3,
    marginVertical: scale(5),
    width: SCREEN_WIDTH * 0.78,
    height: scale(40),
    borderWidth: 1,
    borderColor: Colors.green,
  },

  avatarImage: {
    alignSelf: 'center',
    // marginLeft: hp('17'),
  },


  card: {
    justifyContent: 'center',
    // padding: scale(4),
    // position: 'relative',
    height: wp('40'),
    borderRadius: STANDARD_GRID_VIEW_PRODUCT_CARD_MIN_HEIGHT * 0.08,//0.1
    
  },
  squareButtonComponentWrapper: {
    justifyContent:'space-between',
    flexDirection:'row',
    position: 'absolute',
    // left: scale(6),
    // top: scale(6),
    // borderWidth:2,
    width:wp('30'),
    zIndex:1,
  },
  itemImageWrapper: {
    alignSelf: 'center',
    marginVertical: scale(10),
    alignItems:'center',
    justifyContent:'center',
    width:SCREEN_WIDTH * 0.18,
    aspectRatio: 1.0,
    // backgroundColor: 'red',
  },
  itemImage: {
    width: scale(75),
    height: scale(75),
    // flex: STANDARD_FLEX,
    resizeMode: 'contain',
    zIndex:0,
  },
  itemName: {
    // marginBottom: scale(1.5),
    paddingLeft:wp('1'),
    paddingRight:wp('1'),
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: scale(8),
  },
  itemOriginalPrice: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: hp('1'),
    textDecorationLine: 'line-through',
    paddingLeft:wp('1'),
    // paddingRight:wp('1'),
  },
  itemweight: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: scale(6),
    paddingLeft:wp('1'),
    paddingRight:wp('1'),
    // textDecorationLine: 'line-through',
  },
  itemDiscountedPrice: {
    marginLeft: scale(5),
    fontFamily: OPEN_SANS_BOLD,
    fontSize: scale(8),
  },
  ratingWrapper: {
    // marginBottom: scale(7.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStarsWrapper: {
    flexDirection: 'row',
  },
  rating: {
    // marginHorizontal: scale(5),
    fontFamily: OPEN_SANS_BOLD,
    fontSize: FONT_SIZE_XS,
  },
  ratingCount: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_XS,
  },
  itemQuantityIncreaseDecreaseButtonWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemPriceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor:'red'
  },
  quantity: {
    paddingHorizontal: scale(1.5),
    fontFamily: OPEN_SANS_BOLD,
    fontSize: scale(12),
  },
});
