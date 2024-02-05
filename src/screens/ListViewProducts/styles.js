import {StyleSheet} from 'react-native';
import {
  FONT_SIZE_MD,
  FONT_SIZE_SM,
  FONT_SIZE_XS,
  FONT_SIZE_XXS,
  OPEN_SANS_BOLD,
  OPEN_SANS_MEDIUM,
  SCREEN_WIDTH,
  STANDARD_FLEX,
  STANDARD_GRID_VIEW_PRODUCT_CARD_MIN_HEIGHT,
  STANDARD_SPACING,
} from '../../config/Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {IndependentColors} from '../../config/Colors';
import { scale } from 'react-native-size-matters';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  listViewItemCardComponentWrapper: {
    marginBottom: STANDARD_SPACING * 3,
    marginHorizontal: STANDARD_SPACING * 3,
  },
  listViewItemCardComponentWrapperWithMarginTop: {
    marginTop: STANDARD_SPACING * 3,
  },
  categoriesContainer: {
    paddingHorizontal: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('1%'),
    // backgroundColor:'red'
  },
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
  borderTop: {
    borderTopWidth: 0.2,
    borderTopColor: IndependentColors.black + 40,
    width: wp('100%'),
  },
  orderagainview: {
    width: wp('100'),
    flexWrap: 'wrap',
    // flex: 1,
    // backgroundColor: '#f6f6f6'
    // borderWidth: 1,
    // justifyContent: 'space-between',
    // marginLeft: 20,
    // flexDirection: 'row',
    // alignSelf:'center',
  },
  OrderWrapper: {
    width: wp('30'),
    marginTop: wp('2.5'),
    marginLeft:wp('2.5')
  },
  emptyItem: {
    // width: wp('100'),
    // flexWrap: 'wrap',
    // flex: 1,
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    alignSelf:'center',
    marginTop:hp('7')
    // backgroundColor: '#f6f6f6'
    // borderWidth: 1,
    // justifyContent: 'space-between',
    // marginLeft: 20,
    // flexDirection: 'row',
    // alignSelf:'center',
  },

  ///order csccsss
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





  //test
  tabBar: {
    backgroundColor: '#fff',
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1
  },
  tabContainer: {
    borderBottomColor: '#090909'
  },
  tabText: {
    padding: 15,
    color: '#9e9e9e',
    fontSize: 18,
    fontWeight: '500'
  },
  separator: {
    height: 0.5,
    width: '96%',
    alignSelf: 'flex-end',
    backgroundColor: '#eaeaea'
  },
  sectionHeaderContainer: {
    height: 10,
    backgroundColor: '#f6f6f6',
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1
  },
  sectionHeaderText: {
    color: '#010101',
    backgroundColor: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    paddingTop: 25,
    paddingBottom: 5,
    paddingHorizontal: 15
  },
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff'
  },
  itemTitle: {
    flex: 1,
    fontSize: 20,
    color: '#131313'
  },
  itemPrice: {
    fontSize: 18,
    color: '#131313'
  },
  itemDescription: {
    marginTop: 10,
    color: '#b6b6b6',
    fontSize: 16
  },
  itemRow: {
    flexDirection: 'row'
  }
});
