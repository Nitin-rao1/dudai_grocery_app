import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {
  OPEN_SANS_MEDIUM,
  FONT_SIZE_SM,
  STANDARD_CATEGORY_IMAGE_WRAPPER_SIZE,
  STANDARD_SPACING,
  STANDARD_FLEX,
  STANDARD_BORDER_RADIUS,
} from '../../../config/Constants';
import { IndependentColors } from '../../../config/Colors';
import Colors from '../../../constants/Colors';

// Exporting style
export default StyleSheet.create({
  itemImageLabelWrapper: {
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor:Colors.primary,
    height:scale(190),
    width: scale(160),
    marginTop:scale(13),
    // marginHorizontal: STANDARD_SPACING * 1,
    // marginVertical: STANDARD_SPACING * 0.8,
    // backgroundColor:'red'
    borderWidth:1,
    borderColor:Colors.primary,
    borderRadius: STANDARD_BORDER_RADIUS * 2,
    overflow:'hidden'
  },
  itemImageWrapper: {
    // position:'absolute',
    // top:0,
    width: scale(160),
    height:scale(160),
    backgroundColor:Colors.white,
    // zIndex:1
    
    // aspectRatio: 0.75,
    // borderRadius: STANDARD_CATEGORY_IMAGE_WRAPPER_SIZE * 0.1,
    // padding: scale(5),
    // overflow:'hidden'
  },
  itemImage: {
  
    width: null,
    height: null,
    flex: STANDARD_FLEX,
    resizeMode: 'contain',
    backgroundColor:Colors.white,
    // borderRadius:10,
  },
  labelContainer: {
    width: scale(160),
    height:scale(30),
    // position:'absolute',
    // bottom:0,
    // height:scale(20),
    // ...StyleSheet.absoluteFillObject, // Position the label absolutely within the container
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    // alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  label: {
    // paddingBottom: scale(1),
    // paddingVertical: scale(2),
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: scale(11),
    // alignItems: 'center',
    color: '#fff',
    // marginLeft: STANDARD_SPACING,
    textAlign: 'center',
  },
});
