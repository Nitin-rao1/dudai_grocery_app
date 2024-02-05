import {StyleSheet} from 'react-native';
import { scale } from 'react-native-size-matters';
import {SCREEN_WIDTH, STANDARD_FLEX, STANDARD_SPACING} from '../../config/Constants';

// Exporting style
export default StyleSheet.create({
  mainWrapper: {
    flex: STANDARD_FLEX,
    // paddingHorizontal: STANDARD_SPACING * 3,
  },
  categoryItemsWrapper: {
    width: SCREEN_WIDTH * 0.95,
    flexWrap: 'wrap',
    //  borderWidth:1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  categoryItemComponentWrapper: {
    // marginVertical: STANDARD_SPACING * 3,
  },
});
