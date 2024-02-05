import {StyleSheet} from 'react-native';
import {IndependentColors} from '../../../config/Colors';
import {OPEN_SANS_SEMIBOLD, FONT_SIZE_XXS} from '../../../config/Constants';
import { scale } from 'react-native-size-matters';
import Colors from '../../../constants/Colors';

// Exporting style
export default StyleSheet.create({
  tabBarBadgeStyle: {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_XXS,
    backgroundColor: Colors.primary,
    color: IndependentColors.white,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: scale(60),
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    // borderRadius: 10,
  },
  btn:(focused, theme)=>( {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: focused ? IndependentColors.white : IndependentColors.white,
    backgroundColor: focused ? Colors?.primary : IndependentColors.white,
    justifyContent: 'center',
    alignItems: 'center'
  }),
  circle:(focused, theme)=>( {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: focused ? Colors?.primary : IndependentColors.white,
    borderRadius: 25,
  }),
  text:(focused, theme)=>( {
    fontFamily: OPEN_SANS_SEMIBOLD,
    fontSize: FONT_SIZE_XXS,
    textAlign: 'center',
    color:  focused ? Colors?.primary : IndependentColors.grey,
  })
});
