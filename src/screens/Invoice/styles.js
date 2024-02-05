import {StyleSheet} from 'react-native';
import {
  OPEN_SANS_BOLD,
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  OPEN_SANS_SEMIBOLD,
  FONT_SIZE_XXS,
  FONT_SIZE_XL,
  OPEN_SANS_MEDIUM,
  STANDARD_USER_AVATAR_WRAPPER_SIZE,
  STANDARD_FLEX,
  STANDARD_SPACING,
  STANDARD_BORDER_RADIUS,
  FONT_SIZE_MD,
  FONT_SIZE_LG,
  SCREEN_WIDTH,
} from '../../config/Constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {scale} from 'react-native-size-matters';
import Colors from '../../constants/Colors';
import { IndependentColors } from '../../config/Colors';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  topContentWrapper: {
    flex: 0.22,
    paddingHorizontal: STANDARD_SPACING * 3,
    position: 'relative',
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
    marginVertical: STANDARD_SPACING * 3,
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
  modalButtonWrapper: {
    marginTop: hp('9'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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

});
