import {StyleSheet} from 'react-native';
import {STANDARD_FLEX, STANDARD_SPACING} from '../../config/Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
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
    alignSelf:'center',
  },
  OrderWrapper: {
    width: wp('30'),
    marginTop: wp('2.5'),
    marginLeft:wp('2.5')
  },
});
