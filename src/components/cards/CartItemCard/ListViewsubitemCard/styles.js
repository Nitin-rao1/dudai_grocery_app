import { StyleSheet } from 'react-native';
import { OPEN_SANS_MEDIUM, FONT_SIZE_SM } from '../../../config/Constants';

export default StyleSheet.create({
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    marginHorizontal: scale(8),
    marginVertical: scale(4),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
  },
  subCategoryText: {
    fontFamily: OPEN_SANS_MEDIUM,
    fontSize: FONT_SIZE_SM,
    color: '#333333',
  },
});
