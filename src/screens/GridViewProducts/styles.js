import {StyleSheet} from 'react-native';
import {STANDARD_FLEX} from '../../config/Constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
  },
  flatGrid: {
    flex: STANDARD_FLEX,
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
