import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
    FONT_SIZE_XS,
    FONT_SIZE_XXS,
    OPEN_SANS_BOLD,
    OPEN_SANS_MEDIUM,
    OPEN_SANS_REGULAR,
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    STANDARD_BORDER_RADIUS,
    STANDARD_SPACING,
    STANDARD_TEXT_TICKER_HEIGHT,
    STANDARD_VECTOR_ICON_WRAPPER_SIZE,
  } from '../../config/Constants';
  import {IndependentColors} from '../../config/Colors';
import Colors from '../../constants/Colors';
export default StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    itemContainer: {
      backgroundColor: 'white',
      paddingHorizontal: STANDARD_SPACING,
      paddingVertical: STANDARD_SPACING * 1.05,
      height: null,
      width: SCREEN_WIDTH * 0.95,
      borderRadius: scale(10),
      borderWidth: scale(0.5),
      // borderColor: 'lightgrey',
      // flexDirection: 'row',
      marginVertical: scale(5),
    },
    closeButton: {
      flexDirection: 'column',
      paddingHorizontal: scale(10),
      justifyContent: 'space-between',
      width: scale(260),
      // alignItems:'center',
      // marginTop: 15,
    },
    pointContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  
    pointBadgeText: {
      textAlign: 'center',
      color: Colors.primary,
    },
    pointInfo: {
      flex: 1,
      marginLeft: 10,
    },
    pointTitle: {
      fontFamily: OPEN_SANS_BOLD,
      fontSize: FONT_SIZE_XS,
    },
    pointDetails: {
      fontFamily: OPEN_SANS_REGULAR,
      fontSize: FONT_SIZE_XS,
      // color: IndependentColors.black,
    },
    pointCurrency: {
      // textAlign: 'center',
      color: Colors.primary,
      marginTop: 15,
    },
    openButton: {
      backgroundColor: Colors.primary,
      alignItems: 'center',
      padding: STANDARD_SPACING,
    },
    openButtonText: {
      color: 'white',
      fontSize: FONT_SIZE_XS,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addButtonComponentWrapper: {
      marginBottom: STANDARD_SPACING * 1,
      width: wp('90'),
    },
    addressTypeIconWrapper: {
      width: STANDARD_VECTOR_ICON_WRAPPER_SIZE,
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: STANDARD_VECTOR_ICON_WRAPPER_SIZE / 2,
    },
    tickerText: {
      textTransform: 'uppercase',
      fontFamily: OPEN_SANS_BOLD,
      fontSize: scale(16),
      color: IndependentColors.black,
      lineHeight: STANDARD_TEXT_TICKER_HEIGHT,
      marginVertical: scale(8),
    },
  });